import { baseUrl } from "./constants/url.js";
import { createPosts } from "./components/createPosts.js";
import createMenu from "./components/createMenu.js";
//import { displayMessage } from "./components/displayMessage.js";
   


// ========== Making a GET request to the Wordpress REST API =========

const wordpressPosts = baseUrl + "/wp-json/wp/v2/posts";

createMenu();

(async function() {

    const postContainer = document.querySelector(".posts");

    try {
        const response = await fetch(wordpressPosts);
        const posts = await response.json();
        console.log(posts);

        postContainer.innerHTML = "";

        createPosts(posts); //function that populates the posts page
        //searchPosts(posts); //function that allows a filterd search on posts

        
    } catch (error) {
        errorMessage("error", error, ".posts");
        console.log(error);
    }
})(); //main IIFE function that calls on other functions to generate the index page



//test token retrieval from wordpress site -success

// fetch ('https://wordpress.darkblade-design.com/wp-json/jwt-auth/v1/token', {
//             method: 'Post',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'accept': 'application/json',
//             },

//             body: JSON.stringify({
//                 username: 'rune',
//                 password: '2xmw 7IMb qlEL TvQF M3KS YjQM'  //required, set at Wordpress site
//             })
//         }).then(function(response){
//             return response.json()
//         }).then(function(user){
//             console.log(user.token)
//             localStorage.setItem('jwt', user.token)
//         }); 