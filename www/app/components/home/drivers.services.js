services.factory('driversService', function (BASE_SERVER, $state) {
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
        if (sessionStorage.getItem('credentials') == null) {
            sessionStorage.setItem('credentials', JSON.stringify({}));
        }
        var creds = JSON.parse(sessionStorage.getItem('credentials'));
        var req = {
            type: "POST"
            , url: BASE_SERVER + "/getquoteid"
                //            , headers: {
                //                'SESSIONID': creds.userCreds.sessionId
                //            }
                
            , async: false
        };
        if (creds['quoteId'] == null) {
            $.ajax(req).done(function (data) {
                var creds = JSON.parse(sessionStorage.getItem('credentials'));
                creds['quoteId'] = data;
                sessionStorage.setItem('credentials', JSON.stringify(creds));
            }).fail(function (data) {
                console.log("quote id return error, find out why:");
                console.log(data);
            });
            return true;
        }
        else {
            return false;
        }
    };
//    this.sendQuote = function (json) {
//        var creds = JSON.parse(sessionStorage.getItem('credentials'));
//        var req = {
//            type: "POST"
//                //            , url: BASE_SERVER + "quote/" + creds.quoteId
//                
//            , url: BASE_SERVER + "/quote/" + creds.quoteId
//                //            , headers: {
//                //                'SESSIONID': creds.userCreds.sessionId
//                //            }
//                
//            , async: false
//            , dataType: "json"
//            , contentType: 'application/json; charset=UTF-8'
//            , data: JSON.stringify(json)
//        };
//        $.ajax(req).done(function (data) {
//            console.log(data);
//            $state.go('newCar');
//        }).fail(function (data) {
//            console.log("send quote return error, find out why:");
//            console.log(data);
//            $state.go('newCar');
//            //            var response = data;
//        });
//    };
    return this;
});