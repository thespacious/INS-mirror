controllers.controller('homeDriversCtrl', ['BASE_SERVER', '$scope', '$state', '$ionicSlideBoxDelegate', '$injector', '$stateParams', function (baseUrl, $scope, $state, $ionicSlideBoxDelegate, $injector, $stateParams) {
    var driversService = $injector.get('driversService');
    //    var insurescanJson = $injector.get('insurescanJson');
    //
    $scope.footerText = 'submit';
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
    //    $scope.cars = [];
    //
    $scope.data = {
        showDelete: false
    };
    //
    $scope.checkOwner = function (driverindex, carindex) {
        if ($scope.drivers[driverindex].fullname == $scope.cars[carindex].owner) {
            return true;
        }
        else {
            return false;
        }
    };
    //
    //    document.addEventListener("deviceready", onDeviceReady, false);
    //
    //    function onDeviceReady() {
    //        $scope.changeOriantationLandspace = function () {
    //            screen.lockOrientation('landscape');
    //        }
    //        $scope.changeOriantationPortrait = function () {
    //            screen.lockOrientation('portrait');
    //        }
    //        $scope.changeOriantationPortrait();
    //    }
    screen.lockOrientation('portrait');
    //
    //    $scope.carIds = test('cars');
    $scope.hiddenCar = {};
    $scope.removeCar = function (carId) {
        $scope.cars = driversSevice.removeCar();
    };
    //
    $scope.submitForms = function () {
        try {
            driversService.storeDrivers($scope.drivers);
            driversService.storeNamedInsured();
            $state.go('quoteInfo');
        }
        catch (err) {
            console.log('driver storage error: \n', err);
        }
    };
    //
    driversService.getQuoteId();
}]);