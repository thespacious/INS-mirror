services.factory('driversService', function (BASE_SERVER) {
    this.session = function () {
        return JSON.parse(sessionStorage.getItem('session'));
    };
    this.checkDrivers = function (session) {
        if (session['drivers']) {
            return true;
        }
        else {
            return false;
        }
    };
    this.primaryDriver = function (driverId) {
        if ((session['drivers'] == null) && driverId == 0) {
            return true;
        }
        else {
            return false;
        }
    };
    this.drivers = function (driverId) {
        if (this.checkDrivers(this.session()) == true) {
            var sess = this.session();
            return sess.drivers;
        }
        else {
            return [];
        }
    };
    this.checkCars = function (session) {
        if (session['cars']) {
            return true;
        }
        else {
            return false;
        }
    };
    this.cars = function () {
        if (this.checkCars(this.session()) == true) {
            var sess = this.session();
            return sess.cars;
        }
        else {
            return [];
        };
    };
    this.removeCar = function (position) {
        var cars = this.cars();
        cars.splice(position, 1);
        sessionStorage.setItem("session", JSON.stringify(session));
        return this.cars();
    };
    this.getQuoteId = function () {
        var creds = JSON.parse(sessionStorage.getItem('credentials'));
        var req = {
            type: "POST"
            , url: BASE_SERVER + "getquoteid"
            , headers: {
                'SESSIONID': creds.userCreds.sessionId
            }
            , async: false
        };
        if (creds['quote_id'] == null) {
            $.ajax(req).done(function (data) {
                var creds = JSON.parse(sessionStorage.getItem('credentials'));
                creds['quoteId'] = data;
                sessionStorage.setItem('credentials', JSON.stringify(creds));
                return true;
            }).fail(function (data) {
                console.log("quote id return error, find out why:");
                console.log(data);
                return false;
            });
            return true;
        }
        else {
            return false;
        }
    };
    return this;
});