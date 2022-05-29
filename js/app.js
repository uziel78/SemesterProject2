import { baseUrl } from "./constants/url.js";
import createMenu from "./components/createMenu.js";
import addFooter from "./components/addFooter.js";
import { createPosts } from "./createPosts.js";
import { searchPosts } from "./components/searchPosts.js";
import { displayMessage } from "./components/displayMessage.js";

// ========== Making a GET request to the Wordpress REST API =========

createMenu();

const wordpressPosts = baseUrl + "/wp-json/wp/v2/posts?per_page=100";
//note: wordpress caps at 100 posts. Use multiple requests and combine results to fix if/when needed.

async function renderPosts() {
  try {
    // API Call
    const response = await fetch(wordpressPosts);
    const posts = await response.json();

    createPosts(posts); // function that populates the posts page
    searchPosts(posts); // function that allows a filtered search on posts
    addFooter(); //adds footer content to index.html page
  } catch (error) {
    displayMessage("error", "API call failed", ".posts");
    console.log(error);
  }
}

renderPosts();
