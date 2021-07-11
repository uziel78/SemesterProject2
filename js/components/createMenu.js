import { getUsername } from "../utils/storage.js";

export default function createMenu() {
    const { pathname } = document.location;
    //console.log(pathname);

    const container = document.querySelector(".menu__container");

    const username = getUsername();

    let authLink = `<a href="login.html" class="${pathname === "/login.html" ? "active" : ""}">Login</a>`;

    if (username) {
        authLink = `<a href="add.html" class="${pathname === "/add.html" ? "active" : ""}">Add Post</a>
                    <span>Welcome ${username}</span>`;
    }

    //console.log(username);

    container.innerHTML = `<div class="menu">
                                <a href="/" class="${pathname === "/" || pathname === "index.html" ? "active" : ""}">Home</a>
                                ${authLink}
                        </div>`; //applies "active" class to current page.
}