controllers.controller('newDriverPrimaryCtrl', ['BASE_SERVER', '$scope', '$state', '$stateParams', '$ionicSlideBoxDelegate', '$injector', '$timeout', function (baseUrl, $scope, $state, $stateParams, $ionicSlideBoxDelegate, $injector, $timeout) {
    /////////////////// INJECTED SERVICES ///////////////////////
    //    var test = $injector.get('testService');
    var service = $injector.get('newDriverService');
    //    var mwbSetup = $injector.get('mwbSetup');
    var insurescanJson = $injector.get('insurescanJson');
    //////////////////////// Include Manatee //////////////////////
    //runs setkey only if it has not been run before
    //    mwbSetup.manateeSetup();
    ////////////////////// CHECK FOR EXISTING PRIMARY ////////////
    var checkPrimary = function () {
        var session = JSON.parse(sessionStorage.getItem('session'));
        if (session.drivers && session.drivers.length > 0) {
            alert("there can be only one Primay Insured, please delete the primary from the home page to add another");
            $state.go('drivers');
        }
    };
    //
    ////// Then run it //////
    checkPrimary();
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
            , "validate_exp": "[0-9]+"
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
            , "validate_exp": "[a-zA-Z]+"
        }
        , "gstate": {
            "type": "text"
            , "size": 2
            , "value": null
            , "required": true
            , "label": "State"
            , "validate_exp": "[a-zA-Z]+"
        }
        , "gzip": {
            "type": "tel"
            , "size": 5
            , "value": null
            , "required": true
            , "label": "Zip"
            , "validate_exp": ""
        }
    };
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
    /////////////////////////////////////////////////////////////
    ////////////////////// UI FUNCTIONS /////////////////////////
    $scope.footerText = 'next';
    /////////////////////// Populate Scanned Data ///////////////
    $scope.capturePhoto = function () {
        service.capturePhoto().then(function (result) {
            console.log("scan results: ", result);
            $scope.driver.fullname.value = result.fullname;
            $scope.driver.license.value = parseInt(result.license);
            $scope.driver.licensedate.value = new Date(result.licensedate);
            $scope.driver.dob.value = new Date(result.dob);
            $scope.driver.city.value = result.city;
            $scope.driver.state.value = result.state;
            $scope.driver.street.value = result.street;
            $scope.driver.sex.selected = result.sex;
            $scope.driver.zip.value = parseInt(result.zip);
        }, function (err) {
            console.log("Scan failed: ", err);
        });
    };
    //
    /////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////
    //
    ///////////////////// UI FUNCTIONS FOR GARAGING //////////////
    $scope.checked = {
        "yes": true
        , "no": false
    };
    $scope.showGaraging = false;
    $scope.showGaragingOne = function () {
        var garaging = {};
        if ($scope.checked.yes) {
            return;
        }
        else {
            garaging = service.setGaraging($scope.garagingInfo, $scope.driver);
            $scope.garagingInfo = garaging;
            $scope.checked.yes = true;
            $scope.checked.no = false;
            $scope.showGaraging = false;
        }
    };
    $scope.showGaragingTwo = function () {
        var garaging = {};
        if ($scope.checked.no) {
            return;
        }
        else {
            garaging = service.unSetGaraging($scope.garagingInfo);
            $scope.garagingInfo = garaging;
            $scope.checked.no = true;
            $scope.checked.yes = false;
            $scope.showGaraging = true;
        }
    };
    ////////////////////////////////////////////////////////////////
    //
    //////////////////// SUBMIT FORMS //////////////////////////////
    $scope.submitPrimary = function () {
        service.primaryDriverSubmit($scope.driver, $scope.garagingInfo);
        $state.go('userInfo');
        $scope.footerText = "submit";
    };
    $scope.submitUserInfo = function () {
        service.submitUserInfo($scope.userInfo);
        $state.go('userInfo', {
            zip: $scope.driver.zip.value
        });
    };
}]);