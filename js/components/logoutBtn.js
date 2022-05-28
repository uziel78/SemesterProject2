import { clearLocalStorage } from "../utils/storage.js";

export default function logoutButton() {
  const button = document.querySelector("button#logoutBtn");

  // make sure it only works if button exists
  if (button) {
    button.onclick = function () {
      console.log(event);
      const logout = confirm("Sure you want to log out?");

      if (logout) {
        clearLocalStorage();
        location.href = "/";
      }
    };
  }
}
