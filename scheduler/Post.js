//Post.js
// skeleton for post super class, still needs lots of work
class Post extends HTMLElement {
    // Called once when document.createElement('custom-post') is called, or
    // the element is written into the DOM directly as <custom-post>
    constructor() {
        // Inheret everything from HTMLElement
        super();

        // Attach the shadow DOM to this Web Component (mode open)

        //just an idea on what it could look like
        let shadow = this.attachShadow({ mode: "open" });

        let dayPosted = document.createElement("day");
        let datePosted = document.createElement("date");
        let timePosted = document.createElement("time");
        let postText = document.createElement("text");
        let postType = document.createElement("type");

        //TODO create a style element for all the information above
        let styleElement = document.createElement("style");

        styleElement.textContent = ``;

        //append the elements to the shadow DOME
        shadow.append(dayPosted, datePosted, timePosted, postText, postType, styleElement);
    }

}

customElements.define("current-post", Post);