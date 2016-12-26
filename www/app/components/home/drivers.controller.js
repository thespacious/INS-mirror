controllers.controller('homeDriversCtrl', ['BASE_SERVER', '$scope', '$state', '$ionicSlideBoxDelegate', '$injector', '$stateParams', function (baseUrl, $scope, $state, $ionicSlideBoxDelegate, $injector, $stateParams) {
    //
    //====================================
    //GET SERVICES AND SET SCOPE VARIABLES
    //====================================
    //
    var driversService = $injector.get('driversService');
    //    var insurescanJson = $injector.get('insurescanJson');
    //
    //
    var insurescanJson = $injector.get('insurescanJson');
    //
    //GET DRIVER ID CARS AND DRIVERS
    $scope.driverId = $scope.drivers.length;
    //
    $scope.drivers = driversService.drivers();
    //
    $scope.cars = driversService.cars(driversService.session);
    //
    //===========================================================
    //GET PRIMARY DRIVER ID AND PLACE CARS WITH ASSOCIATED DRIVER
    //===========================================================
    //
    $scope.primaryDriver = function (driverId) {
        return driversService.primaryDriver(driverId);
    };
    //
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
    //===========
    //DO UI STUFF
    //===========
    //
    $scope.data = {
        showDelete: false
    };
    //
    $scope.footerText = 'submit';
    //
    //    $scope.carIds = test('cars');
    $scope.hiddenCar = {};
    $scope.removeCar = function (carId) {
        $scope.cars = driversSevice.removeCar();
    };
    //
    //=====================
    //UTILIZE AJAX SERVICES
    //=====================
    //
    //STORES DRIVER AND CARS IN SESSION SETORAGE AND MODIFIES INSURESCAN JSON
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