controllers.controller('newDriverEditCtrl', ['BASE_SERVER', '$scope', '$state', '$stateParams', '$ionicSlideBoxDelegate', '$injector', '$timeout', function (baseUrl, $scope, $state, $stateParams, $ionicSlideBoxDelegate, $injector, $timeout) {
    var driver = {
        "fullname": {
            "type": "text"
            , "size": 200
            , "value": null
            , "required": true
            , "label": "Full Name"
            , "validate_exp": "[a-zA-Z]"
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
            "type": "text"
            , "size": 20
                //                            , "value": today
                
            , "value": ""
            , "required": true
            , "label": "License Issue Date"
            , "validate_exp": ""
        }
        , "dob": {
            "type": "text"
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
                            , "Female"]
        }
    };
}]);