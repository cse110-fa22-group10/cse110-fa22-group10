// Run the init() function when the page has loaded
window.addEventListener('DOMContentLoaded', init);

// Starts the program, all function calls trace back here
function init() {
    // Get the posts from localStorage
    let posts = getPostsFromStorage();
    // Add each Post to the <main> element
    addPostsToMain(posts);
    // Add the event listeners to the form elements
    //initFormHandler();
}

/**
 * Takes in an array of posts and for each post creates a
 * new <post-card> element, adds the post data to that card
 * using element.data = {...}, and then appends that new post
 * to <main>
 * @param {Array<Object>} posts An array of posts
 */
function addPostsToMain(posts) {
    let upComingPosts = document.querySelector(".upcoming-posts");

    //populate upcoming posts section
    for (let currentPost = 0; currentPost < posts.length; currentPost++) {
        
        let postcard = document.createElement("post-card");
        
        postcard.data = {
            'dateData': posts[currentPost].dateData,
            'mainImg': posts[currentPost].mainImg,
            'imgAlt': posts[currentPost].imgAlt,
            'mainTxt': posts[currentPost].mainTxt,
            'platType': posts[currentPost].platType
        };
        upComingPosts.append(postcard);
    }
}

/**
 * Reads 'posts' from localStorage and returns an array of
 * all of the posts found (parsed, not in string form). If
 * nothing is found in localStorage for 'posts', an empty array
 * is returned.
 * @returns {Array<Object>} An array of posts found in localStorage
 */
 function getPostsFromStorage() {
    let posts = JSON.parse(localStorage.getItem("posts"));
    if (posts === null) {
        return [];
    }
  return posts;
}

// TODO: Once the facebook button is clicked, move to the creation page of the Facebook posts
function createFb(){
    window.location.replace("./create_post.html");
}

// TODO: Once the instagram button is clicked, move to the creation page of the Instagram posts
function createIns(){
    window.location.replace("./create_post/createIns.html");

}

// TODO: Once the twitter button is clicked, move to the creation page of the Twitter posts
function createTw(){
    window.location.replace("./create_post/createTw.html");
}

const Fb = document.getElementById('Fb');
const Ins = document.getElementById('Ins');
const Tw = document.getElementById('Tw');

Fb.addEventListener('click', ()=>createFb());
Ins.addEventListener('click', ()=>createIns());
Tw.addEventListener('click', ()=>createTw());
