import { baseUrl } from "../constants/url.js";
import { getToken } from "../utils/storage.js";

// ======== DeleteButton Function ========== //

// exported function that targets post based on id property
export default function deleteButton(id) {
    const container = document.querySelector(".delete__container");

    container.innerHTML = `<button type="button" class="deleteBtn">Delete Post</button>`;

    const button = document.querySelector("button.deleteBtn");

    button.onclick = async function () {
        //console.log(id);

        // confirmation question
        const deletePost = confirm("Are you sure you want to delete this Post?");
        
        // if confirmed, rest of the functions executes
        if (deletePost) {
            const url = baseUrl + "/wp-json/wp/v2/posts/" + id;

            // get token from storage
            const token = getToken();

            // verification token submitted and Delete request executes
            const options = {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            };

            // fetch json and provide the above paramaters, then automatically go to index.html upon deletion
            try {
                const response = await fetch(url, options);
                const json = await response.json();

                location.href = "/";
                console.log(json);

            } catch (error) {
                console.log(error);
            }
        }
    };
}