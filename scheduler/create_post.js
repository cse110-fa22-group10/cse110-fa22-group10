// TODO: Create way to set constraints in the post based on what platform
// the post is for. i.e. Twitter posts need a character limit, Insta posts
// need a picture, etc..
const postDescription = document.getElementById('desc-input');
const postTag = document.getElementById('tag');
const imageInput = document.getElementById('image-input');
const submitButton = document.getElementById('submit');



// Limit the amount of characters permited for every type of posts
function constraints() {
    let selectedTag = postTag.selectedOptions[0];
    // Facebook 63,206char max
    if (selectedTag == postTag.options[0]) {
        postDescription.maxLength = 63206;
    }
    // Twitter 280char max
    if (selectedTag == postTag.options[1]) {
        postDescription.maxLength = 280;
    }
    // Instagram 2,200char max and check if there is an image uploaded
    if (selectedTag == postTag.options[2]) {
        postDescription.maxLength = 2200;
        checkImage();
    }
}


// Function called when an image is needed in
// the image-input to allow the submit button to work
function checkImage() {
    if (imageInput.files.length == 0) {
        submitButton.disabled = true;
    }
    else {
        submitButton.disabled = false;
    }
}

// Function called when clicking the submit button to check
// if the text constraints are respected
function checkText() {
    if (postDescription.value.length > postDescription.maxLength) {
        submitButton.disabled = true;
        alert("Too many characters!");
        setTimeout(() => {submitButton.disabled = false}, 1000);
    }
}

// Event listeners
postTag.addEventListener('change', constraints);
imageInput.addEventListener('change', checkImage);
submitButton.addEventListener('click', checkText);

// TODO: OnSubmit - store the formdata into localStorage to wherever we want
// it to be stored. Should also store the time and date of when the post should
// be posted