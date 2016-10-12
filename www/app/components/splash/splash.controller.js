controllers.controller('splashCtrl', ['BASE_SERVER', '$scope', '$state', '$ionicSlideBoxDelegate', '$injector', function (baseUrl, $scope, $state, $ionicSlideBoxDelegate, $injector) {
    // Called to navigate to the main app
    //    $scope.startApp = function () {
    //        $state.go('main');
    //    };
    var services = $injector.get('splashServices');
    $scope.next = function () {
        $ionicSlideBoxDelegate.next();
    };
    $scope.previous = function () {
        $ionicSlideBoxDelegate.previous();
    };
    // Called each time the slide changes
    $scope.slideChanged = function (index) {
        $scope.slideIndex = index;
    };
    $scope.login = function () {
        services.login(document.getElementById('username').value, document.getElementById('password').value);
    };
}]);