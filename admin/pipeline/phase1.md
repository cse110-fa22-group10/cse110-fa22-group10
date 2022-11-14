# Pipeline Phase 1

![Pipeline Image](phase1.drawio.png)

## Protected Branch Rules (In Progress)
Each pull requests are needed to be reviewed by at least two people by merging the current working branch with the main branch. <br/>
<span style="color:red">Issues</span> to be solved: "Your protected branch rules for your main branch won't be enforced on this private repository until you upgrade your organization account to a Github Team or Enterprise account." (For more information, try to commit to the main branch directly and the warning will appear in a yello image!)

## Super-Linter
The functionality of this tool:
- Prevent broken code from being uploaded to the default branch (Usually master or main)
- Help establish coding best practices across multiple languages
- Build guidelines for code layout and format
- Automate the process to help streamline code reviews<br/>

The super-linter finds issues and reports them to the console output. Fixes are suggested in the console output but not automatically fixed, and a status check will show up as failed on the pull request. The types of files that are checked by this linter includes: CSS, JS, HTML, MD and etc. For more information on how this super-linter works, click the link:
[Super-Linter](https://github.com/marketplace/actions/super-linter)

## CODACY
Already link this repository with codacy and invite each team member to join codacy for code quality checking. Within Codacy, the number of issues created, the commits by each team member, the files uploaded in each branch, the pull requests, the contents of issues are displayed. As for the configuration of Codacy, we employ built-in tools **CSSLint v1.0.5, ESLint 8.23.1, PMD 6.48.0, Stylelint v14.2.0 and remark-lint v.7.0.** With the codacy running properly, we are able to debug both css and javascripts files and style each files properly. 

## Jest (In Progress)
Jest is a JavaScript Testing Framework with a focus on simplicity which can be used for unit tests on .js files. Configured within the main.yml such that the folder to be run unit tests on is ./public/src and the output file goes to ./public/debug for a clearer and more organized view of what goes wrong. <br/>
<span style="color:red">Issues</span> to be solved: "sh: ./node_modules/.bin/jest: not found" (For more information, go to Github actions and look at the summary of why build failed)

## JSDocs (In Progress)
JSDocs is an API documentation generator for JavaScript. Configured within the main.yml such that the folder to be run unit tests on is ./public/src and the output file goes to ./public/debug for a clearer and more organized view of what goes wrong and use template minami for a better view of the output file. <br/>
<span style="color:red">Issues</span> to be solved: Unable to be tested due to the failing of Jest. Fix Jest first !!! (For more information, go to Github actions and look at the summary of why build failed)

- Test the functionality CI/CD
