# Form Submission Method

## Context and Problem

There exists a disagreement between which method to choose for the post creation pages check to see if the constraints are met. 

## Considered Options

* Add an form onSubmit eventListener that checks to see if the form works
* Keep the current onClick eventListener for the submit button which has already been implemented
  
## Decision Outcome

We chose to keep the current onClick eventListener since it has already been created and there doesn't seem to be a practical reason to change it. 