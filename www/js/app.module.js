var app = angular.module('app', ['ionic', 'ionic-datepicker', 'main.services', 'main.controllers', 'ngCordova']).run(function ($ionicPlatform, $state) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);
            scannerConfig().then(function (response) {
                console.log("scannerConfig returns: ", response);
            });
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
    $ionicPlatform.registerBackButtonAction(function () {
        //        if (condition) {
        //            navigator.app.exitApp();
        //        }
        //        else {
        //            
        //        }
        if (location.hash != '#/' && location.hash != '#/home' && location.hash != '#/viewQuote') {
            navigator.app.backHistory();
        }
        else {
            navigator.app.overrideBackbutton();
        }
    }, 100);
    //    monitorEvents(document.body); // logs all events on the body
    //    monitorEvents(document.body, 'mouse'); // logs mouse events on the body
    //    monitorEvents(document.body.querySelectorAll('input')); // logs all events on inputs
    //    document.addEventListener("deviceready", onDeviceReady, false);
    //
    //    function onDeviceReady() {
    //        document.addEventListener("backbutton", function (e) {
    //            if (location.hash == '#/') {
    //                //                e.preventDefault();
    //                //                e.stopImmediatePropagation();
    //                //                e.stopPropagation();
    //                //                navigator.app.exitApp();
    //                //                return true;
    //                //                navigator.app.cancelLoadUrl();
    //            }
    //            else if (location.hash == '#/home') {
    //                e.preventDefault();
    //                e.stopImmediatePropagation();
    //                e.stopPropagation();
    //                navigator.app.cancelLoadUrl();
    //            }
    //            else {
    //                e.preventDefault();
    //                e.stopImmediatePropagation();
    //                e.stopPropagation();
    //                navigator.app.backHistory();
    //            }
    //        }, false);
    //    }
}).config(function ($stateProvider, $urlRouterProvider, ionicDatePickerProvider, $httpProvider) {
    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    //    $httpProvider.defaults.headers.common = {};
    //    $httpProvider.defaults.headers.post = {};
    //    $httpProvider.defaults.headers.put = {};
    //    $httpProvider.defaults.headers.patch = {};
    $stateProvider
    // default view is splash
        .state('splash', {
            url: '/splash'
            , templateUrl: 'app/components/splash/splash.html'
            , controller: 'splashCtrl'
        }).state('login', {
            url: '/'
            , templateUrl: 'app/components/splash/login.html'
            , controller: 'splashCtrl'
        }).state('scanExplain', {
            url: '/scanExplain'
            , templateUrl: 'app/components/home/bullshit.html'
            , controller: 'splashCtrl'
        }).state('home', {
            url: '/home'
            , templateUrl: 'app/components/home/home.html'
            , controller: 'homeCtrl'
        }).state('drivers', {
            url: '/drivers'
            , templateUrl: 'app/components/home/drivers.html'
            , controller: 'homeDriversCtrl'
        })
        // Each tab has its own nav history stack:
        .state('newPrimaryDriver', {
            url: '/newPrimaryDriver'
            , templateUrl: 'app/components/newDriver/newDriver.primary.html'
            , controller: "newDriverPrimaryCtrl"
            , params: {
                driver: null
            }
        }).state('userInfo', {
            url: '/userInfo/:zip'
            , templateUrl: 'app/components/newDriver/primaryUserInfo.html'
            , controller: "primaryInfoCtrl"
                //            , resolve: {
                //                county: function (newDriverService) {
                //                    return newDriverService.
                //                }
                //            }
        }).state('newDriver', {
            url: '/newDriver'
            , templateUrl: 'app/components/newDriver/newDriver.new.html'
            , controller: "newDriverCtrl"
        }).state('newCar', {
            url: '/newCar'
            , params: {
                fullname: null
                , driverId: null
            }
            , templateUrl: 'app/components/newCar/newCar.new.html'
            , controller: "newCarCtrl"
        }).state('coverages', {
            url: '/coverages'
            , templateUrl: 'app/components/coverages/coverages.html'
            , controller: "coveragesCtrl"
        }).state('datepicker', {
            url: '/datepicker'
            , templateUrl: 'app/components/datepicker/datepicker.html'
            , controller: "datepickerCtrl"
        }).state('discounts', {
            url: '/discounts'
            , templateUrl: 'app/components/discounts/discounts.html'
            , controller: "discountsCtrl"
        }).state('quoteInfo', {
            url: '/quoteInfo'
            , templateUrl: 'app/components/quoteInfo/quoteInfo.html'
            , controller: "quoteInfoCtrl"
        }).state('quoteInfo.datePicker', {
            url: '/quoteInfo/datePicker'
            , templateUrl: 'app/components/quoteInfo/quoteInfo.datePicker.html'
            , controller: "quoteInfoCtrl"
        }).state('viewQuote', {
            url: '/viewQuote'
            , templateUrl: 'app/components/viewQuote/viewQuote.html'
            , controller: "viewQuoteCtrl"
            , params: {
                first: null
            }
        }).state('viewQuote.overview', {
            url: '/viewQuote/overview'
            , views: {
                "overview-tab": {
                    templateUrl: "app/components/quoteInfo/quote.overview.html"
                }
            }
        }).state('viewQuote.coverages', {
            url: '/viewQuote/coverages'
            , views: {
                "coverages-tab": {
                    templateUrl: "app/components/quoteInfo/quoteCoverages.html"
                }
            }
        }).state('viewQuote.drivers', {
            url: '/viewQuote/drivers'
            , views: {
                "drivers-tab": {
                    templateUrl: "app/components/quoteInfo/quoteDrivers.html"
                }
            }
        }).state('viewQuote.vehicles', {
            url: '/viewQuote/vehicles'
            , views: {
                "vehicles-tab": {
                    templateUrl: "app/components/quoteInfo/quoteVehicles.html"
                }
            }
        }).state('afterQuote', {
            url: '/afterQuote'
            , templateUrl: 'app/components/afterQuote/signature.html'
            , controller: "afterQuoteController"
        }).state('legal', {
            url: '/legal'
            , templateUrl: 'app/components/quoteInfo/legal.html'
            , controller: "homeCtrl"
        }).state('pre-payment', {
            url: '/pre-payment'
            , templateUrl: 'app/components/afterQuote/pre-payment.html'
            , controller: "paymentCtrl"
        }).state('payment', {
            url: '/payment'
            , templateUrl: 'app/components/afterQuote/mock-payment.html'
            , controller: "paymentCtrl"
        }).state('thankyou', {
            url: '/thankyou'
            , templateUrl: 'app/components/afterQuote/thankyou.html'
            , controller: "homeCtrl"
        });
    //    $stateProvider.state('newDriver', {
    //            url: '/newDriver'
    //            , abstract: true
    //            , templateUrl: ''
    //            , controller: 'newDriverCtrl'
    //        })
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/');
});