import { getUsername } from "../utils/storage.js";
import logoutButton from "../components/logoutBtn.js";

// createMenu function
export default function createMenu() {

    // sets pathname variable to be equal to location
    const { pathname } = document.location;
    //console.log(pathname);

    const container = document.querySelector(".menu__container");

    // get username from storage
    const username = getUsername();

    // create a variable that is set to "Login" link as default
    let authLink = `<a href="login.html" class="${pathname === "/login.html" ? "active" : ""}">Login</a>`;

    // if logged in (username gotten from localstorage), then replace variable content with new links instead
    if (username) {
        authLink = `<a href="add.html" class="${pathname === "/add.html" ? "active" : ""}">Add Post</a>
                    <button id="logoutBtn">Logout ${username}</button>`;
    }

    //console.log(username);

    // add menu container on page and render Home + autlinke variable links on it
    container.innerHTML = `<div class="navbar">
                                <div class="logo__container">LoGo</div>
                                <div class="navlinks">
                                    <a href="/" class="${pathname === "/" || pathname === "index.html" ? "active" : ""}">Home</a>
                                    ${authLink}
                                </div>
                        </div>`; //applies "active" class to current page.
    
    // create logout button after the menu is created  (see logoutBtn.js)  
    logoutButton();
}