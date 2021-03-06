controllers.controller('splashCtrl', ['BASE_SERVER', '$scope', '$state', '$ionicSlideBoxDelegate', '$injector', '$q', function (baseUrl, $scope, $state, $ionicSlideBoxDelegate, $injector, $q) {
    //
    //get necessary services
    //
    var services = $injector.get('splashServices');
    var json = $injector.get('insurescanJson');
    //
    //set up ui options
    //
    //slides
    //
    $scope.$on("$ionicSlides.sliderInitialized", function (event, data) {
        $scope.slider = data.slider;
    });
    $scope.$on("$ionicSlides.slideChangeStart", function (event, data) {
        console.log('Slide change is beginning');
        $scope.next();
    });
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
    //other ui shit
    //
    $scope.footerText = 'next';
    //
    //call services
    //
    $scope.login = function () {
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;
        if (services.login(username, password) == true) {
            $state.go('home');
        }
        else {
            alert("login error");
        }
    };
    $scope.submitForms = function () {
        $state.go("login");
    };
    //    TODO: figure when to lock the screen and how to do it withoput compromising ui performance
    //    $scope.changeOriantationPortrait();
    //    screen.lockOrientation('portrait');
    //    document.addEventListener("deviceready", onDeviceReady, false);
    //
    //    function onDeviceReady() {
    //        $scope.changeOriantationLandspace = function () {
    //            screen.lockOrientation('landscape');
    //        }
    //        $scope.changeOriantationPortrait = function () {
    //            screen.lockOrientation('portrait');
    //        }
    //        $scope.changeOriantationPort rait();
    //    }
    //    screen.lockOrientation('portrait');
}]);