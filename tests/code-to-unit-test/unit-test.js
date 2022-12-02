// unit-test.js

module.exports = { displayDate, getPostsFromStorage, savePostsToStorage, clearStorage };

// Setup the definition of local Storage
class LocalStorageMock {
    constructor() {
      this.store = {};
    }
  
    clear() {
      this.store = {};
    }
  
    getItem(key) {
      return this.store[key] || null;
    }
  
    setItem(key, value) {
      this.store[key] = String(value);
    }
  
    removeItem(key) {
      delete this.store[key];
    }
  }
  
  global.localStorage = new LocalStorageMock;

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

    const dateRegex =  /^\d{1,2}\/\d{1,2}\/\d{4}$/;
    const timeRegex =  /^\d{1,2}\:\d{1,2}\:\d{1,2}$/;

    return dateRegex.test(currentDate) && timeRegex.test(currentTime);
}

/**
 * Reads 'posts' from localStorage and returns an array of
 * all of the posts found (parsed, not in string form). If
 * nothing is found in localStorage for 'posts', an empty array
 * is returned.
 * @returns {Array<Object>} An array of posts found in localStorage
 */
 function getPostsFromStorage() {
    global.window = {};
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
    return getPostsFromStorage();
}

function clearStorage() {
  localStorage.clear();
}
