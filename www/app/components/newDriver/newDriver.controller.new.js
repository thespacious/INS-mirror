controllers.controller('newDriverCtrl', ['BASE_SERVER', '$scope', '$state', '$stateParams', '$ionicSlideBoxDelegate', '$injector', '$timeout', function (baseUrl, $scope, $state, $stateParams, $ionicSlideBoxDelegate, $injector, $timeout) {
    //load all your services
    //
    var session = JSON.parse(sessionStorage.getItem("session"));
    var service = $injector.get('newDriverService');
    //
    //create new driver
    $scope.driver = service.pageModel;
    //
    //assign new driver an id
    $scope.driver = service.newID($scope.driver);
    //
    //sumbit newDriver to session storage
    $scope.submitForms = function () {
        service.saveDriver($scope.driver);
        state.go("drivers");
    };
    //won't need to to do page display config because we will have separate states for edit functionality, and for if this is the primary driver
    //retrieve list of drivers if present (which it will be because you add your primary driver first, within as separate state)
    //generate id for driver based on number of drivers added
    //add scanning button service functions to scope variables
    //find a way to not need to do this when structuring your html
    //     $scope.checkType = function (type) {
    //        if (type != "select") {
    //            return true;
    //        }
    //        else {
    //            return false;
    //        }
    //    };
}]);