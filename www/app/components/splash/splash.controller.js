controllers.controller('splashCtrl', ['APP_DEBUG', 'BASE_SERVER', 'SKIP_API', '$scope', '$state', '$ionicSlideBoxDelegate', '$injector', '$q', function (app_debug, baseUrl, skipApi, $scope, $state, $ionicSlideBoxDelegate, $injector, $q) {
    //
    var TAG = "Splash/Login Controller: ";
    //===========
    //SERVICES
    //===========
    //
    var services = $injector.get('splashServices');
    var json = $injector.get('insurescanJson');
    //
    //========
    //UI
    //========
    //
    //
    $scope.footerText = 'next';
    //
    //=============
    //CALL SERVICES
    //=============
    //
    $scope.login = function () {
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;
        if (skipApi) {
            $state.go('home');
        }
        //            $state.go('home');
        else if (services.login(username, password) == true) {
            $state.go('home');
        }
        else {
            alert("login error");
        }
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