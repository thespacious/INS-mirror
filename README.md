# README #

This README would normally document whatever steps are necessary to get your application up and running.

### What is this repository for? ###

* Quick summary
    * This repository is to hold and version the insurescan client app
* Version
    * 1.0.1

### How do I get set up? ###

* Summary of set up
    * cordova is still node so make sure you check to make sure all dependencies installed
* Configuration
    * manateeworks barcodescanner: www/js/MWBConfig.js
        * you must remove the platform you wish to build for if you wish to change scanner config and add it back after
    * App config for features, plugins, and platform-specific settings handled in config.xml
    * App ID, App Name, gulp tasks, watch patterns, Ionic Cloud config: ionic.config.json
    * Project settings: .project
    * Start Page, Icon: www/manifest.json
    * Routing, event-listeners: www/js/app.module.js
    * Included JS and CSS: index.html 
* Dependencies
    * nodejs 6.9^
    * npm 3^
    * cordova 5^
    * ionic v1
    * for a list of project dependencies see package.json

* Database configuration
    * Not Applicable
* How to run tests
    * Not applicable
* Deployment instructions
    * Git pull the project 
    * npm install
    * cordova add platform android (or browser)
    * cordova run android (or browser) (will build before run)

### Who do I talk to? ###

* Repo owner or admin
    * Patrick Williams (pdw0005@gmail.com)