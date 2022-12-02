// unit.test.js

const functions = require('../code-to-unit-test/unit-test.js');

// Test if the display date matches what people usually expect of 
test('The display date is a valid date', () => {
    expect(functions.displayDate()).toBe(true);
});

// An example of how we store data in the local storage 
let posts = [];

// Test　if　the function successfully retrieves the data from local storage
test('LocalStorage needs to be initally emppty', () => {
    functions.clearStorage();
    expect(JSON.stringify(functions.getPostsFromStorage())).toBe(JSON.stringify(posts));
});

// Test if the function successfully saves the data to the local storage
test('Save one post to LocalStorage and if call get posts from local Storage, the post saved is expected to be returned', () => {
    // Populate posts with one post instance
    posts = [{"currentIndex":0,"currentContainer":"finished","postSummary":"Unit Testing ","mainTxt":"Unit Testing Specific","dateData":"2022-12-02, 12:50","dateCompare":"2022-12-02T12:50:00","platType":"twitter","mainImg":"data"}]
    functions.clearStorage();
    functions.savePostsToStorage(posts);
    expect(JSON.stringify(functions.getPostsFromStorage())).toBe(JSON.stringify(posts));
})

// Test if the function successfully saves multiple data to the local storage
test('Save multiple (three in this case) posts to LocalStorage and if call get posts from local Storage, the post saved is expected to be returned', () => {
    // Populate posts with one post instance
    posts = [{"currentIndex":0,"currentContainer":"finished","postSummary":"Unit Testing ","mainTxt":"Unit Testing Specific","dateData":"2022-12-02, 12:50","dateCompare":"2022-12-02T12:50:00","platType":"twitter","mainImg":"data"},{"currentIndex":1,"currentContainer":"finished","postSummary":"Unit Testing ","mainTxt":"Unit Testing Specific","dateData":"2022-12-02, 12:50","dateCompare":"2022-12-02T12:50:00","platType":"twitter","mainImg":"data"},{"currentIndex":2,"currentContainer":"finished","postSummary":"Unit Testing ","mainTxt":"Unit Testing Specific","dateData":"2022-12-02, 12:50","dateCompare":"2022-12-02T12:50:00","platType":"twitter","mainImg":"data"}]
    functions.clearStorage();
    functions.savePostsToStorage(posts);
    expect(JSON.stringify(functions.getPostsFromStorage())).toBe(JSON.stringify(posts));
})

// Test　if　the clearStorage indeed deletes everything in localStorage
test('LocalStorage needs to be initally emppty', () => {
    posts = [];
    functions.clearStorage();
    expect(JSON.stringify(functions.getPostsFromStorage())).toBe(JSON.stringify(posts));
});

