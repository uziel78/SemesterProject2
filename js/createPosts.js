import { displayMessage } from "./components/displayMessage.js";

// ========== function that renders html content/posats on the index page ========== //

export function createPosts(posts) {
  const postContainer = document.querySelector(".posts");

  postContainer.innerHTML = "";

  if (posts.length === 0) {
    displayMessage("error", "No posts currently available", ".posts");
    console.log(error);
  }

  for (let i = 0; i < posts.length; i++) {
    postContainer.innerHTML += `<a class="posts" href="edit.html?id=${posts[i].id}">
                                        <h4 class="post__heading">${posts[i].title.rendered}</h4>
                                    </a>`;
  }
}
