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
    //    screen.lockOrientation('portrait');
}]);