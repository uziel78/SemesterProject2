import { getUsername } from "../utils/storage.js";
import logoutButton from "../components/logoutBtn.js";

// createMenu function
export default function createMenu() {
  // sets pathname variable to be equal to location
  const { pathname } = document.location;

  const container = document.querySelector(".menu__container");

  // get username from storage
  const username = getUsername();

  // create a variable that is set to "Login" link as default
  let authLink = `<a href="login.html" class="${
    pathname === "/login.html" ? "active" : ""
  }" role="login button"><i class="fas fa-sign-in-alt"></i><span class="txt__alt">Login<span/></a>`;

  // if logged in (username gotten from localstorage), then replace variable content with new links instead
  if (username) {
    authLink = `<div class="navlinks"><a href="add.html" class="${
      pathname === "/add.html" ? "active" : ""
    }" role="add post""><i class="fas fa-plus-square"></i></a></div>
                    <button id="logoutBtn">Logout ${username}</button>`;
  }

  // add menu container on page and render Home + autlinke variable links on it
  container.innerHTML = `<div class="navbar">
                                <div class="logo__container" role="logo with link to homepage"><a href="index.html"><i class="fas fa-pencil-alt"></i> Frontend Notes</a></div>
                                <div class="navlinks">
                                    <a href="index.html" class="${
                                      pathname === "index.html" ||
                                      pathname === "index.html"
                                        ? "active"
                                        : ""
                                    }" role="back to homepage"><i class="fas fa-home"></i><span class="txt__alt">Posts<span/></a>
                                    <div>${authLink}</div>
                                </div>
                        </div>`; //applies "active" class to current page.
  //imported logout btn
  logoutButton();
}
