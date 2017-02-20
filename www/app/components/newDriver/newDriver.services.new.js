services.factory('newDriverService', function (APP_DEBUG) {
    //define object for two way binding between controller and page
    //
    this.pageModel = {
        "fullname": ""
        , "license": ""
        , "licenseDate": ""
        , "dob": ""
        , "street": ""
        , "city": ""
        , "state": ""
        , "zip": ""
        , "sex": ""
    };
    //
    //assign driver new ID
    this.newID = function (driver) {
        var session = JSON.parse(sessionStorage.getItem("session"));
        var id = session["drivers"].length;
        driver["id"] = id;
        return driver;
    };
    //
    //add license scan functions
    //
    //add license picture upload functions
    //
    //submit user info functions (there doesn't need to be the division between primary and other driver use cases), we can have that be a separate function and have the primary controller/html handle calling it instead, this one is only for ADDING regular (not primary) drivers
    //
    //same for the user info section, only exists for primary drivers, we don't handle it here so it's just:
    //
    //saveDriver prototype, saves the driver object bound from the controller to the page in session storage 
    //
    this.saveDriver = function (driver) {
        var session = JSON.parse(sessionStorage.getItem("session"));
        session["drivers"].push(driver);
        sessionStorage.setItem(session, JSON.stringify(session));
    };
    //
    //This service will hold functions for normal and not primary drivers so in addtion to the above function we must also have, nothing
    //
    //
    //
    //return this;
});