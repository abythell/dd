The Daily Declan
================

To modify, build, and publish this application, you'll need:

1. [node.js](https://nodejs.org/en/)
2. [git](http://git-scm.com/download/)

Then:
```
git clone https://github.com/abythell/dd.git
cd dd
npm install
gulp
```
`gulp` will combine and minify all javascript sources in the `app` directory and
output dist/dd.min.js.  To run gulp automatically whenever a javascript file changes,
run `gulp watch`.  For debugging purposes, it may be helpful to use the non-minified
version, `dist/dd.js` by modifying `index.html`.

