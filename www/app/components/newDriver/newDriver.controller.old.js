controllers.controller('newDriverCtrl', ['APP_DEBUG', 'BASE_SERVER', '$scope', '$state', '$stateParams', '$ionicSlideBoxDelegate', '$injector', '$timeout', function (app_debug, baseUrl, $scope, $state, $stateParams, $ionicSlideBoxDelegate, $injector, $timeout) {
    //Why bother? Well look at the alternative. . .
    //
    /////////////////// INJECTED SERVICES ///////////////////////
    var test = $injector.get('testService');
    var insurescanJson = $injector.get('insurescanJson');
    //////////////////////////////////////////////////////////////
    //
    /////////////////// Models to Bind form data to //////////////
    $scope.driver = {
        "fullname": {
            "type": "text"
            , "size": 200
            , "value": ""
            , "required": true
            , "label": "Full Name"
            , "validate_exp": "[a-zA-Z]+"
        }
        , "license": {
            "type": "number"
            , "size": 20
            , "value": null
            , "required": true
            , "label": "License No."
            , "validate_exp": ""
        }
        , "licensedate": {
            "type": "date"
            , "size": 20
                //                            , "value": today
                
            , "value": ""
            , "required": true
            , "label": "License Issue Date"
            , "validate_exp": ""
        }
        , "dob": {
            "type": "date"
            , "size": 12
                //                            , "value": today
                
            , "value": ""
            , "required": true
            , "label": "Date of Birth"
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
        , "street": {
            "type": "text"
            , "size": 200
            , "value": null
            , "required": true
            , "label": "Street"
            , "validate_exp": ""
        }
        , "city": {
            "type": "text"
            , "size": 50
            , "value": null
            , "required": true
            , "label": "City"
            , "validate_exp": "[a-zA-Z]"
        }
        , "state": {
            "type": "text"
            , "size": 2
            , "value": null
            , "required": true
            , "label": "State"
            , "validate_exp": "[a-zA-Z]"
        }
        , "zip": {
            "type": "tel"
            , "size": 5
            , "value": null
            , "required": true
            , "label": "Zip"
            , "validate_exp": "[0-9]"
        }
        , "sex": {
            "type": "select"
            , "label": "Gender"
            , "options": [
                "Male"
                , "Female"
            ]
            , selected: "Male"
        }
    };
    $scope.submitSecondary = function () {
        test.submitSecondaryDriver($scope.driver);
    };
}]);