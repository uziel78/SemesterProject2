  
const tokenKey = "token";
const userKey = "user";


// ========== exported functions that saves and retrieves tokens and usernames ========== //

export function saveToken(token) {
    saveToStorage(tokenKey, token);
}

export function getToken() {
    return getFromStorage(tokenKey);
}

export function saveUser(user) {
    saveToStorage(userKey, user);
}

export function getUsername() {
    const user = getFromStorage(userKey);

    if (user) {
        return user;
    }

    return null;  //if username does not exist in storage, return null
}


// ========== function that clears local storage ========= //

export function clearlocalStorage () {
    localStorage.clear();
}

// ========== local functions used by the above functions to stringify or parse values to/from local storage ========== //

function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function getFromStorage(key) {
    const value = localStorage.getItem(key);

    if (!value) {
        return null;
    } // default anyway, but just to make things clear

    return JSON.parse(value);
}