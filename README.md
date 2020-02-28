Citywide Dashboard
==================

Downloading and Updating Database
---------------------------------

First, be sure to stop and remove any existing MongoDB container associated
with this project that you may have.
(The relevant commands are `docker stop` and `docker rm`.)
Then, in the `db` directory, run `./run.sh`, then `./download-prod.sh`,
then `./upload-prod.sh`.
Open an issue for any further issues that develop within this process.

Editing the `src/` Folder
-------------------------

Since the `app.js` file is handled directly by the web browser, it can be
developed simply by saving the file and reloading the webpage.
However, the `src/` folder is built into a bundle by Webpack, so it needs
to get recompiled after being saved in order for the changes to be noticed.
To do this, make sure you have Webpack installed (`npm install -g webpack-cli`)
and run `webpack` in the `cwd/` folder each time you make a change inside of the
`src/` folder.

Future ease of development would call for a listener to be attached to the `src/`
folder that will result in `webpack` automatically getting run each time that
a file is modified.
