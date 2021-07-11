import { baseUrl } from "./constants/url.js";
import { displayMessage } from "./components/displayMessage.js";
import createMenu from "./components/createMenu.js";
import { saveToken, saveUser } from "./utils/storage.js";

const form = document.querySelector("form");
const username = document.querySelector("#username");
const password = document.querySelector("#password");
const message = document.querySelector(".message__container");


createMenu();

form.addEventListener("submit", submitForm);  //listens for submit on form button, then runs submitForm function below


function submitForm(event) {
    event.preventDefault();

    message.innerHTML = "";

    const usernameValue = username.value.trim();
    const passwordValue = password.value.trim();

    if (usernameValue.length === 0 || passwordValue.length === 0) {
        return displayMessage("warning", "Login Failed", ".message__container");
    }

    siteLogin(usernameValue, passwordValue);
    //console.log(usernameValue, passwordValue);
}


async function siteLogin(username, password) {
    const url = baseUrl + "/wp-json/jwt-auth/v1/token";
    //console.log(url);

    const data = JSON.stringify({ username: username, password: password });

    const options = {
        method: "POST",
        body: data,
        headers: {
            "Content-Type": "application/json",
            "accept": "application/json"
        },
    };

    try {
        const response = await fetch(url, options);
        const json = await response.json();

        console.log(json);

        if (json.user_nicename) {
            //displayMessage("success", "You successfully logged in", ".message__container");
            saveToken(json.token);
            saveUser(json.user_nicename);

            location.href = "/"; //redirects to homepage if successfully loged in
        } else {
            displayMessage("warning", "Invalid login details", ".message__container");
        }

    } catch (error) {
        console.log(error);
    }
}