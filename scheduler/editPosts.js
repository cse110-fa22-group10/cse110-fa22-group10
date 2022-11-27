// TODO: Create way to set constraints in the post based on what platform
// the post is for. i.e. Twitter posts need a character limit, Insta posts
// need a picture, etc..
// Done by Antonio
const postDescription = document.getElementById('desc-input');
const postTag = document.getElementById('tag');
const imgPreview = document.getElementById("main-image-container");
const imageInput = document.getElementById('image-input');
const submitButton = document.getElementById('submit');


window.addEventListener('DOMContentLoaded', init);

function init() {
    let currentIndex = 0;
    if (window.location.search.split('?').length > 1) {
        var params = window.location.search.split('?')[1];
        var key = params.split('=')[1];
        currentIndex = parseInt(key);
        populateForm(currentIndex);
    }
    constraints();
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

/**
 * populate the edit post form with 
 * user's previously entered information:
 * summary, type, time, file, etc.
 */
function populateForm(index) {
    console.log(index);
    let postFromLocal = getPostsFromStorage();
    let post = postFromLocal[index];

    console.log(postFromLocal);
    document.getElementById("post-summary").value = post['postSummary'];
    document.getElementById("desc-input").value = post['mainTxt'];

    let optionsCollection = document.getElementsByTagName("option");
    for (let currentOption = 0; currentOption < optionsCollection.length; currentOption++) {
        if (post['platType'] == optionsCollection[currentOption].value) {
            optionsCollection[currentOption].selected = true;
        }
    }

    let time = post["dateData"].split(", ")[1];
    let date = post["dateData"].split(", ")[0];

    document.getElementById("time-to-post").value = time;
    document.getElementById("date-to-post").value = date;

    const imageInput = document.querySelector('input[type="file"]');
    if (post['mainImg'] != '') {
        const imageFile = new File([dataURItoBlob(post['mainImg'])], "currentImg.png");
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(imageFile);
        imageInput.files = dataTransfer.files;
    }
}

/**
 * convert dataUrl into a file
 */
function dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
    else
        byteString = unescape(dataURI.split(',')[1]);
    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ia], { type: mimeString });
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
    postObject['currentIndex'] = 0;
    postObject['currentContainer'] = 'upcoming';
    postObject['postSummary'] = formData.get('post-summary');
    postObject['mainTxt'] = formData.get('desc-input');
    postObject['dateData'] = formData.get('date-to-post') + ', ' + formData.get('time-to-post');
    postObject['dateCompare'] = formData.get('date-to-post') + 'T' + formData.get('time-to-post') + ":" + "00";
    postObject['platType'] = formData.get('tag');
    console, log(dataUrl);
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
    //window.location.replace("/scheduler/index.html");
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
    window.location.replace("./index.html");
});
