# Class based approach for posts

## Context and Problem

How to write post code?
How to differentiate between platform posts?

## Considered Options

* One Post class with tags
* Superclass Post class w/ diff platform subclasses

## Decision Outcome

Chosen option: "Superclass Post class w/ diff platform subclasses" because it allows for constraints to be built into the class.