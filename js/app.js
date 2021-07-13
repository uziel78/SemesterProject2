import { baseUrl } from "./constants/url.js";
import { createPosts } from "./createPosts.js";
import createMenu from "./components/createMenu.js";
import { displayMessage } from "./components/displayMessage.js";
   


// ========== Making a GET request to the Wordpress REST API =========

const wordpressPosts = baseUrl + "/wp-json/wp/v2/posts";

createMenu();

(async function() {

    try {
        const response = await fetch(wordpressPosts);
        const posts = await response.json();
        console.log(posts);

        createPosts(posts); //function that populates the posts page
        //searchPosts(posts); //function that allows a filterd search on posts

        
    } catch (error) {
        displayMessage("error", "API call failed", ".posts");
        console.log(error);
    }
})(); //main IIFE function that calls on other functions to generate the index page
