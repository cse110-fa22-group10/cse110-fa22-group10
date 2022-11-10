// TODO: Create way to set constraints in the post based on what platform
// the post is for. i.e. Twitter posts need a character limit, Insta posts
// need a picture, etc..
const postDescription = document.getElementById('desc-input');
const postTag = document.getElementById('tag');
const submitButton = document.getElementById('submit');

// Limit the amount of characters permited for every type of posts
function constraints() {
    let selectedTag = postTag.selectedOptions[0];

    // Facebook 63,206char max
    if(selectedTag == postTag.options[0]) {
        postDescription.maxLength = 63206;
    }
    // Twitter 280char max
    if(selectedTag == postTag.options[1]) {
        postDescription.maxLength = 280;
    }
    // Instagram 2,200char max
    if(selectedTag == postTag.options[2]) {
        postDescription.maxLength = 2200;
    }
}

// We set the maxLength for Facebook
postDescription.maxLength = 63206;
// Event listeners
postTag.addEventListener('change', constraints);

// TODO: OnSubmit - store the formdata into localStorage to wherever we want
// it to be stored. Should also store the time and date of when the post should
// be posted