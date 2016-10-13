controllers.controller('homeDriversCtrl', ['BASE_SERVER', '$scope', '$state', '$ionicSlideBoxDelegate', '$injector', '$stateParams', function (baseUrl, $scope, $state, $ionicSlideBoxDelegate, $injector, $stateParams) {
    var driversService = $injector.get('driversService');
    //    var insurescanJson = $injector.get('insurescanJson');
    //
    var insurescanJson = $injector.get('insurescanJson');
    //
    //
    $scope.drivers = driversService.drivers();
    //
    //
    $scope.driverId = $scope.drivers.length;
    //
    $scope.primaryDriver = function (driverId) {
        return driversService.primaryDriver(driverId);
    };
    //
    $scope.cars = driversService.cars(driversService.session);
    //
    //
    //    var testarr = [];
    //    var test = function (cars) {
    //        for (car in cars) {
    //            testarr.push(car.id);
    //        }
    //        console.log(testarr);
    //    };
    $scope.data = {
        showDelete: false
    };
    //
    //
    //    $scope.carIds = test('cars');
    $scope.hiddenCar = {}
    $scope.removeCar = function (carId) {
        alert(carId);
    };
    //    $scope.goToNewDriver = function () {
    //        
    //    };
    $scope.sendQuote = function () {
        driversService.sendQuote(insurescanJson.insurescanJson);
    }
    driversService.getQuoteId();
}]);