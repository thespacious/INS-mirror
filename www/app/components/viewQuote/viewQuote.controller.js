controllers.controller('viewQuoteCtrl', ['BASE_SERVER', 'SKIP_API', '$scope', '$state', '$ionicSlideBoxDelegate', '$injector', '$stateParams', function (baseUrl, skipAPi, $scope, $state, $ionicSlideBoxDelegate, $injector, $stateParams) {
    var params = $state.params;
    var session = JSON.parse(sessionStorage.getItem('session'));
    var drivers = session.drivers;
    var cars = session.cars;
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
        , drivers: drivers
        , vehicles: cars
    };
    if (params.first == false) {
        //TODO: remove this bit. this code for demo purposes only
        if (skipAPi) {
            quoteJson.quoteJson.overview.policypremium = "$600.00";
            $scope.nextState = "legal";
        }
        else {
            $scope.nextState = 'legal';
        }
    }
    else {
        $scope.nextState = 'pre-payment';
    }
}]);