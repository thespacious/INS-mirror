controllers.controller('homeDriversCtrl', ['BASE_SERVER', 'SKIP_API', '$scope', '$state', '$ionicSlideBoxDelegate', '$injector', '$stateParams', '$ionicPopup', function (baseUrl, skipApi, $scope, $state, $ionicSlideBoxDelegate, $injector, $stateParams, $ionicPopup) {
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
    $scope.cars = driversService.cars();
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
        $scope.cars = driversSevice.removeCar(carId);
    };
    //
    $scope.showPopup = function () {
        $scope.data = {};
        // An elaborate, custom popup
        $scope.myPopup = $ionicPopup.show({
            templateUrl: 'app/components/home/popup.html'
            , title: 'Choose a driver type'
            , subTitle: 'other explaination'
            , scope: $scope
            , buttons: [
                {
                    text: '<b>Save</b>'
                    , type: 'button-positive'
                    , onTap: function (e) {
                        return true;
                    }
                }
            ]
        });
        $scope.myPopup.then(function (res) {
            console.log('Tapped!', res);
        });
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
    //DEBUG: all named insured are have a separate json, different from primary and regular instead of a if-first logic we need to ask the user if they want the driver added to be named insured, and inform them the first driver they add should be primary
    //TODO: create a dialog explaining the relationship between primary, named insured, regular and excluded
    //TODO: add excluded option in regular driver info entry that adds category as excluded
    //on new driver clicked
    //TODO: add function to driverService that queries for named insured, look to and if a user chooses named insured and the count is 2 (or greater) throw an error
    $scope.named = function (category) {
        $scope.myPopup.close();
        if (category == 'primary') {
            $state.go('newPrimaryDriver', {
                category: category
            });
        }
        else {
            $state.go('newDriver', {
                category: category
            })
        }
    };
    $scope.regular = function (category) {
        //        myPopup.close();
        $state.go('newDriver', {
            category: category
        });
    };
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