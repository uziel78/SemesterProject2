import { createPosts } from "../createPosts.js";

// ========== Function that filters out posts ========== //

export function searchPosts(posts) {
  const search = document.querySelector(".search");

  search.onkeyup = function (event) {
    console.log(event);

    const searchValue = event.target.value.trim().toLowerCase();

    const filteredPosts = posts.filter(function (post) {
      if (post.slug.toLowerCase().startsWith(searchValue)) {
        return true;
      }
    });

    createPosts(filteredPosts);
  };
}
