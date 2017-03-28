controllers.controller('newCarCtrl', ['BASE_SERVER', 'SKIP_API', '$scope', '$state', '$ionicSlideBoxDelegate', '$injector', '$stateParams', function (baseUrl, skipApi, $scope, $state, $ionicSlideBoxDelegate, $injector, $stateParams) {
    var test = $injector.get('newCarService');
    var insurescanJson = $injector.get('insurescanJson');
    $scope.owner = $stateParams.fullname;
    $scope.car = {
        "vin": {
            "type": "text"
            , "size": 200
            , "value": null
            , "required": true
            , "label": "Vin no."
            , "validate_exp": ""
        }
        , "year": {
            "type": "tel"
            , "size": 4
            , "value": null
            , "required": true
            , "label": "Year"
            , "validate_exp": "[0-9]+"
        }
        , "make": {
            "type": "text"
            , "size": 200
            , "value": null
            , "required": true
            , "label": "Make"
            , "validate_exp": ""
        }
        , "model": {
            "type": "text"
            , "size": 200
            , "value": null
            , "required": true
            , "label": "Model"
            , "validate_exp": ""
        }
    };
    $scope.getVinManual = function () {
        var doc = test.getVin($scope.car.vin.value);
        console.log("vin populate doc: ", doc);
        for (var i = 0; i < 30; i++) {
            console.log(doc.Results[i].Variable);
            if (doc.Results[i].Variable == "Make") {
                $scope.car.make.value = doc.Results[i].Value;
            }
            else if (doc.Results[i].Variable == "Model") {
                $scope.car.model.value = doc.Results[i].Value;
            }
            else if (doc.Results[i].Variable == "Model Year") {
                $scope.car.year.value = doc.Results[i].Value
            }
        }
        //        $scope.car.year.value = doc.year;
        //        $scope.car.make.value = doc.make;
        //        $scope.car.model.value = doc.model;
    };
    //
    $scope.checkHidden = function () {
        return true;
    };
    //
    $scope.uploadCarPicture = function () {
        return test.selectPhotoCar();
        //        return test.uploadImage2();
    };
    //
    $scope.takeCarPicture = function () {
        return test.takePhotoCar();
        //        test.selectPhotoCar();
    };
    //
    $scope.capturePhoto = function () {
        var vin = test.capturePhotoVin();
        vin.then(function (response) {
            var data = test.getVin(vin);
            data.then(function (response) {
                console.log("vin response, ", response);
                $scope.car.make.value = response.make;
                $scope.car.model.value = response.model;
                $scope.car.year.value = response.year;
                $scope.car.vin.value = response.vin;
            });
        });
        //        return test.testScan();
    };
    //
    $scope.getPhoto = function () {
        return test.selectPhotoVIN();
    };
    //
    //
    //
    $scope.uploadpicture = function () {
        test.uploadPhoto();
    };
    //
    $scope.submitForms = function () {
        //        test.submitForms();
        //        test.sendEmails();
        test.submitForms($scope.owner, $scope.car);
        $state.go('coverages');
    };
}]);