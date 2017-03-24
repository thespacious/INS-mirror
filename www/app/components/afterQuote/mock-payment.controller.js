controllers.controller('paymentCtrl', ['BASE_SERVER', '$scope', '$state', '$ionicSlideBoxDelegate', '$injector', '$stateParams', function (baseUrl, $scope, $state, $ionicSlideBoxDelegate, $injector, $stateParams) {
    $scope.footerText = 'next';
    $scope.userInfo = {
        "fullname": {
            "type": "text"
            , "value": null
        , }
        , "ccnumber": {
            "type": "number"
            , "value": null
        }
        , "ccv": {
            type: "number"
            , value: null
        }
        , "expDate": {
            "type": "date"
            , "value": null
        }
    };
    /////////////////////// CC Scanner Config ////////////////////////
    $scope.scanCard = function () {
        var cardIOResponseFields = [
      "card_type"
      , "redacted_card_number"
      , "card_number"
      , "expiry_month"
      , "expiry_year"
      , "cvv"
      , "zip"
    ];
        var onCardIOComplete = function (response) {
            for (var i = 0, len = cardIOResponseFields.length; i < len; i++) {
                var field = cardIOResponseFields[i];
                console.log(field + ": " + response[field]);
            }
        };
        var onCardIOCancel = function () {
            console.log("card.io scan cancelled");
        };
        var onCardIOCheck = function (canScan) {
            console.log("card.io canScan? " + canScan);
            var scanBtn = angular.element($("#scanBtn")).scope();
            //var scanBtn = document.getElementById("scanBtn");
            if (!canScan) {
                scanBtn.innerHTML = "Manual entry";
            }
        };
        CardIO.scan({
            "collect_expiry": true
            , "collect_cvv": false
            , "collect_zip": false
            , "shows_first_use_alert": true
            , "disable_manual_entry_buttons": false
        }, onCardIOComplete, onCardIOCancel);
        CardIO.canScan(onCardIOCheck);
    };
    //    screen.lockOrientation('portrait');
}]);