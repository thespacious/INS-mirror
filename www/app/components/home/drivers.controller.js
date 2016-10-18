controllers.controller('homeDriversCtrl', ['BASE_SERVER', '$scope', '$state', '$ionicSlideBoxDelegate', '$injector', '$stateParams', function (baseUrl, $scope, $state, $ionicSlideBoxDelegate, $injector, $stateParams) {
    var driversService = $injector.get('driversService');
    //    var insurescanJson = $injector.get('insurescanJson');
    //
    var insurescanJson = $injector.get('insurescanJson');
    //
    //
    //    $scope.drivers = driversService.drivers();
    $scope.drivers = [];
    //
    //
    $scope.driverId = $scope.drivers.length;
    //
    $scope.primaryDriver = function (driverId) {
        return driversService.primaryDriver(driverId);
    };
    //
    //    $scope.cars = driversService.cars(driversService.session);
    $scope.cars = [];
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
        $scope.cars = driversSevice.removeCar();
    };
    //
    //
    driversService.getQuoteId();
}]);