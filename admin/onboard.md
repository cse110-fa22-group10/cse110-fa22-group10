# Making Changes to the Repository

Welcome to the repo! This document will show the steps that you should take in order
to properly make a change to the project. Since we use Github as our version control and 
CI/CD pipeline, it's crucial to follow the process to ensure everything functions and the build does not get ruined.

## Before Working
1. Identify the issue you want to address or feature you would like to add. Someone may already 
   be working on it, so you should check the Issues tab. If there doesn't already exist an issue, you can create one and add it to the project board, then assign assign yourself. Otherwise, consider reaching out to the person working on it. 
2. You need to download a local copy of the repo to make changes. This can be done using
```git clone https://github.com/cse110-fa22-group10/cse110-fa22-group10.git``` assuming you have git installed.

3. Once you clone the repo, you need to checkout a seperate branch off of main.

Work on the project to your hearts content, but try to only make changes to one part of the project at a time. For instance, don't change a frontend feature to be more aligned or something, when the issue is related to the backend of the site.
Changing more things will lead to a larger review and may interfere with other group member's work, so it's best to follow the incremental development pattern.

Lastly, ensure to figure out test cases and add them to the testing files that get used during our Github Action. Thoroughly test it yourself as well!

## Merging Your Work
0. Ensure that your local branch is caught up to the main branch, in case someone else pushed a change that causes your work to change. Fix if needed.
1. Once your work is finished, push the branch to the repository. This opens a pull request, which becomes the process in which your work becomes incorporated.
2. The pull request will provide an overview of your changes to other members, as well as perform checks on your code for errors and style details. If your code has a major error, the checks will fail, and you will need to fix it before proceeding. You can learn more about the checks in the section below.
3. If the checks pass, other members of the group will review your code and provide feedback, but overall approve if your code is ready to be merged.
4. If your code receives enough approval, then the pull request will be merged, and your work can be seen immediately once the project is deployed.
5. Close the issue you worked on, and feel free to restart the process with a new issue.

# Explaining the Github actions

The Github Actions are consist of five jobs: build, lint, documentation, E2E_and_unit_test and validate_html. Whenever there is a pull request or a direct push to the main branch, GitHub Actions will be activated to run all these five jobs to check through the branch code as a whole. (Notice: If you want to activate GitHUb Actions in your own branch, go to ```cse110-fa22-group10/.github/workflow/main.yml``` and add the name of your branch to the line that includes the keyword 'branches:'.)

## Build
This job basically runs to test if the GitHub Actions are working correctly such that the repository can be checked out and ready to be used for access by other jobs.

## Lint
This job utilizes the super-linter provided by GitHub to find styling issues in each file and report them to the console output. Fixes are suggested in the console output but not automatically fixed, and a status check will show up as failed at the end. The types of files that are checked by this linter includes .md, .css, .html and etc. Configurations of the linter can be checked in the ```main.yml``` file. For more information on how this super-linter works, click the link: [Super-Linter](https://github.com/marketplace/actions/super-linter).

## Documentation
This job utilizes the JSDocs to document all the .js files existed in the ```./scheduler``` directory and pushes all the changes to the pipeline branch at the end of the process (Remember to merge the pipieline branch with the main branch to update the documentation in the main branch at the end if you want to document your new .js files !). Configurations of the documentation can be checked in the ```main.yml``` file. For more information on how this super-linter works, click the link: [JSDoc Action](https://github.com/marketplace/actions/jsdoc-action).


## E2E_and_unit_test
The job utilizes Jest and Pupeteer as basis and API to perform unit testing and End-to-End testing on the .test.js files. Node_modules are automatically installed during the process so there is no need to push the folder since it is excessive. Configurations of the E2E_and_unit_test can be checked in the ```main.yml``` file, the ```package.json``` file and the ```package-lock.json```. For more information on how this E2E_and_unit_test works, click the link: [Run Jest](https://github.com/marketplace/actions/run-jest/

## validate_html
The job utilizes HTML5 Validator to check the syntax of all .html files in the ```./scheduler``` directory. The issues and suggestions of fixes are displayed in the GitHub Actions page and need the developers themselves to resolve these issues by hand. For more information on how this validate_html works, click the link: [HTML5 Validator(https://github.com/marketplace/actions/html5-validator).

Feel free to add more Github Actions if feel neede but remember to make sure that they do not interrupt with other jobs.