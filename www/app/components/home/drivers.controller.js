controllers.controller('homeDriversCtrl', ['BASE_SERVER', 'SKIP_API', '$scope', '$state', '$ionicSlideBoxDelegate', '$injector', '$stateParams', function (baseUrl, skipApi, $scope, $state, $ionicSlideBoxDelegate, $injector, $stateParams) {
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
    $scope.drivers = driversService.drivers();
    //
    $scope.driverId = $scope.drivers.length;
    //
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
    //STORES DRIVER AND CARS IN SESSION STORAGE AND MODIFIES INSURESCAN JSON
    $scope.submitForms = function () {
        try {
            driversService.storeDrivers($scope.drivers);
            driversService.storeNamedInsured();
            $state.go('discounts');
        }
        catch (err) {
            console.log('driver storage error: \n', err);
        }
    };
    //
    //    driversService.getQuoteId();
    $scope.addDriver = function () {
        var session = driversService.session();
        if (session['drivers'] && session['drivers'].length > 0) {
            console.log(session.drivers.length);
            $state.go('newDriver');
        }
        else {
            $state.go('newPrimaryDriver');
            //            $state.go('newPrimaryDriver');
        }
    };
    //    $scope.driversLength
    $scope.getDriversLength = function () {
        if ($scope.drivers.length > 0) {
            return false;
        }
        else {
            return true;
        }
    };
    $scope.removeDriver = function (id) {
        var session = JSON.parse(sessionStorage.getItem("session"));
        session.drivers.splice(id, 1);
        $scope.drivers = session.drivers;
        sessionStorage.setItem('session', JSON.stringify(session));
    };
}]);