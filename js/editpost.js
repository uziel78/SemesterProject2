import { displayMessage } from "./components/displayMessage.js";
import createMenu from "./components/createMenu.js";
import deleteButton from "./components/deleteBtn.js";
("./components/createMenu.js");
import { getToken } from "./utils/storage.js";
import { baseUrl } from "./constants/url.js";

// retrieve token from storage & route protection
const token = getToken();

if (!token) {
  location.href = "/";
}

// Create menu on page by calling createMenu function
createMenu();

//get id from querystring
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
//console.log(id);

// if no id provided, go to homepage
if (!id) {
  document.location.href = "/";
}

// combine baseURL + endpoint +id to get new URL
const postUrl = baseUrl + "/wp-json/wp/v2/posts/" + id;

// ========== Global Variables ========= //

const form = document.querySelector("form");
const title = document.querySelector("#title");
const content = document.querySelector("#content");
const idInput = document.querySelector("#id");
const message = document.querySelector(".message__container");
const loading = document.querySelector(".loading");

// ========== API Call ASYNC Function (IIFE) ========== //

(async function () {
  try {
    // get API response and json content
    const response = await fetch(postUrl);
    const json = await response.json();

    // match input field values with json data content
    title.value = json.slug;
    content.value = json.content.rendered;
    idInput.value = json.id;

    deleteButton(json.id);

    displayMessage(
      "success",
      "Edit your Post below, then click Update Post to publish",
      ".message__container"
    );
    console.log(json);
  } catch (error) {
    displayMessage("error", "API Call failed", ".message__container");
    //console.log(error);
  } finally {
    //hide loading indicator regardless of api call's sucess/error and also display the form
    loading.style.display = "none";
    form.style.display = "block";
  }
})();

// ========== SubmitForm EVENT Function  ========== //

// listen for submit event on form and run submitForm function on event
form.addEventListener("submit", submitForm);

function submitForm(event) {
  //prevent default form behavior
  event.preventDefault();

  //clear message container
  message.innerHTML = "";

  //trim form inputs
  const titleValue = title.value.trim();
  const contentValue = content.value.trim();
  const idValue = idInput.value;

  //check for content
  if (
    titleValue.length === 0 ||
    contentValue.length === 0 ||
    idValue === null
  ) {
    return displayMessage(
      "warning",
      "Please supply proper values",
      ".message__container"
    );
  }

  //run function & provide arguments
  updatePost(titleValue, contentValue, idValue);
}

// ========== Nested ASYNC Function to update post with jwt token authorization ========== //

// function that verifies authorization, then updates data content
async function updatePost(title, content, id) {
  //url to update
  const url = baseUrl + "/wp-json/wp/v2/posts/" + id;

  // data to update, stringified
  const data = JSON.stringify({ title: title, content: content, id: id });

  // verification info and data update to json
  const options = {
    // put-method used to update
    method: "PUT",
    body: data,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await fetch(url, options);
    const json = await response.json();
    console.log(json);

    if (json.date) {
      displayMessage(
        "success",
        "Post updated successfully",
        ".message__container"
      );
    }

    if (json.message) {
      displayMessage("error", json.message, ".message__container");
    }
  } catch (error) {
    displayMessage("error", json.message, ".message__container");
    //console.log(error);
  }
}
