const postDescription = document.getElementById('desc-input');
const postSummary = document.getElementById('post-summary');
const postTag = document.getElementById('tag');
const imgPreview = document.getElementById("main-image-container");
const imageInput = document.getElementById('image-input');
const deleteImgDataButton = document.getElementById('remove-image-data-button');
const formEle = document.querySelector('form');
let imgElement = document.querySelector("[type='file']");
const backButton = document.querySelector("#back-button");
const descriptionCharLimit = document.getElementById('desc-char-limit');
const summaryCharLimit = document.getElementById('summary-char-limit');
const SUMMARY_CHAR_LIMIT = 100;
let dataUrl = "";
let file;
let indexToDelete;

window.addEventListener('DOMContentLoaded', init);

function init() {
    let currentIndex = 0;

    //extracting the currentIndex from Url according to local storage
    //so that we can prepopulate the form
    if (window.location.search.split('?').length > 1) {
        var params = window.location.search.split('?')[1];
        var key = params.split('=')[1];

        //extract the current index
        currentIndex = parseInt(key);

        //check that the current index is a valid integer
        if (!isNaN(currentIndex)) {
            indexToDelete = currentIndex;
            populateForm(currentIndex);
        }
    }

    //set the constraints accordingly and display the image in the container
    configureFormConstraints();
    getImgData();
}

/**
 * This function previews the image 
 * in the image container
 */
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

    //extract the current post from local storage according to the current index
    let postFromLocal = getPostsFromStorage();
    let post = postFromLocal[index];

    //prepopulate post summary and description
    document.getElementById("post-summary").value = post['postSummary'];
    document.getElementById("desc-input").value = post['mainTxt'];

    //prepopulate the platform type
    let optionsCollection = document.getElementsByTagName("option");
    for (let currentOption = 0; currentOption < optionsCollection.length; currentOption++) {
        if (post['platType'] == optionsCollection[currentOption].value) {
            optionsCollection[currentOption].selected = true;
        }
    }

    //spliting the dateDate so that we get time and date variables
    let time = post["dateData"].split(", ")[1];
    let date = post["dateData"].split(", ")[0];

    document.getElementById("time-to-post").value = time;
    document.getElementById("date-to-post").value = date;

    //gain access to the current image container
    const imageInput = document.querySelector('input[type="file"]');
    //if the current image container contains a valid image file, extract its data url
    if (post['mainImg'] != '') {
        //create new image file based on the image dataUrl from local storage
        const imageFile = new File([dataURItoBlob(post['mainImg'])], "currentImg.png");

        //create a data transfer object and insert image file into the file list
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(imageFile);

        //prepopulate the file input with image
        imageInput.files = dataTransfer.files;
        file = imgElement.files[0];
        const reader = new FileReader();
        //set the data url to its the images data url representation
        reader.addEventListener("load", () => {
            dataUrl = reader.result;
        });
        reader.readAsDataURL(file);
    }
    configureFormConstraints();
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


/*
* this function limits the amount of characters permited for every type of posts 
* instagram posts must have an image
*/
function configureFormConstraints() {
    let currentCharacterLimit = document.getElementById('char-limit');
    let selectedTag = postTag.selectedOptions[0];
    // Facebook 63,206char max
    if (selectedTag == postTag.options[0]) {
        postDescription.maxLength = 63206;
        currentCharacterLimit.innerHTML = 'Character Limit: 63206';
        submitButton.disabled = false;
    }
    // Twitter 280char max
    if (selectedTag == postTag.options[1]) {
        postDescription.maxLength = 280;
        currentCharacterLimit.innerHTML = 'Character Limit: 280';
        submitButton.disabled = false;
    }
    // Instagram 2,200char max and check if there is an image uploaded
    if (selectedTag == postTag.options[2]) {
        postDescription.maxLength = 2200;
        currentCharacterLimit.innerHTML = 'Character Limit: 2200';
        if (imageInput.files.length == 0) {
            submitButton.disabled = true;
        }
        else {
            submitButton.disabled = false;
        }
    }
}
// Event listeners
postTag.addEventListener('change', configureFormConstraints);
imageInput.addEventListener("change", configureFormConstraints);

// store the formdata into localStorage to wherever we want
// it to be stored. Should also store the time and date of when the post should
// be posted
imgElement.addEventListener('change', () => {
    file = imgElement.files[0];
    if (file == undefined) {
        return;
    }
    const reader = new FileReader();
    reader.addEventListener("load", () => {
        dataUrl = reader.result;
    });
    reader.readAsDataURL(file);
    getImgData();
});
//event listener for submit botton
submitButton.addEventListener('click', (event) => {
    event.preventDefault();
    let formData = new FormData(formEle);
    //store user entered image, description, data .. into postObject
    let postObject = {};
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
    postObject['currentIndex'] = postFromLocal.length;
    postFromLocal.push(postObject);
    postFromLocal.sort((post1, post2) => {
        let postDate1 = new Date(post1['dateCompare']);
        let postDate2 = new Date(post2['dateCompare']);
        return postDate1 - postDate2;
    });

    //delete the old instance of the post to be edited 
    postFromLocal.splice(indexToDelete, 1);
    savePostsToStorage(postFromLocal);
    window.location.replace('../index.html')
});

// an event listener for the delete image data button in charge of removing images
// when editing a post
deleteImgDataButton.addEventListener('click', (event) => {
    event.preventDefault();
    dataUrl = '';
    imgPreview.innerHTML = '';
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

// an event listener to take the user back to the main page, 
// when the back button is pressed
backButton.addEventListener('click', () => {
    window.location.replace("../index.html");
});
