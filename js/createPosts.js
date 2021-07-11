import { displayMessage } from "./components/displayMessage.js";
import createMenu from "./components/createMenu.js";

// ========== function that renders html content on the index page ========== //

export function createPosts(posts) {

    const postContainer = document.querySelector(".posts");
    
    postContainer.innerHTML = "";

    if(posts.length === 0) {
        displayMessage("error", "No posts currently available", ".posts");
        console.log(error);
    }

    for (let i = 0; i < posts.length; i++) {
        postContainer.innerHTML += `<div class="posts">
                                        <ul>
                                            <li><h4 class="post__heading">${posts[i].slug}</h4></li>
                                        <ul>
                                    </div>`;
    }  
}