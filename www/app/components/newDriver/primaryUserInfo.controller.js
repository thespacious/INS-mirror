controllers.controller('primaryInfoCtrl', ['BASE_SERVER', '$scope', '$state', '$stateParams', '$ionicSlideBoxDelegate', '$injector', '$timeout', function (baseUrl, $scope, $state, $stateParams, $ionicSlideBoxDelegate, $injector, $timeout) {
    /////////////////// STATE PARAMS RETRIEVAL //////////////////
    var zip = $state.params.zip;
    var county = {
        $$state: {
            value: null
        }
    };
    /////////////////// INJECTED SERVICES ///////////////////////
    var newDriverService = $injector.get('newDriverService');
    /////////////////////////////////////////////////////////////
    //////////////////////// Check Zip //////////////////////////
    if (zip && zip != null) {
        var response = newDriverService.jankyShit(zip);
        if (response.$$state) {
            county = response;
        }
        else {
            console.log(response);
        }
    }
    console.log(county.$$state.value);
    ////////////////////////////////////////////////////////////
    $scope.userInfo = {
        "county": {
            "type": "text"
            , "size": 50
            , "value": county.$$state.value
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
        newDriverService.submitUserInfo($scope.userInfo);
        $state.go('drivers');
    };
}]);