// TODO: Create way to set constraints in the post based on what platform
// the post is for. i.e. Twitter posts need a character limit, Insta posts
// need a picture, etc..
// Done by Antonio
const postDescription = document.getElementById('desc-input');
const postTag = document.getElementById('tag');
const imageInput = document.getElementById('image-input');
const submitButton = document.getElementById('submit');


window.addEventListener('DOMContentLoaded', init);

function init() {
    constraints();
}

// Limit the amount of characters permited for every type of posts
// Instagram posts must have at least one image
function constraints() {
    let selectedTag = postTag.selectedOptions[0];
  // Facebook 63,206char max
    if (selectedTag == postTag.options[0]) {
        postDescription.maxLength = 63206;
        submitButton.disabled = false;
    }
// Twitter 280char max
  if (selectedTag == postTag.options[1]) {
        postDescription.maxLength = 280;
        submitButton.disabled = false;
    }
// Instagram 2,200char max and check if there is an image uploaded
    if (selectedTag == postTag.options[2]) {
        postDescription.maxLength = 2200;
        if (imageInput.files.length == 0) {
            submitButton.disabled = true;
        }
        else {
            submitButton.disabled = false;
        }
    }
}
// Function called when clicking the submit button to check
// if the text constraints are respected
// The submit button is disabled for 1 second
function checkText() {
    if (postDescription.value.length > postDescription.maxLength) {
        submitButton.disabled = true;
        alert("Too many characters!");
        setTimeout(() => {
            submitButton.disabled = false;
    }, 1000);
    }
}
// Event listeners
postTag.addEventListener('change', constraints);
imageInput.addEventListener("change", constraints);
submitButton.addEventListener('click', checkText);
// TODO: OnSubmit - store the formdata into localStorage to wherever we want
// it to be stored. Should also store the time and date of when the post should
// be posted
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
    let formData = new FormData(formEle);
    //store user entered image, description, data .. into postObject
    let postObject = {};
    postObject['mainTxt'] = formData.get('desc-input');
    postObject['dateData'] = formData.get('date-to-post') + ', ' + formData.get('time-to-post') ;
    postObject['platType'] = formData.get('tag');
    postObject['mainImg'] = dataUrl; 
    if(dataUrl === "") {
        postObject['imgAlt'] = "";
    } else { 
        postObject['imgAlt'] = formData.get('tag') + ' image';
    }
    dataUrl = ""; //Once the information is stored, set it back to ""

    //combine local posts and user entered post, store back into local
    let postFromLocal = getPostsFromStorage();
    postFromLocal.push(postObject);
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
