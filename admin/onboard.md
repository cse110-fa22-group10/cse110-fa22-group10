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