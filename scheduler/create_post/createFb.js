const postDescription = document.getElementById('desc-input');
const postTag = document.getElementById('tag');
const imageInput = document.getElementById('image-input');
const submitButton = document.getElementById('submit');

window.addEventListener('DOMContentLoaded', init);

function init() {
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

// OnSubmit - store the formdata into localStorage to wherever we want
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

/**
 * Function called when clicking the submit button to check 
 * if text, date and time have been entered and if not,
 * the submit button is disabled 
 */
 function checkRequiredFields() {
    let formData = new FormData(formEle);
    if (formData.get('post-summary') == "" || formData.get('desc-input') == "" || formData.get('date-to-post') == "" || formData.get('time-to-post') == ""){
        return false;
    }
    return true;
}

//event listener for submit botton
submitButton.addEventListener('click', () => {
    let formData = new FormData(formEle);
    // Check if all required fields have been filled 
    if (!checkRequiredFields()){
        alert("Please fill out Summary, Description ,Date and Time !");
        submitButton.disabled = true;
        setTimeout(() => {
            submitButton.disabled = false;
        }, 1000);
    }
    //store user entered image, description, data .. into postObject
    else{
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
    }
});

// Event listeners
//check posts is finised every 10 miliseconds
//setInterval(checkRequiredFields, 100);

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
