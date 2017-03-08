controllers.controller('newDriverPrimaryCtrl', ['BASE_SERVER', '$scope', '$state', '$stateParams', '$ionicSlideBoxDelegate', '$injector', '$timeout', function (baseUrl, $scope, $state, $stateParams, $ionicSlideBoxDelegate, $injector, $timeout) {
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
    $scope.garagingInfo = {
        "gstreet": {
            "type": "text"
            , "size": 200
            , "value": null
            , "required": true
            , "label": "Street"
            , "validate_exp": ""
        }
        , "gcity": {
            "type": "text"
            , "size": 50
            , "value": null
            , "required": true
            , "label": "City"
            , "validate_exp": "[a-zA-Z]"
        }
        , "gstate": {
            "type": "text"
            , "size": 2
            , "value": null
            , "required": true
            , "label": "State"
            , "validate_exp": "[a-zA-Z]"
        }
        , "gzip": {
            "type": "tel"
            , "size": 5
            , "value": null
            , "required": true
            , "label": "Zip"
            , "validate_exp": "[0-9]"
        }
    };
    //////////////////////////////////////////////////////////////
    //
    ///////////////////// UI FUNCTIONS FOR GARAGING //////////////
    $scope.checked = {
        "yes": true
        , "no": false
    };
    $scope.showGaraging = false;
    $scope.showGaragingOne = function () {
        if ($scope.checked.yes) {
            return;
        }
        else {
            $test.setGaraging();
            $scope.checked.yes = true;
            $scope.checked.no = false;
            $scope.showGaraging = false;
        }
    };
    $scope.showGaragingTwo = function () {
        if ($scope.checked.no) {
            return;
        }
        else {
            test.unsetGaraging();
            $scope.checked.no = true;
            $scope.checked.yes = false;
            $scope.showGaraging = true;
        }
    };
    ////////////////////////////////////////////////////////////////
    //
    //////////////////// SUBMIT FORMS //////////////////////////////
    $scope.submitPrimary = function () {
        test.primaryDriverSubmit($scope.driver, $scope.garagingInfo);
    };
}]);