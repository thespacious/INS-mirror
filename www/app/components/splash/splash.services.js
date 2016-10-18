services.factory('splashServices', function ($http, BASE_SERVER, $state) {
    this.credentials = function () {
        if (sessionStorage.getItem('credentials') == null) {
            sessionStorage.setItem('credentials', JSON.stringify({}))
        }
        return JSON.parse(sessionStorage.getItem('credentials'));
    };
    this.b64encode = function (login, password) {
        var object = {};
        object['Authstring'] = btoa(login + ':' + password);
        return object;
    };
    this.login = function (login, password) {
        var session = this.credentials();
        session['userCreds'] = this.b64encode(login, password);
        var authstring = session.userCreds.Authstring;
        //        alert(atob('Y2xpZW50OnBhc3N3b3Jk'));
        sessionStorage.setItem('session', JSON.stringify({}));
        var returnData;
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
                session.userCreds['sessionId'] = data.sessionID;
                sessionStorage.setItem('credentials', JSON.stringify(session));
                returnData = true;
            }
            catch (err) {
                console.log("login failed, got a null response, find out why:");
                console.log(data);
                console.log('and the catch error: \n');
                console.log(err);
                returnData = data;
            }
        }).fail(function (data) {
            console.log("login failed, on network level, find out why:");
            console.log(data);
            returnData = data;
        });
        return returnData;
    };
    return this;
});