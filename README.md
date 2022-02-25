# The Daily Declan

A communication tool for a special boy named Declan.  Unless you are Declan, a
member of his family, or one of his support team, this project likely is of no
interest to you.

## Requirements

To modify, build, and/or publish this application, you'll need:

* [node.js](https://nodejs.org/en/) - includes node, npm, and npx
* [git](http://git-scm.com/download/)

## Setup the Development Environment

Do this once to get everything setup:

```
git clone https://github.com/abythell/dd.git
cd dd
npm install
npx firebase login
npx firebase use default
```

Test the app by running it locally with `npm run dev`.  

_Note:__ it is safe to ignore warnings about the createUser and deleteUser cloud
functions - this is a limitation of the firebase emulator.

## Modifying and Debugging

There is a collection of scripts that get combined and minified into a single
script that is served to the browser.  When these scripts are changed, they
need to be minified.  `npm run watch` watches and runs automatically on change,
or you can run the process manually using `npm run minify`.

## Publishing and Deploying

To create a new release, run `npm version patch|minor|major` to increment the
version, create a git tag, and push to Github.

To publish the application to Firebase: `npm run deploy`.  After publishing, users
may need to refresh and/or clear caches.

If something goes wrong with a published version, the Firebase console can be used
to roll-back to a previous version.

## About

Copyright 2015 - 2022 Trevor Patterson, Andrew Bythell.
