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
        var req = {
            method: "POST"
            , url: BASE_SERVER + "/login"
            , headers: {
                'AUTHSTRING': 'Y2xpZW50OnBhc3N3b3Jk'
            }
        };
        sessionStorage.setItem('session', JSON.stringify({}));
        var returnData;
        //        $http(req).then(function (data) {
        //            console.log(data);
        //            //            JSON.parse(data);
        //            session.userCreds['sessionId'] = data.sessionID;
        //            sessionStorage.setItem('credentials', JSON.stringify(session));
        //            returnData = data;
        //            $state.go('home');
        //        }, function (data) {
        //            console.log("login failed, find out why: \n");
        //            console.log(data);
        //            returnData = data;
        //        });
        $.ajax({
            type: "POST"
                //            , crossDomain: true
                
            , async: false
            , url: BASE_SERVER + "/login"
            , headers: {
                //                'access-control-allow-origin': '*'
                'AUTHSTRING': authstring
            }
        }).done(function (data) {
            console.log(data);
            //            JSON.parse(data);
            session.userCreds['sessionId'] = data.sessionID;
            sessionStorage.setItem('credentials', JSON.stringify(session));
            returnData = data;
            $state.go('home');
        }).fail(function (data) {
            console.log("login failed, find out why: \n");
            console.log(data);
            returnData = data;
        });
        return returnData;
    };
    return this;
});