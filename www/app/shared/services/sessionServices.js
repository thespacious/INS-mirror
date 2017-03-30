services.factory('sessionServices', ['$http', 'BASE_SERVER', '$state', '$q', 'APP_DEBUG', function ($http, BASE_SERVER, $state, $q, APP_DEBUG) {
    //========================================================================
    //========================================================================
    //Session Services will handle all manipulations of the sessionStorage objects including drivers, cars, coverages, discounts, dates, garging info, 
    //All services should have at least these services injected
    //
    'use strict';
    var TAG = "Session Services: ";
    //===========
    //create credentials and session objects in sessionStorage
    //===========
    this.setupSession = function () {
        if (sessionStorage.getItem('credentials') === null) {
            sessionStorage.setItem('credentials', JSON.stringify({}));
        }
        if (sessionStorage.getItem('session') === null) {
            sessionStorage.setItem('session', JSON.stringify({}));
        }
    };
    //
    //create getter and setter functions
    //
    this.getCreds = function () {
        if (sessionStorage.getItem('credentials') === null) {
            sessionStorage.setItem('credentials', JSON.stringify({}));
        }
        return JSON.parse(sessionStorage.getItem('credentials'));
    };
    this.getSession = function () {
        if (sessionStorage.getItem('session') === null) {
            sessionStorage.setItem('session', JSON.stringify({}));
        }
        return JSON.parse(sessionStorage.getItem('session'));
    };
    this.setCreds = function (creds) {
        try {
            sessionStorage.setItem('credentials', JSON.stringify(creds));
            return true;
        }
        catch (err) {
            console.log("credentials session store failed, ", err);
            return false;
        }
    };
    this.setSession = function (sess) {
        try {
            sessionStorage.setItem('session', JSON.stringify(sess));
            return true;
        }
        catch (err) {
            console.log("credentials session store failed, ", err);
            return false;
        }
    };
    //
    ///Getters and Setters for cars and drivers
    //
    this.getDrivers = function () {
        var session = this.getSession();
        if (!session.drivers) {
            session['drivers'] = [];
        }
        return session['drivers'];
    };
    this.getCars = function () {
        var session = this.getSession();
        if (!session.cars) {
            session['cars'] = [];
        }
        return session['cars'];
    };
    this.setDrivers = function (drivers) {
        var session = this.getSession();
        try {
            session['drivers'] = drivers;
            this.setSession(session);
            return true
        }
        catch (err) {
            console.log(TAG + 'error storing drivers, ', err);
            return false;
        }
    };
    this.setCars = function (cars) {
        var session = this.getSession();
        try {
            session['cars'] = cars;
            this.setSession(session);
            return true;
        }
        catch (err) {
            console.log(TAG + 'error storing cars, ', err);
            return false;
        }
    };
    //
    ///Push single car or driver to list
    //
    this.pushDriver = function (driver) {
        var session = this.getSession();
        if (!session['drivers']) {
            session['drivers'] = [];
        }
        try {
            session['drivers'].push(driver);
            return true;
        }
        catch (err) {
            console.log(TAG + 'single driver storage failed, ', err);
            return false;
        }
    };
    this.pushCar = function (car) {
        var session = this.getSession();
        if (!session['cars']) {
            session['cars'] = [];
        }
        try {
            session['cars'].push(car);
            return true;
        }
        catch (err) {
            console.log(TAG + 'single car storage failed, ', err);
            return false;
        }
    };
    //
    //Remove Drivers and Cars by name and vin respectively
    //
    this.removeDriver = function (name) {
        var drivers = this.getDrivers();
        var cars = this.getCars();
        try {
            for (driver in drivers) {
                if (driver.fullname == name) {
                    for (var car in cars) {
                        if (car.owner == name) {
                            console.log(TAG + 'cars before splice, ', cars);
                            cars.splice(cars[car], 1);
                            console.log(TAG + "cars after splice, ", cars);
                        }
                    }
                    drivers.splice(drivers[driver], 1);
                }
            }
            return true;
        }
        catch (err) {
            console.log(TAG + "driver removal failed for: ", name + "\nwith: ", err);
            return false;
        }
    };
    this.removeCar = function (vin) {
        var cars = this.getCars();
        try {
            for (var car in cars) {
                if (car.vin == vin) {
                    cars.splice(cars[car], 1);
                }
            }
            return true;
        }
        catch (err) {
            console.log(TAG + "Remove car by vin failed, ", err);
            return false;
        }
    };
    //Delete session
    this.clearSession = function () {
        sessionStorage.setItem('session', JSON.stringify({}));
    };
    this.clearCreds = function () {
        sessionStorage.setItem('credentials', JSON.stringify({}));
    };
    return this;
}]);