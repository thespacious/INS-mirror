services.factory('afterQuoteService', function (BASE_SERVER, $state) {
    this.sendEmails = function (json) {
        var session = JSON.parse(sessionStorage.getItem('session'));
        var drivers = session.drivers;
        //
        var recipients = ["me@mathewmoon.net", "bissellmgmt@gmail.com", "pdw0005@gmail.com", "jmarkchappell@ gmail.com", "john@ sandstermite.com"]
        var cc = ["me@mathewmoon.net", "bissellmgmt@gmail.com", "pdw0005@gmail.com", "jason@roundhouseoa.com", "jmarkchappell@ gmail.com"];
        //
        for (i = 0; i < drivers.length; i++) {
            recipients.push(drivers[i].email);
        }
        var creds = JSON.parse(sessionStorage.getItem('credentials'));
        var req = {
            type: "POST"
                //            , url: BASE_SERVER + "quote/" + creds.quoteId
                
            , url: BASE_SERVER + "/maildocs/" + creds.quoteId
            , headers: {
                'SESSIONID': creds.userCreds.sessionId
            }
            , async: false
            , dataType: "json"
                //            , contentType: 'multipart/form-data; charset=UTF-8'
                
            , data: {
                "recipients": recipients
                , "cc": cc
            }
        };
        $.ajax(req).done(function (data) {
            console.log(data);
            //            $state.go('newCar');
        }).fail(function (data) {
            console.log("send quote return error, find out why:");
            console.log(data);
            //            $state.go('newCar');
            //            var response = data;
        });
    };
    return this;
});