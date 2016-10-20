controllers.controller('splashCtrl', ['BASE_SERVER', '$scope', '$state', '$ionicSlideBoxDelegate', '$injector', '$q', function (baseUrl, $scope, $state, $ionicSlideBoxDelegate, $injector, $q) {
    // Called to navigate to the main app
    //    $scope.startApp = function () {
    //        $state.go('main');
    //    };
    $scope.footerText = 'next';
    var services = $injector.get('splashServices');
    var json = $injector.get('insurescanJson');
    //    json.getPageBlockItems(json.json, 'drivers', 'dsafd', 'fdsfds');
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
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;
        //        if (services.login(document.getElementById('username').value, document.getElementById('password').value) == true) {
        //            $state.go('home');
        //        }
        //        else {
        //            console.log("login error");
        //            alert('login error');
        //        }
        //        var asyncHelper = function () {
        //            $q(function (resolve, reject) {
        //                setTimeout(function () {
        //                    if (services.login(username, password)) {
        //                        resolve(true);
        //                    }
        //                    else {
        //                        reject(false);
        //                    }
        //                }, 1000);
        //                return
        //            }).then(function (data) {
        //                console.log('login success', data);
        //            }, function (data) {
        //                console.log('login failure', data);
        //            });
        //        };
        //        asyncHelper();
        services.login(username, password);
        $state.go('home');
    };
    $scope.submitForms = function () {
        $scope.next();
    };
            }]);