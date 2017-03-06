controllers.controller('homeCtrl', ['BASE_SERVER', '$scope', '$state', '$ionicSlideBoxDelegate', '$injector', '$stateParams', function (baseUrl, $scope, $state, $ionicSlideBoxDelegate, $injector, $stateParams) {
    $scope.home = function () {
        $state.go("legal");
    };
    $scope.test = true;
    $scope.quote = {
        overview: {
            "policy term": ["01-12-2017", "07-12-2017"]
            , "policy premium": "$500.00"
            , "producer": {
                "name": "CloudCoverage"
                , "number": "12eweq1"
                , "phone": "3344432223"
                , "state": "AL"
            }
        }
        , coverages: {
            "BI": "$25,000.00"
            , "PD": "$25,000.00"
            , "UML": "Accepted"
            , "UMP": "Accepted"
            , "MP": "$500.00"
            , "compdeduct": "$200.00"
            , "colldeduct": "$250.00"
            , "towing": "Accepted"
            , "RR": "Accepted"
        }
        , drivers: [{
            name: "Driver 1"
            , address: "223 Oak Place Dr."
            , type: "Primary"
            , license: "02983843"
            , "dob": "02-10-1993"
        }]
        , vehicles: [
            {
                year: "2006"
                , make: "Toyota"
                , model: "Corolla"
                , driver: "Driver 1"
                , vin: "8u9e032ue89032"
            }]
    };
    mwbScanner.setKey("kwILwP2bCHIfNLMOJadaGwR3V0sRh+kPA6LgV1jyXYY=").then(function (response) {
        if (response) console.log('VALID KEY');
        else console.log('INVALID KEY');
    });
    $scope.capturePhoto = function () {
        //        scanner.startScanning(MWBSInitSpace.init, InsureScan.onLicensePhoto);
        mwbScanner.startScanning(function (result) {
            console.log(result);
            var code;
            if (result.type == "Code 39") {
                code = result.code.substr(1);
            }
            else {
                code = result.code;
            }
            return code;
        });
    };
    //
    }]);