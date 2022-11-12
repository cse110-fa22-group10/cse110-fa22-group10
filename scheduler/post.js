// post.js

// skeleton for post super class
class Post extends HTMLElement {
    // Called once when document.createElement('post-card') is called, or
    // the element is written into the DOM directly as <post-card>
    constructor() {
        // Inheret everything from HTMLElement
        super();

        // Attach the shadow DOM to this Web Component (mode open)
        let shadow = this.attachShadow({
            mode: "open"
        });

        // create article element to act as the main box for posts 
        let articleElement = document.createElement("article");

        // create a style element for this article
        let styleElement = document.createElement("style");

        // populate the CSS for the article
        styleElement.textContent = `    
    article {
        justify-content: center;
        align-items: center;
        background-color: white;
        border-radius: .5in;
        padding: .25in;
        margin: .5in;
        width: auto;
        height: auto;
    }
    .post-head {
        display: flex;
        justify-content: center;
    }
    .post-image {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgb(192, 192, 192);
        border-radius: .25in;
        padding: .25in;
        margin: .10in;
    }
    #main-image {
        border-radius: .5in;
        padding: .25in;
        margin: .10in;
    }
    .post-body {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgb(56, 56, 56);
        color: white;
        border-radius: .25in;
        padding: .25in;
        margin: .10in;
    }
    .platform-type {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .platform-title {
        flex: 1;
        display: flex;
        text-align: center;
        justify-content: center;
        transform: translateX(.50in);
    }
        `;

        // append the elements to the shadow DOM
        shadow.append(articleElement, styleElement);
    }
    /**
     * Called when the .data property is set on this element.
     *
     * For Example:
     * let postCard = document.createElement('post-card'); // Calls constructor()
     * postCard.data = { foo: 'bar' } // Calls set data({ foo: 'bar' })
     *
     * @param {Object} data - The data to pass into the <post-card>, must be of the
     *                        following format:
     *                        {
     *                          "dateData": "string",
     *                          "mainImg": "string",
     *                          "imgAlt": "string",
     *                          "mainTxt": "string",
     *                          "platType": "string"
     *                        }
     */
    set data(data) {
        // If nothing was passed in, return
        if (!data) return;

        // Select the <article> we added to the Shadow DOM in the constructor
        let articleElement = this.shadowRoot.querySelector("article");

        // Set the contents of the <article> with the <article> template given in
        //           postTemplate.html and the data passed in (You should only have one <article>,
        //           do not nest an <article> inside another <article>). You should use Template
        //           literals (tempalte strings) and element.innerHTML for this.
        const currentPostType = data.platType;
        let currentPostIcon;
        switch (currentPostType.toUpperCase()) {
            case "FACEBOOK":
                currentPostIcon = "assets/facebook.png";
                break;
            case "INSTAGRAM":
                currentPostIcon = "assets/instagram.png";
                break;
            case "TWITTER":
                currentPostIcon = "assets/twitter.png";
                break;
            default:
                currentPostIcon = "assets/default-icon.png";
                break;
        }

        articleElement.innerHTML = `
        <div class="post-head">
            <p id="post-date-data">${data.dateData}</p>
        </div>
        <div class="post-image">
            <img id="main-image" src="${data.mainImg}" alt="${data.imgAlt}">
        </div>
        <div class="post-body">
            <p id="main-text">${data.mainTxt}</p>
        </div>
        <span class="platform-type">
            <div class="platform-title">
                <h3 id="platform-name">${data.platType}</h3>
            </div>
            <div class="platform-media">
                <img id="platform-image" src="${currentPostIcon}" alt="${data.platType} icon">
            </div>
        </span>
        `;
    }
}

customElements.define("post-card", Post);
