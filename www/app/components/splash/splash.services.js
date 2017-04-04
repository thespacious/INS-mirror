services.factory('splashServices', function ($http, BASE_SERVER, $state, $q, APP_DEBUG) {
    var TAG = "Splash/Login Services: ";
    //
    //============================================
    //GET CREDENTIALS OR CREATE CREDENTIALS OBJECT
    //============================================
    //
    this.credentials = function () {
        if (sessionStorage.getItem('credentials') == null) {
            sessionStorage.setItem('credentials', JSON.stringify({}))
        }
        return JSON.parse(sessionStorage.getItem('credentials'));
    };
    //
    //============================
    //B64 ENCODE USERNAME PASSWORD
    //============================
    //
    this.b64encode = function (login, password) {
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
    //
    //=====
    //LOGIN
    //=====
    //
    this.login = function (login, password) {
        //
        //add username password to local storage create return data object
        //This is the data used to initiate the session, it is not part of the session itself
        //
        var _this = this;
        //
        //get creds
        var credentials = this.credentials();
        //
        //assign value of login
        credentials['userCreds'] = this.b64encode(login, password);
        //retrieve newly created credentials
        var authstring = credentials.userCreds.Authstring;
        //
        //set username/password in credentials object
        credentials['userCreds'] = this.b64encode(login, password);
        //        alert(atob('Y2xpZW50OnBhc3N3b3Jk'));
        //
        //after successful login we will initialize session object with returned values
        sessionStorage.setItem('session', JSON.stringify({}));
        var returnData;
        //
        //DEBUG: We have to make the ajax call, even during debug because we need a valid sessionId which expire every so often
        //we should request a debug sessionId that doesnlt expire
        //
        $.ajax({
            type: "POST"
                //            , crossDomain: true
                
            , contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
            , async: false
            , url: BASE_SERVER + "/login"
            , headers: {
                //                'access-control-allow-origin': '*'
                'AUTHSTRING': authstring
            }
        }).done(function (data) {
            console.log(data);
            try {
                credentials.userCreds['sessionId'] = data.sessionID;
                sessionStorage.setItem('credentials', JSON.stringify(credentials));
                returnData = true;
            }
            catch (err) {
                console.log("login failed, got a null response, find out why:");
                console.log(data);
                console.log('and the catch error: \n');
                console.log(err);
                returnData = false;
            }
        }).fail(function (data) {
            console.log("login failed, on network level, find out why:");
            console.log(data);
            returnData = false;
        });
        return returnData;
    };
    return this;
});