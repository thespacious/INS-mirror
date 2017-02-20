controllers.controller('afterQuoteController', ['BASE_SERVER', '$scope', '$state', '$ionicSlideBoxDelegate', '$injector', '$stateParams', function (baseUrl, $scope, $state, $ionicSlideBoxDelegate, $injector, $stateParams) {
    var afterQuoteServices = $injector.get('afterQuoteService');
    var sketch;
    //    $scope.submit = function () {};
    $(function () {
        sketch = $('#SketchPad').sketch();
        //        sketch = document.getElementById('SketchPad');
    });
    $scope.submitForms = function () {
        if (JSON.parse(sessionStorage.getItem('session')) == null) {
            sessionStorage.setItem('session', JSON.stringify({}));
        }
        var session = JSON.parse(sessionStorage.getItem('session'));
        session['signature'] = {};
        var sign = sketch.get(0).toDataURL("image/png");
        //        var sign = sketch.get(0);
        console.log(sign);
        //        var temp1 = sign.clear;
        var creds = JSON.parse(sessionStorage.getItem('credentials'));
        var req = {
            type: "POST"
            , url: baseUrl + "/accept/" + creds.quoteId
            , async: false
                //            , dataType = "jsonp"
                
            , headers: {
                'SessionID': creds.userCreds.sessionId
            }
            , data: JSON.stringify(sign)
                //            ,contentType = 
        };
        $.ajax(req).done(function (data) {
            console.log(data);
        }).fail(function (data) {
            console.log("signature upload failed, find out why: ");
            console.log(data);
        });
        afterQuoteServices.sendEmails();
    };
    if (window.DeviceOrientationEvent) {
        console.log("DeviceOrientation is supported");
    }
    window.orientation = 90;
    window.addEventListener('deviceorientation', function (eventData) {});
}]);