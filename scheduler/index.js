// Run the init() function when the page has loaded
window.addEventListener('DOMContentLoaded', init);

let Fb = document.querySelector('#facebook-create');
let Ins = document.querySelector('#instagram-create');
let Tw = document.querySelector('#twitter-create');
// Starts the program, all function calls trace back here
function init() {
    let facebookButton = document.getElementById('facebook-create');
    let instagramButton = document.getElementById('instagram-create');
    let twitterButton = document.getElementById('twitter-create');

    let postsArray = getPostsFromStorage();
    for (let index = 0; index < postsArray.length; index++) {
        postsArray[index].currentIndex = index;
    }
    savePostsToStorage(postsArray);

    let deleteFinishedPostsButton = document.querySelector('.delete-all');
    deleteFinishedPostsButton.addEventListener('click', () => {
        let finishedPosts = document.querySelector(".finished-posts");
        finishedPosts.innerHTML = '';
        let currentPostsArray = getPostsFromStorage();
        while (currentPostsArray.length != 0 && currentPostsArray[0].currentContainer != 'upcoming') {
            currentPostsArray.shift();
        }
        savePostsToStorage(currentPostsArray);
    });

    facebookButton.addEventListener('click', () => createFb());
    instagramButton.addEventListener('click', () => createIns());
    twitterButton.addEventListener('click', () => createTw());

    //check posts is finised every 10 miliseconds
    setInterval(checkIfPostFinish, 100);

    // Get the posts from localStorage
    let posts = getPostsFromStorage();
    // Add each Post to the <main> element
    addPostsToMain(posts);

    //display date on main page
    setInterval(displayDate, 100);

    // accessing all finished posts delete buttons and adding event listeners to them
    let finishedPosts = document.querySelector(".finished-posts");
    let finishedPostCardCollection = finishedPosts.getElementsByTagName("post-card");
    for (let currentPost = 0; currentPost < finishedPostCardCollection.length; currentPost++) {
        let currentShadow = finishedPostCardCollection[currentPost].shadowRoot;
        let currentDeleteButton = currentShadow.querySelector(".delete-button");
        currentDeleteButton.addEventListener("click", () => {
            let currentLocalSotrage = getPostsFromStorage();
            let currentIndex = finishedPostCardCollection[currentPost].getAttribute('index');
            for (let index = 0; index < currentLocalSotrage.length; index++) {
                if (currentLocalSotrage[index].currentIndex == currentIndex) {
                    currentLocalSotrage.splice(currentIndex, 1);
                    savePostsToStorage(currentLocalSotrage);
                    window.location.reload();
                    break;
                }
            }
        });
    }
    // accessing all finished posts edit buttons and adding event listeners to them
    for (let currentPost = 0; currentPost < finishedPostCardCollection.length; currentPost++) {
        let currentShadow = finishedPostCardCollection[currentPost].shadowRoot;
        let currentEditButton = currentShadow.querySelector(".edit-button");
        currentEditButton.addEventListener("click", () => {
            console.log("finished edit!");
            window.location.replace("./editPosts.html");
        });
    }

    // accessing all upcoming posts delete buttons and adding event listeners to them
    let upcomingPosts = document.querySelector(".upcoming-posts");
    let upcomingPostCardCollection = upcomingPosts.getElementsByTagName("post-card");
    for (let currentPost = 0; currentPost < upcomingPostCardCollection.length; currentPost++) {
        let currentShadow = upcomingPostCardCollection[currentPost].shadowRoot;
        let currentDeleteButton = currentShadow.querySelector(".delete-button");
        currentDeleteButton.addEventListener("click", () => {
            let currentLocalSotrage = getPostsFromStorage();
            let currentIndex = upcomingPostCardCollection[currentPost].getAttribute('index');
            for (let index = 0; index < currentLocalSotrage.length; index++) {
                if (currentLocalSotrage[index].currentIndex == currentIndex) {
                    currentLocalSotrage.splice(currentIndex, 1);
                    savePostsToStorage(currentLocalSotrage);
                    window.location.reload();
                    break;
                }
            }
        });
    }

    // accessing all upcoming posts edit buttons and adding event listeners to them
    for (let currentPost = 0; currentPost < upcomingPostCardCollection.length; currentPost++) {
        let currentShadow = upcomingPostCardCollection[currentPost].shadowRoot;
        let currentEditButton = currentShadow.querySelector(".edit-button");
        currentEditButton.addEventListener("click", () => {
            console.log("upcoming edit!");
        });
    }
}
/**
 * This function is used to check 
 * and move the posts from upcoming posts
 * to finshed posts if they have a time that is exceeded by the current time
 */
function checkIfPostFinish() {
    // get the current date
    let date = new Date();

    // get the current date and time in the format YEAR-MONTH-DAY, HOURS:MINUTES
    let currentDate = date.getFullYear() + "-" + String(date.getMonth() + 1).padStart(2, "0") + "-"
        + String(date.getDate()).padStart(2, "0") + ", " + String(date.getHours()).padStart(2, "0")
        + ":" + String(date.getMinutes()).padStart(2, "0");

    // try and see if the current date and time exists in the upcoming posts container
    const upComingPosts = document.querySelector(".upcoming-posts");

    // this array contains all post cards of the same date and time, and is a collection of these
    // post cards
    let upcomingPostArray = upComingPosts.getElementsByClassName(currentDate);

    try {
        // if the any of the post cards are past their times in upcoming posts
        // grab the passed posts and throw them into finished posts
        if (upcomingPostArray.length != 0) {
            const finishedPosts = document.querySelector(".finished-posts");
            const counter = upcomingPostArray.length;
            // append every past post card to finished posts
            for (let i = 0; i < counter; i++) {
                finishedPosts.appendChild(upcomingPostArray[i]);
            }
            // remove the entire class instance of the post cards whose times were past due
            upComingPosts.removeChild(upcomingPostArray[0]);
        }
    } catch (error) {
        // do nothing, so that the error is caught and dealt with accordingly
        // nothing should purposley be done
    }
    let currentPostsArray = getPostsFromStorage();
    for (let currentPost = 0; currentPost < currentPostsArray.length; currentPost++) {
        let currentPostDate = new Date(currentPostsArray[currentPost].dateCompare);
        if (currentPostDate < date) {
            currentPostsArray[currentPost].currentContainer = 'finished';
        }
    }
    savePostsToStorage(currentPostsArray);
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
    let finishedPosts = document.querySelector(".finished-posts");

    //populate upcoming posts section
    for (let currentPost = 0; currentPost < posts.length; currentPost++) {
        let postcard = document.createElement("post-card");

        //set an extra attribute so that we can use it in checkIfPostFinish
        postcard.setAttribute('class', posts[currentPost].dateData);
        postcard.setAttribute('index', currentPost);

        postcard.data = {
            'postSummary': posts[currentPost].postSummary,
            'dateData': posts[currentPost].dateData,
            'mainImg': posts[currentPost].mainImg,
            'imgAlt': posts[currentPost].imgAlt,
            'mainTxt': posts[currentPost].mainTxt,
            'platType': posts[currentPost].platType
        };


        //extract the Date property from post
        let currentPostDate = new Date(posts[currentPost].dateCompare);
        let currentDate = new Date();

        //compare the posts with current date and time
        //move posts to corresponding containers
        if (currentPostDate < currentDate) {
            finishedPosts.append(postcard);
        } else {
            upComingPosts.append(postcard);
        }
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

/**
 * Takes in an array of posts, converts it to a string, and then
 * saves that string to 'posts' in localStorage
 * @param {Array<Object>} posts An array of posts
 */
function savePostsToStorage(posts) {
    localStorage.setItem('posts', JSON.stringify(posts));
}

// TODO: Once the facebook button is clicked, move to the creation page of the Facebook posts
function createFb() {
    window.location.replace("./create_post/createFb.html");
}

// TODO: Once the instagram button is clicked, move to the creation page of the Instagram posts
function createIns() {
    window.location.replace("./create_post/createIns.html");

}

// TODO: Once the twitter button is clicked, move to the creation page of the Twitter posts
function createTw() {
    window.location.replace("./create_post/createTw.html");
}

/**
 * get the date from api and display it and the 
 * main page as a title
 */
function displayDate() {
    //get the date and time
    let date = new Date();
    let currentDate = String(date.getMonth() + 1).padStart(2, "0") + "/"
        + String(date.getDate()).padStart(2, "0") + "/" + date.getFullYear();
    let currentTime = String(date.getHours()).padStart(2, "0") + ":"
        + String(date.getMinutes()).padStart(2, "0") + ":" + String(date.getSeconds()).padStart(2, "0");
    let dateTime = currentDate + " " + currentTime;

    //display on the main page
    document.getElementById("current-date").innerHTML = dateTime;
}
