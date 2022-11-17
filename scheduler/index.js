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

const Fb = document.getElementById('Fb');
const Ins = document.getElementById('Ins');
const Tw = document.getElementById('Tw');

Fb.addEventListener('click', ()=>createFb());
Ins.addEventListener('click', ()=>createIns());
Tw.addEventListener('click', ()=>createTw());
