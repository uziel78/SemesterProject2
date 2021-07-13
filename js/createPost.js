import { baseUrl } from "./constants/url.js";
import { displayMessage } from "./components/displayMessage.js";


// ========= Retrieving Querystring Parameter ========= //

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
//console.log(id);

if (!id) {
    document.location.href = "/";
}  //if id not found, return to index.html

const postUrl = baseUrl + "/wp-json/wp/v2/posts/" + id;

//console.log(postUrl);

// ========= Function to generate html content on page ========== //

(async function () {
    try {
        const response = await fetch(postUrl);
        const json = await response.json();

        document.title = json.title;  //sets page title to be = post title

        const postContainer = document.querySelector(".post");

        postContainer.innerHTML = `<h4 class="post__heading">${json.slug}</h4>
                                    <p>${json.content.rendered}</p>`;

        console.log(json);
    } catch (error) {
        displayMessage("error", error, ".post");
    }
    //console.log(error);
})();