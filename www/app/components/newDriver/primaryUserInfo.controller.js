controllers.controller('primaryInfoCtrl', ['BASE_SERVER', '$scope', '$state', '$stateParams', '$ionicSlideBoxDelegate', '$injector', '$timeout', function (baseUrl, $scope, $state, $stateParams, $ionicSlideBoxDelegate, $injector, $timeout) {
    /////////////////// INJECTED SERVICES ///////////////////////
    var test = $injector.get('testService');
    /////////////////////////////////////////
    $scope.userInfo = {
        "county": {
            "type": "text"
            , "size": 50
            , "value": null
            , "required": true
            , "label": "County"
            , "validate_exp": ""
        }
        , "phone": {
            "type": "tel"
            , "size": 10
            , "value": null
            , "required": true
            , "label": "Phone"
            , "validate_exp": ""
        }
        , "email": {
            "type": "email"
            , "size": 75
            , "value": null
            , "required": true
            , "label": "Email"
            , "validate_exp": ""
        }
        , "maritalstatus": {
            "type": "select"
            , "label": "Marital Status"
            , "options": [
                            "single"
                            , "married"]
            , "selected": "single"
        }
    };
    $scope.submitUserInfo = function () {
        test.submitUserInfo($scope.userInfo);
        $state.go('drivers');
    };
}]);