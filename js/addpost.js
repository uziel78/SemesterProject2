import { displayMessage } from "./components/displayMessage.js";
import createMenu from "./components/createMenu.js";
import { getToken } from "./utils/storage.js";
import { baseUrl } from "./constants/url.js";

// route protection
const token = getToken();

if (!token) {
  location.href = "/";
}

createMenu();

// ========== Global Variables ========= //

const form = document.querySelector("form");
const title = document.querySelector("#title");
const content = document.querySelector("#content");
const message = document.querySelector(".message__container");

const status = "publish"; //needed to change post from draft to be directly published

form.addEventListener("submit", submitForm);

// ========== Function that resets form, checks for content and inputs arguments to nested function ========== //

function submitForm(event) {
  event.preventDefault();

  message.innerHTML = "";

  const titleValue = title.value.trim();
  const contentValue = content.value.trim();
  // Note: categories dropped as I could not get it to work with the worpress API (all that shows on object is: categories: Array(1)
  //0: 10
  //length: 1
  //__proto__: Array(0) )
  //console.log("titleValue", titleValue );

  if (titleValue.length === 0 || contentValue.length === 0) {
    return displayMessage(
      "warning",
      "Please supply proper values",
      ".message__container"
    );
  }

  addPost(titleValue, contentValue);
}

// ========== nested function that directly adds a post to wordrpess site, with jwt token validation (token function call above) ========== //

async function addPost(title, content) {
  const url = baseUrl + "/wp-json/wp/v2/posts";

  const data = JSON.stringify({
    title: title,
    content: content,
    status: status,
  });

  const options = {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await fetch(url, options);
    const json = await response.json();

    if (json.date) {
      displayMessage("success", "Your post was added", ".message__container");
      form.reset(); //clears form if successfully posted
    }

    if (json.message) {
      displayMessage("error", json.message, ".message__container");
    } // note: wordpress api does not seem to have a "error" property so "message" is used

    console.log(json);
  } catch (error) {
    console.log(error);
    displayMessage("error", "An error occured", ".message__container");
  }
}
