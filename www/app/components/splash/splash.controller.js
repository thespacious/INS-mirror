controllers.controller('splashCtrl', ['BASE_SERVER', '$scope', '$state', '$ionicSlideBoxDelegate', '$injector', function (baseUrl, $scope, $state, $ionicSlideBoxDelegate, $injector) {
    // Called to navigate to the main app
    //    $scope.startApp = function () {
    //        $state.go('main');
    //    };
    $scope.footerText = 'next';
    var services = $injector.get('splashServices');
    var json = $injector.get('newJson');
    json.getPageBlockItems(json.json, 'drivers', 'dsafd', 'fdsfds');
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
        if (services.login(document.getElementById('username').value, document.getElementById('password').value) == true) {
            $state.go('home');
        }
        else {
            console.log("login error");
            alert('login error');
        }
    };
    $scope.submitForms = function () {
        $scope.next();
    };
}]);