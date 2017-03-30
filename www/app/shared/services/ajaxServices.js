services.factory('ajaxServices', ['$http', 'BASE_SERVER', '$state', '$q', 'APP_DEBUG', 'sessionServices', 'SKIP_API', function ($http, BASE_SERVER, $state, $q, APP_DEBUG, session, SKIP_API) {
    var TAG = "AJAX Services: ";
    //
    //==============================================================
    //LOGIN
    //==============================================================
    //Credentials for login
    //
    var credentials = session.getCreds();
    var b64encode = function (login, password) {
        var object = {};
        //DEBUG: user name/password is client/password for debug purposes
        if (APP_DEBUG) {
            object['Authstring'] = btoa('client' + ':' + 'password');
        }
        else {
            object['Authstring'] = btoa(login + ':' + password);
        }
        return object;
    };
    this.login = function (login, password) {
        //All ajax functions will return promises
        var deferred = $q.defer();
        var returnData;
        //Create object in credentials to house encoded user/pass
        //
        credentials['userCreds'] = b64encode(login, password);
        //
        //encode and store in sessionStorage
        var authstring = credentials.userCreds.Authstring;
        session.setCreds(credentials);
        //
        //Create request object for login
        var req = {
            type: "POST"
            , contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
            , url: BASE_SERVER + "/login"
            , headers: {
                'AUTHSTRING': authstring
            }
        };
        $.ajax(req).done(function (data) {
            console.log("login service returned successful request, ", data);
            try {
                credentials.userCreds['sessionId'] = data.sessionID;
                session.setCreds(credentials);
                deferred.resolve(true);
            }
            catch (err) {
                console.log('error storing the sessionID after successful ajax call, ', err);
                deferred.reject(false);
            }
        }).fail(function (error) {
            console.log("Login Ajax call failed, ", error);
            deferred.reject(false);
        });
        return deferred.promise;
    };
    this.request = function (options) {
        var req = $.ajax(options);
        return req;
    };
    //
    //======================================================
    //Get Quote ID
    //======================================================
    //
    this.getQuoteId = function () {
        //
        var deferred = $q.defer();
        //DEBUG: skip
        if (SKIP_API) {
            return deferred.resolve(true);
        }
        var creds = session.getCreds();
        var req = {
            type: "POST"
            , url: BASE_SERVER + "/getquoteid"
            , headers: {
                'SESSIONID': creds.userCreds.sessionId
            }
        };
        if (creds['quoteId'] === null) {
            $.ajax(req).done(function (data) {
                var creds = session.getCreds();
                creds['quoteId'] = data;
                session.setCreds(creds);
                deferred.resolve(true);
            }).fail(function (error) {
                console.log(TAG + 'Get Quote ID ajax call failed, ', error);
                deferred.reject(false);
            });
        }
        return deferred.promise;
    };
    return this;
}]);