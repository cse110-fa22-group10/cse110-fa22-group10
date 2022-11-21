// TODO: Create way to set constraints in the post based on what platform
// the post is for. i.e. Twitter posts need a character limit, Insta posts
// need a picture, etc..
// Done by Antonio
const postDescription = document.getElementById('desc-input');
const imgPreview = document.querySelector(".left");
const imageInput = document.getElementById('image-input');
const submitButton = document.getElementById('submit');

window.addEventListener('DOMContentLoaded', init);

function init() {
    constraints();
}

// Instagram posts must have at least one image
function constraints() {
    if (imageInput.files.length == 0) {
        submitButton.disabled = true;
    }
    else {
        submitButton.disabled = false;
    }
    getImgData();
}

function getImgData() {
    const files = imageInput.files[0];
    if (files) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(files);
      fileReader.addEventListener("load", function () {
        imgPreview.style.display = "block";
        imgPreview.innerHTML = '<img src="' + this.result + '" />';
      });    
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
imageInput.addEventListener('change', constraints);
submitButton.addEventListener('click', checkText);

// TODO: OnSubmit - store the formdata into localStorage to wherever we want
// it to be stored. Should also store the time and date of when the post should
// be posted 
const formEle = document.querySelector('form');

//event listener for submit botton
submitButton.addEventListener('click', () => {
    let formData = new FormData(formEle);

    //store user entered image, description, data .. into postObject 
    let postObject = {}; 
    postObject['title'] = formData.get('title');
    postObject['desc-input'] = formData.get('desc-input');
    postObject['date-to-post'] = formData.get('date-to-post');
    postObject['time-to-post'] = formData.get('time-to-post');
    postObject['tag'] = formData.get('tag');
    if (formData.get('image-input') != null) {
        postObject['image-input'] = formData.get('image-input');
    }

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