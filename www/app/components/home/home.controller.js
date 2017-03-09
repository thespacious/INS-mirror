controllers.controller('homeCtrl', ['BASE_SERVER', '$scope', '$state', '$ionicSlideBoxDelegate', '$injector', '$stateParams', function (baseUrl, $scope, $state, $ionicSlideBoxDelegate, $injector, $stateParams) {
    $scope.home = function () {
        $state.go("legal");
    };
    $scope.test = true;
    $scope.quote = {
        overview: {
            "policyterm": ["01/12/2017", "07/12/2017"]
            , "policypremium": "$500.00"
            , "producer": {
                "name": "CloudCoverage"
                , "number": "12eweq1"
                , "phone": "3344432223"
                , "state": "AL"
            }
        }
        , coverages: {
            "BI": {
                "person": "$25,000.00"
                , "accident": "$50,000.00"
            }
            , "PD": "$25,000.00"
            , "UMP": "$500.00"
            , "MP": "$500.00"
            , "compdeduct": "$200.00"
            , "collprem": "$250.00"
            , "compprem": "$250.00"
            , "towing": "$50.00"
            , "rental": "$25.00"
        }
        , drivers: [{
            name: "Driver 1"
            , address: "223 Oak Place Dr."
            , type: "Primary"
            , license: "02983843"
            , "dob": "02-10-1993"
        }]
        , vehicles: [{
            year: "2006"
            , make: "Toyota"
            , model: "Corolla"
            , driver: "Driver 1"
            , vin: "8u9e032ue89032"
        }, {
            year: "2008"
            , make: "Ford"
            , model: "Mustang"
            , driver: "Driver 2"
            , vin: "32894732dsd"
        }]
    };
    $scope.legal = function () {
        $state.go('legal');
    };
}]);