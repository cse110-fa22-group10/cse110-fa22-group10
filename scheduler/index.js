window.addEventListener('DOMContentLoaded', init);

function init() {
    
    let facebookButton = document.getElementById('facebook-create');
    let instagramButton = document.getElementById('instagram-create');
    let twitterButton = document.getElementById('twitter-create');

    facebookButton.addEventListener('click', () => createFb());
    instagramButton.addEventListener('click', ()=>createIns());
    twitterButton.addEventListener('click', ()=>createTw());
    
    // console.log('Added event listeners');
}

// TODO: Once the facebook button is clicked, move to the creation page of the Facebook posts
function createFb(){
    window.location.replace("./create_post/createFb.html");
}

// TODO: Once the instagram button is clicked, move to the creation page of the Instagram posts
function createIns(){
    window.location.replace("./create_post/createIns.html");

}

// TODO: Once the twitter button is clicked, move to the creation page of the Twitter posts
function createTw(){
    window.location.replace("./create_post/createTw.html");

}


