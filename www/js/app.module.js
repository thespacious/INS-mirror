var app = angular.module('app', ['ionic', 'ionic-datepicker', 'main.services', 'main.controllers']).run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
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
            url: '/'
            , templateUrl: 'app/components/splash/splash.html'
            , controller: 'splashCtrl'
        }).state('home', {
            url: '/home'
            , templateUrl: 'app/components/home/drivers.html'
            , controller: 'homeDriversCtrl'
        })
        // Each tab has its own nav history stack:
        .state('newDriver', {
            url: '/newDriver'
            , templateUrl: 'app/components/newDriver/newDriver.html'
            , controller: "newDriverCtrl"
        }).state('newDriver.primary', {
            url: '/edit'
                //            , templateUrl: 'app/components/newDriver/newDriver.edit.html'
                
            , controller: "newDriverEditCtrl"
        }).state('newCar', {
            url: '/newCar/:fullname'
            , templateUrl: 'app/components/newCar/newCar.html'
            , controller: "newCarCtrl"
        }).state('quoteInfo', {
            url: '/quoteInfo'
            , templateUrl: 'app/components/quoteInfo/quoteInfo.html'
            , controller: "quoteInfoCtrl"
        }).state('quoteInfo.datePicker', {
            url: '/datePicker'
            , templateUrl: 'app/components/quoteInfo/quoteInfo.datePicker.html'
            , controller: "quoteInfoCtrl"
        }).state('quoteInfo.viewQuote', {
            url: '/viewQuote'
            , templateUrl: 'app/components/quoteInfo/quoteInfo.viewQuote.html'
            , controller: "quoteViewCtrl"
        }).state('afterQuote', {
            url: '/afterQuote'
            , templateUrl: 'app/components/afterQuote/signature.html'
            , controller: "afterQuoteController"
        });
    var datePickerObj = {
        inputDate: new Date()
        , titleLabel: 'Select a Date'
        , setLabel: 'Set'
        , todayLabel: 'Today'
        , closeLabel: 'Close'
        , mondayFirst: false
        , weeksList: ["S", "M", "T", "W", "T", "F", "S"]
        , monthsList: ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"]
        , templateType: 'popup'
        , from: new Date(2012, 8, 1)
        , to: new Date(2018, 8, 1)
        , showTodayButton: true
        , dateFormat: 'dd MMMM yyyy'
        , closeOnSelect: false
        , disableWeekdays: []
    };
    ionicDatePickerProvider.configDatePicker(datePickerObj);
    //    $stateProvider.state('newDriver', {
    //            url: '/newDriver'
    //            , abstract: true
    //            , templateUrl: ''
    //            , controller: 'newDriverCtrl'
    //        })
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/');
});