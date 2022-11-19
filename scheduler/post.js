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
        postition: relative;
        justify-content: center;
        align-items: center;
        background-color: rgb(217,217,217);
        border-radius: 1vw;
        width: auto;
        height: auto;
    }
    .post-head {
        display: flex;
        justify-content: center;
        font-size: 1.25vw;
    }
    .post-image {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgb(192, 192, 192);
        border-radius: .5vw;
        padding: .5vw;
        margin: .5vw;
        position: relative;
    }
    #main-image {
        position: relative;
        border-radius: 1vw;
        margin: .2vw;
        width: 50%;
        height: 50%;
    }
    .post-body {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgb(115,107,107);
        color: white;
        border-radius: 1vw;
        margin: .5vw;
        position: relative;
        max-width: 100%;
        max-height: 100%;
    }
    #main-text {
        postition: relative;
        font-size: 1.5vw;
    }
    .platform-type {
        position: relative;
        display: flex;
        align-items: center;
        margin: .5vw;
    }
    .platform-title {
        position: relative;
        font-size: 1vw;
        text-align: center;
        left: 40%;
    }
    #platform-image {
        position: relative;
        height: 10%;
        width: 10%;
        left: 40%;
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
                data.platType = "FACEBOOK";
                currentPostIcon = "assets/facebook.png";
                break;
            case "INSTAGRAM":
                data.platType = "INSTAGRAM";
                currentPostIcon = "assets/instagram.png";
                break;
            case "TWITTER":
                data.platType = "TWITTER";
                currentPostIcon = "assets/twitter.png";
                break;
            default:
                currentPostIcon = "assets/default-icon.png";
                break;
        }

        if (data.mainImg == "") {
            articleElement.innerHTML = `
            <div class="post-head">
                <p id="post-date-data">${data.dateData}</p>
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
        } else {
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
}

customElements.define("post-card", Post);
