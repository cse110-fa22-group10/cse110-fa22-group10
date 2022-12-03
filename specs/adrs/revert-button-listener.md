# CONSTRAINTS SHOULD BE HANDLED BY THE FORM, USING A FORM EVENT LISTENER

## Context and Problem

Too many contraints were being checked by us, the developers while
not considering contraints can be handled by the form itself. 
A group member proposed the change of the submit button event listener to 
a form event listener on the event "submit"

## Considered Options

* change the form contraints to be checked by the form using required attributes on the fieldsets 
* as well as inputting a max length attribute for each form. 
  
## Decision Outcome

Chosen By Majority Vote that was Recasted on 12/2/2022.