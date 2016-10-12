var controllers = angular.module('main.controllers', []).controller('indexCtrl', ['BASE_SERVER', function ($scope, $state) {
    //    sessionStorage.setItem('session', JSON.stringify({}));
    $scope.goToNewDriver = function () {
        $state.go('newDriver');
    };
    $scope.goToSplash = function () {
        $state.go('splash');
    };
    $scope.goToHomeDrivers = function () {
        $state.go('home');
    };
    $scope.goToNewCar = function () {
        $state.go('newCar');
    };
    $scope.goToDatePicker = function () {
        $state.go('quoteInfo.datePicker')
    };
}]);