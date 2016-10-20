controllers.controller('afterQuoteController', ['BASE_SERVER', '$scope', '$state', '$ionicSlideBoxDelegate', '$injector', '$stateParams', function (baseUrl, $scope, $state, $ionicSlideBoxDelegate, $injector, $stateParams) {
    $scope.footerText = 'submit';
    var afterQuoteServices = $injector.get('afterQuoteService');
    var sketch;
    //    $scope.submit = function () {};
    //    var initSign = function () {
    //        $('#signature').jSignature();
    //        //        sketch = document.getElementById('SketchPad');
    //    };
    $(function () {
        sketch = $('#SketchPad').sketch();
        sketch = document.getElementById('SketchPad');
    });

    function getBase64Sig() {
        // get the element where the signature have been put
        var $sigdiv = $("#signature");
        // get a base64 URL for a SVG picture
        var data = $sigdiv.jSignature("getData", "svgbase64");
        // build the image...
        var i = new Image();
        i.src = "data:" + data[0] + "," + data[1];
        // and put it somewhere where the sun shines brightly upon it.
        $(i).appendTo($("#output"));
        return data;
    }
    $scope.submitForms = function () {
        if (JSON.parse(sessionStorage.getItem('session')) == null) {
            sessionStorage.setItem('session', JSON.stringify({}));
        }
        var session = JSON.parse(sessionStorage.getItem('session'));
        session['signature'] = {};
        //        var sign = sketch.get(0).toDataURL("image/png");
        var sign = getBase64Sig();
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
    //    initSign();
    //    window.addEventListener('deviceorientation', function (eventData) {});
}]);