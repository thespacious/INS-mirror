controllers.controller('newDriverCtrl', ['APP_DEBUG', 'BASE_SERVER', '$scope', '$state', '$stateParams', '$ionicSlideBoxDelegate', '$injector', '$timeout', function (app_debug, baseUrl, $scope, $state, $stateParams, $ionicSlideBoxDelegate, $injector, $timeout) {
    //Why bother? Well look at the alternative. . .
    //
    if ($state.params.category != 'regular') {
        $scope.category = $state.params.category;
    }
    else {
        $scope.category = 'regular';
    }
    /////////////////// INJECTED SERVICES ///////////////////////
    var test = $injector.get('newDriverService');
    var insurescanJson = $injector.get('insurescanJson');
    //    var mwbSetup = $injector.get('mwbSetup');
    /////////////////////// SETUP MANATEE if not already setup ////
    //    mwbSetup.manateeSetup();
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
            , "validate_exp": ""
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
            , "size": 90
                //                            , "value": today
                
            , "value": ""
            , "required": true
            , "label": "License Issue Date"
            , "validate_exp": ""
        }
        , "dob": {
            "type": "date"
            , "size": 90
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
            , "validate_exp": ""
        }
        , "state": {
            "type": "text"
            , "size": 2
            , "value": null
            , "required": true
            , "label": "State"
            , "validate_exp": ""
        }
        , "zip": {
            "type": "tel"
            , "size": 5
            , "value": null
            , "required": true
            , "label": "Zip"
            , "validate_exp": ""
        }
        , "sex": {
            "type": "select"
            , "label": "Gender"
            , "options": [
                "Male"
                , "Female"
            ]
            , "selected": "Male"
        }
        , category: {
            "type": "select"
            , "label": "Category"
            , "options": [
            'regular', 'excluded', 'named insured'
        ]
            , "selected": "regular"
        }
    };
    $scope.submitSecondary = function () {
        test.secondaryDriverSubmit($scope.driver, $scope.category);
        $state.go('drivers');
    };
    $scope.submitNamed = function () {
        test.named($scope.driver, $scope.category);
        $state.go('userInfo', {
            name: $scope.driver.fullname.value
            , zip: $scope.driver.zip.value
        });
    };
}]);