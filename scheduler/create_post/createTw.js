const postDescription = document.getElementById('desc-input');
const postSummary = document.getElementById('post-summary');
const postTag = document.getElementById('tag');
const imageInput = document.getElementById('image-input');
const deleteImgDataButton = document.getElementById('remove-image-data-button');
const formEle = document.querySelector('form');
let imgElement = document.querySelector("[type='file']");
const backButton = document.querySelector("#back-button");
const descriptionCharLimit = document.getElementById('desc-char-limit');
const summaryCharLimit = document.getElementById('summary-char-limit');
const TWITTER_CHAR_LIMIT = 280;
const SUMMARY_CHAR_LIMIT = 100;
let file;
let dataUrl = "";

window.addEventListener('DOMContentLoaded', init);

function init() {
}

// OnSubmit - store the formdata into localStorage to wherever we want
// it to be stored. Should also store the time and date of when the post should
// be posted 
imgElement.addEventListener('change', () => {
    file = imgElement.files[0];
    const reader = new FileReader();
    reader.addEventListener("load", () => {
        dataUrl = reader.result;
    });
    reader.readAsDataURL(file);
});

//event listener for submit botton
formEle.addEventListener('submit', () => {
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

// an event listener for the delete image data button in charge of removing images
// when creating a post
deleteImgDataButton.addEventListener('click', (event) => {
    event.preventDefault();
    dataUrl = '';
    imageInput.value = '';
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

// event listener to head back to the main page
backButton.addEventListener('click', () => {
    window.location.replace("../index.html");
});
