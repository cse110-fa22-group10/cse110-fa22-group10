// TODO: Create way to set constraints in the post based on what platform
// the post is for. i.e. Twitter posts need a character limit, Insta posts
// need a picture, etc..
// Done by Antonio
const summary = document.getElementById('post-summary');
const postDescription = document.getElementById('desc-input');
const date = document.getElementById('date-to-post');
const time = document.getElementById('time-to-post');
const imageInput = document.getElementById('image-input');
const submitButton = document.getElementById('submit');
let facebookCharLimit = 63206;
let validPost = false;
window.addEventListener('DOMContentLoaded', init);

function init() {
}

// Function called when clicking the submit button to check
// if the text constraints are respected
// The submit button is disabled for 1 second
function checkEverything() {
    // checks summary requirement
    if (summary.value.length == 0) {
        submitButton.disabled = true;
        alert("Post needs a summary!");
        setTimeout(() => {
            submitButton.disabled = false;
        }, 1000);
        validPost = false;
        return;
    }

    // checks character constraint
    if (postDescription.value.length > facebookCharLimit || 
        postDescription.value.length == 0) {
        submitButton.disabled = true;
        if (postDescription.value.lenth == 0) {
            alert("Post needs a description!");
        }
        else {
            alert("Too many characters!");
        }
        setTimeout(() => {
            submitButton.disabled = false;
        }, 1000);
        validPost = false;
        return;
    }

    // checks date requirement
    if (date.value.length == 0) {
        submitButton.disabled = true;
        alert("Post needs a date!");
        setTimeout(() => {
            submitButton.disabled = false;
        }, 1000);
        validPost = false;
        return;
    }

    // checks time requirement
    if (time.value.length == 0) {
        submitButton.disabled = true;
        alert("Post needs a time!");
        setTimeout(() => {
            submitButton.disabled = false;
        }, 1000);
        validPost = false;
        return;
    }
    validPost = true;
}

/**
 * Called when description is changed. Changes current char count displays
 * and checks to see is char count is exceeded
 */
function countChars() {
    characterLimit.innerText = "Character Limit: " +
        postDescription.value.length + "/" + facebookCharLimit;
    if(postDescription.value.length > facebookCharLimit) {
        characterLimit.style.color = 'red';
    }
    else {
        characterLimit.style.color = 'black';
    }
}

// Event listeners
submitButton.addEventListener('click', checkEverything);
postDescription.addEventListener('keypress', countChars);
const formEle = document.querySelector('form');
let imgElement = document.querySelector("[type='file']");
let file;
let dataUrl = "";
imgElement.addEventListener('change', () => {
    file = imgElement.files[0];
    const reader = new FileReader();
    reader.addEventListener("load", () => {
        dataUrl = reader.result;
    });
    reader.readAsDataURL(file);
});
//event listener for submit botton
submitButton.addEventListener('click', () => {
    if(!validPost) {
        return;
    }
    let formData = new FormData(formEle);
    //store user entered image, description, data .. into postObject
    let postObject = {};
    postObject['currentIndex'] = 0;
    postObject['currentContainer'] = 'upcoming';
    postObject['postSummary'] = formData.get('post-summary');
    postObject['mainTxt'] = formData.get('desc-input');
    postObject['dateData'] = formData.get('date-to-post') + ', ' + formData.get('time-to-post');
    postObject['dateCompare'] = formData.get('date-to-post') + 'T' + formData.get('time-to-post') + ":" + "00";
    postObject['platType'] = formData.get('tag');
    postObject['mainImg'] = dataUrl;
    if (dataUrl === "") {
        postObject['imgAlt'] = "";
    } else {
        postObject['imgAlt'] = formData.get('tag') + ' image';
    }
    dataUrl = ""; //Once the information is stored, set it back to ""

    //combine local posts and user entered post, store back into local
    let postFromLocal = getPostsFromStorage();
    postFromLocal.push(postObject);
    postFromLocal.sort((post1, post2) => {
        let postDate1 = new Date(post1['dateCompare']);
        let postDate2 = new Date(post2['dateCompare']);
        return postDate1 - postDate2;
    });
    savePostsToStorage(postFromLocal);
});

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

/**
 * Takes in an array of posts, converts it to a string, and then
 * saves that string to 'posts' in localStorage
 * @param {Array<Object>} posts An array of posts
 */
function savePostsToStorage(posts) {
    localStorage.setItem('posts', JSON.stringify(posts));
}

const backButton = document.querySelector("#back-button");
backButton.addEventListener('click', () => {
    window.location.replace("https://cse110-fa22-group10.github.io/cse110-fa22-group10/scheduler/index.html");
});
