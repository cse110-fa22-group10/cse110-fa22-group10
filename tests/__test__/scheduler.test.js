describe('Basic user flow for Website', () => {
    // First, visit the scheduler website
    beforeAll(async () => {
      await page.goto('https://cse110-fa22-group10.github.io/cse110-fa22-group10/scheduler/');
    });
  
    // Next, check to make sure that all 0 <post-card> elements have loaded
    it('Initial Home Page - Check for 0 post cards', async () => {
      console.log('Checking for 0 post cards...');
      // Query select all of the <post-card> elements and return the length of that array
      const numCards = await page.$$eval('post-card', (postCards) => {
        return postCards.length;
      });
      // Expect there that array from earlier to be of length 0, meaning 0 <post-card> elements where found
      expect(numCards).toBe(0);
    }, 10000);

    it('Check if the post creation button redirects user to the corresponding page and the back button in the post creation redirects user back to the main page', async () => {
      console.log('Checking for address changing...');

      let curr_url;

      await page.click('button[id=facebook-create]');
      await page.reload();
      await page.waitForSelector('button[id=back-button]' , {
        timeout: 50000
      });
      curr_url = await page.url();
      expect(curr_url).toBe('https://cse110-fa22-group10.github.io/cse110-fa22-group10/scheduler/create_post/createFb.html');

      await page.click('button[id=back-button]');
      await page.reload();
      await page.waitForSelector('button[id=facebook-create]', {
        timeout: 50000
      });
      curr_url = await page.url();
      expect(curr_url).toBe('https://cse110-fa22-group10.github.io/cse110-fa22-group10/scheduler/index.html');

      // Due to the long navigation time, the test is commenedt out in Github Actions. 
      // If wanted, this can be tested locally
      // await page.click('button[id=twitter-create]');
      // await page.reload();
      // curr_url = await page.url();
      // expect(curr_url).toBe('https://cse110-fa22-group10.github.io/cse110-fa22-group10/scheduler/create_post/createTw.html');

      // await page.reload();

      // await page.click('button[id=back-button]');
      // await page.reload();
      // curr_url = await page.url();
      // expect(curr_url).toBe('https://cse110-fa22-group10.github.io/cse110-fa22-group10/scheduler/index.html');

      // await page.reload();

      // await page.click('button[id=instagram-create]');
      // await page.reload();
      // curr_url = await page.url();
      // expect(curr_url).toBe('https://cse110-fa22-group10.github.io/cse110-fa22-group10/scheduler/create_post/createIns.html');

      // await page.reload();

      // await page.click('button[id=back-button]');
      // await page.reload();
      // curr_url = await page.url();
      // expect(curr_url).toBe('https://cse110-fa22-group10.github.io/cse110-fa22-group10/scheduler/index.html');

    }, 1000000);

    // Next, Check all fields are fillable
    it('Fill the fields and Check if all data have been recorded', async () => {
      console.log('Checking for fillable fields...');

      await page.click('button[id=facebook-create]');

      await page.reload();
      await page.waitForSelector('input[name=post-summary]');
      
      // Fill out the required fields to create a post
      await page.$eval('input[name=post-summary]', el => el.value = 'E2E Testing on createFb');
      await page.$eval('textarea[name=desc-input]', el => el.value = 'Used as a test case to see if LocalStorage is correctly populated');
      await page.$eval('input[name=date-to-post]', el => el.value = '2022-11-29');
      await page.$eval('input[name=time-to-post]', el => el.value = '20:27');

      const summary = await page.$eval('#post-summary', (el) => {
        return el.value
      });
      expect(summary).toBe('E2E Testing on createFb');

      const description = await page.$eval('#desc-input', (el) => {
        return el.value
      });
      expect(description).toBe('Used as a test case to see if LocalStorage is correctly populated');

      const date = await page.$eval('#date-to-post', (el) => {
        return el.value
      });
      expect(date).toBe('2022-11-29');

      const time = await page.$eval('#time-to-post', (el) => {
        return el.value
      });

      expect(time).toBe('20:27');

    }, 1000000);

    // Next, fill the required fields and check if the data is uploaded to the localStorage
    it('Fill the fields and Click the Submit button should upload data to LocalStorage', async () => {
      console.log('Checking for "Done" button...');

      // Delete all the localStorage before Starting
      await page.evaluate(() => {
        window.localStorage.clear();
      })

      await page.reload();
      await page.waitForSelector('input[name=post-summary]');
      
      // Fill out the required fields to create a post
      await page.$eval('input[name=post-summary]', el => el.value = 'E2E Testing on createFb');
      await page.$eval('textarea[name=desc-input]', el => el.value = 'Used as a test case to see if LocalStorage is correctly populated');
      await page.$eval('input[name=date-to-post]', el => el.value = '2022-11-29');
      await page.$eval('input[name=time-to-post]', el => el.value = '20:27');

      // Click the Done button 
      await page.click('input[type=submit]')
      
      await page.reload();
      await page.waitForSelector('button[id=back-button]', {
        timeout: 50000
      });
      //Get the post from local Storage
      const post = await page.evaluate(() => {
        return window.localStorage.getItem('posts');
      });
      expect(post).toBe('[{"currentIndex":0,"currentContainer":"upcoming","postSummary":"E2E Testing on createFb","mainTxt":"Used as a test case to see if LocalStorage is correctly populated","dateData":"2022-11-29, 20:27","dateCompare":"2022-11-29T20:27:00","platType":"facebook","mainImg":"","imgAlt":""}]');
      

    }, 1000000);

    // Check if the main page has indeed been successfully populated
    it('The main page should be correctly populated with one post', async () => {      
      console.log('Checking for 1 post cards...');

      await page.reload();

      await page.click('button[id=back-button]');
        
      await page.reload(); 
      await page.waitForSelector('post-card');    
      // Query select all of the <post-card> elements and return the length of that array
      const numCards = await page.$$eval('post-card', (postCards) => {
        return postCards.length;
      });
      // Expect there that array from earlier to be of length 1, meaning 1 <post-card> elements where found
      expect(numCards).toBe(1);
        
      // // Delete all the localStorage before Starting
      // await page.evaluate(() => {
      //   window.localStorage.clear();
      // });
    }, 1000000);

    // Then, check if the edit button on the post works correctly 
    it('The edit button on each post should update the button', async () => {      
      console.log('Trying to update one post...');
      
      await page.hover('post-card');
      const postCards = await page.$$('post-card');
      let shadowRoot = await postCards[0].getProperty('shadowRoot');
      let button = await shadowRoot.$('button[class=edit-button]');
      await button.click();
      
      await page.waitForNavigation();
      
      await page.$eval('input[name=post-summary]', el => el.value = 'E2E Testing on Edit button');
      await page.$eval('textarea[name=desc-input]', el => el.value = 'Used as a test case to see if edit button is working');
      await page.$eval('input[name=date-to-post]', el => el.value = '2022-11-30');
      await page.$eval('input[name=time-to-post]', el => el.value = '17:27');
      await page.$eval('select[id=tag]', el => el.value = "twitter");

      // Click the Done button 
      await page.click('input[type=submit]');
      
      //Force the page the go back to the main page
      await page.goto('https://cse110-fa22-group10.github.io/cse110-fa22-group10/scheduler/index.html');
      // await page.reload();
      // await page.waitForSelector('button[id=back-button]', {
      //   timeout: 50000
      // });

      //Get the post from local Storage
      const post = await page.evaluate(() => {
        return window.localStorage.getItem('posts');
      });
      expect(post).toBe('[{"currentContainer":"upcoming","postSummary":"E2E Testing on Edit button","mainTxt":"Used as a test case to see if edit button is working","dateData":"2022-11-30, 17:27","dateCompare":"2022-11-30T17:27:00","platType":"twitter","mainImg":"","imgAlt":"","currentIndex":0}]');
        
      // Delete all the localStorage before Starting
      await page.evaluate(() => {
        window.localStorage.clear();
      });
    }, 1000000);

    // Then, check if the delete button on the post works correctly 
    it('The delete button on each post should delete the post', async () => {      
      console.log('Trying to delete one post...');
      
      await page.hover('post-card');
      const postCards = await page.$$('post-card');
      let shadowRoot = await postCards[0].getProperty('shadowRoot');
      let button = await shadowRoot.$('button[class=delete-button]');
      await button.click();
      
      //Force the page the go back to the main page
      await page.goto('https://cse110-fa22-group10.github.io/cse110-fa22-group10/scheduler/index.html');

      //Get the post from local Storage
      const post = await page.evaluate(() => {
        return window.localStorage.getItem('posts');
      });
      expect(post).toBe('[]');
        
      // // Delete all the localStorage before Starting
      // await page.evaluate(() => {
      //   window.localStorage.clear();
      // });
    }, 1000000);

    // Finally, testing if the delete all finished posts buttons work as intended
    it('Delete-all finished button should remove all the finished posts but not upcoming post', async () => {
      console.log('Clicking on the button...');

      // Delete all the localStorage before Starting
      await page.evaluate(() => {
        window.localStorage.clear();
      });

      await page.evaluate(() => {
        var posts = [
          {
            currentContainer : "finished",
            currentIndex : 0,
            dateCompare : "2022-12-04T21:58:00",
            dateData : "2022-12-04, 21:58",
            imgAlt : "",
            mainImg : "",
            mainTxt : "Last",
            platType : "twitter",
            postSummary : "asdasdasdasdsa",
          },
          {
            currentContainer : "finished",
            currentIndex : 1,
            dateCompare : "2022-12-04T21:00:00",
            dateData : "2022-12-04, 21:00",
            imgAlt : "",
            mainImg : "",
            mainTxt : "First",
            platType : "twitter",
            postSummary : "asdasdasdasdsa",
          },
          {
            currentContainer : "finished",
            currentIndex : 2,
            dateCompare : "2022-12-04T21:58:00",
            dateData : "2022-12-04, 21:45",
            imgAlt : "",
            mainImg : "",
            mainTxt : "Third",
            platType : "twitter",
            postSummary : "asdasdasdasdsa",
          },
          {
            currentContainer : "finished",
            currentIndex : 3,
            dateCompare : "2022-12-04T21:13:00",
            dateData : "2022-12-04, 21:13",
            imgAlt : "",
            mainImg : "",
            mainTxt : "Second",
            platType : "twitter",
            postSummary : "asdasdasdasdsa",
          },
          {
            currentContainer : "upcoming",
            currentIndex : 4,
            dateCompare : "2022-12-04T21:13:00",
            dateData : "2022-12-04, 21:33",
            imgAlt : "",
            mainImg : "",
            mainTxt : "Fourth",
            platType : "twitter",
            postSummary : "asdasdasdasdsa",
          }  
        ];
        window.localStorage.setItem('posts',JSON.stringify(posts));
      })

      //Force the page the go back to the main page
      await page.goto('https://cse110-fa22-group10.github.io/cse110-fa22-group10/scheduler/index.html');

      await page.click('button[class=delete-all]');

      //Force the page the go back to the main page
      await page.goto('https://cse110-fa22-group10.github.io/cse110-fa22-group10/scheduler/index.html');
      await page.reload();
      //Get the post from local Storage
      const post = await page.evaluate(() => {
        return window.localStorage.getItem('posts');
      });
      
      // expect to receive only upcoming posts 
      expect(post).toBe('[{"currentContainer":"upcoming","currentIndex":0,"dateCompare":"2022-12-04T21:13:00","dateData":"2022-12-04, 21:33","imgAlt":"","mainImg":"","mainTxt":"Fourth","platType":"twitter","postSummary":"asdasdasdasdsa"}]');

    }, 1000000);
})

