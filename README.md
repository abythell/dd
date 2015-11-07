The Daily Declan
================
A communication tool for a special boy named Declan.  Unless you are Declan, a
member of his family, or one of his support team, this project likely is of no
interest to you.


Requirements
------------
To modify, build, and/or publish this application, you'll need:

* [node.js](https://nodejs.org/en/)
* [git](http://git-scm.com/download/)
* Some kind of development environment, like Netbeans or Notepad

Setup the Development Environment
---------------------------------
Do this once to get everything setup:

```
git clone https://github.com/abythell/dd.git
cd dd
npm install
npm install -g gulp
gulp
```

Modifying and Debugging
-----------------------
You can edit this project using any development tool of your choice, however
the app was built using Netbeans and will open in Netbeans as an HTML5 project.

`gulp` will combine and minify all javascript sources in the `app` directory and
output to `./dist/dd.min.js`.  You will need to run `gulp` anytime you change a 
javascript file to update `dd.min.js`.

To run gulp automatically whenever a javascript file changes, run `gulp watch`.
Then, anytime a javascript file is saved, gulp will automatically output a new
`dd.min.js`.

For debugging purposes, it may be helpful to use the non-minified version,
`dist/dd.js` by modifying `index.html`.

You can submit any changes, fixes, or improvements by creating a [git pull
request](https://github.com/abythell/dd/pulls).

Deploying
---------
Publish the application to firebase by running
`node_modules/firebase-tools/bin/firebase/deploy`.  If you want to publish to a
database other than default, please see `firebase.json`.

About
-----
Copyright 2015 Trevor Patterson, Andrew Bythell.
