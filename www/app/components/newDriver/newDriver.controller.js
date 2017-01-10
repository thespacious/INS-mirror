controllers.controller('newDriverCtrl', ['APP+_DEBUG', 'BASE_SERVER', '$scope', '$state', '$stateParams', '$ionicSlideBoxDelegate', '$injector', '$timeout', function (app_debug, baseUrl, $scope, $state, $stateParams, $ionicSlideBoxDelegate, $injector, $timeout) {
    //Why bother? Well look at the alternative. . .
    //
    //
    //=============
    //LOAD SERVICES
    //=============
    //
    var _this = this;
    var loadBlock = $injector.get('loadBlock');
    var test = $injector.get('testService');
    var insurescanJson = $injector.get('insurescanJson');
    var session = JSON.parse(sessionStorage.getItem("session"));
    //
    //==============
    //VARIABLES HERE
    //==============
    //
    $scope.showGaraging = false;
    $scope.cardShown = false;
    $scope.date = new Date();
    $scope.driverId = $scope.getDriverId();
    $scope.template = $injector.get('loadJsonTemplate');
    $scope.block = "drivers";
    $scope.today = $scope.newDate();
    //
    //load page elements
    //
    //parse for useful content first, then build pages, so pages goes last.
    //get page names
    $scope.pageNames = loadBlock.getPageNames($scope.template, $scope.block, $scope.driverId);
    //
    //get block names -> push into appropriate pages
    //
    $scope.pageBlocks = loadBlock.getBlockNames($scope.template, $scope.block, $scope.pageNames);
    //
    //
    $scope.pageBlockOptions = loadBlock.getPageBlockOptions($scope.template, $scope.block, $scope.pageNames, $scope.pageBlocks);
    //
    //get block content and push into block names
    //
    //
    $scope.pageBlockItems = loadBlock.newGetPageBlockItems($scope.template, $scope.block, $scope.pageNames, $scope.pageBlocks, $scope.driverId);
    //
    //
    //
    $scope.pageBlockItems = test.addMaritalStatus($scope.driverId, $scope.pageBlockItems);
    //
    //================
    //FUNCTIONS HERE
    //================
    //
    //=================
    //UI OPTIONS
    //=================
    //
    //TODO this is hideously inefficient, runs through array multiple times
    //DIAGNOSE
    $scope.makeVisible = function (page, pageBlock, bool) {
        if (bool == true && document.getElementById('gcheckbox-yes').checked == true) {
            document.getElementById('gcheckbox-no').checked = false;
            $scope.pageBlockOptions = test.makeVisible(pageBlock, $scope.pageBlockOptions, bool);
            test.setGaraging(page);
        }
        else if (bool == false && document.getElementById('gcheckbox-no').checked == true) {
            document.getElementById('gcheckbox-yes').checked = false;
            $scope.pageBlockOptions = test.makeVisible(pageBlock, $scope.pageBlockOptions, bool);
            test.unSetGaraging(page);
        }
    };
    //
    //default slide behaviour
    //
    $scope.next = function () {
        $ionicSlideBoxDelegate.next();
    };
    //
    //
    $scope.previous = function () {
        $ionicSlideBoxDelegate.previous();
    };
    //
    $scope.$on("$ionicSlides.sliderInitialized", function (event, data) {
        // data.slider is the instance of Swiper
        if (data.slider.activeIndex == data.slider.slides.length - 1) {
            $scope.footerText = 'submit';
            $scope.submitForms = function () {
                var primary = $scope.checkPrimary(true);
                test.onDriversLicenseSubmit('license', primary, $scope.driverId);
                if (primary == true) {
                    test.onUserInfoSubmit('driver_info', $scope.driverId);
                }
                $state.go('home');
            };
        }
        else {
            $scope.footerText = 'submit';
            $scope.submitForms = $scope.next();
        }
        $scope.slider = data.slider;
    });
    $scope.$on("$ionicSlides.slideChangeStart", function (event, data) {
        console.log('Slide change is beginning');
    });
    $scope.$on("$ionicSlides.slideChangeEnd", function (event, data) {
        // note: the indexes are 0-based
        $scope.activeIndex = data.activeIndex;
        $scope.previousIndex = data.previousIndex;
        if (data.slider.activeIndex == data.slider.slides.length - 1) {
            $scope.footerText = 'submit';
            $scope.submitForms = function () {
                var primary = $scope.checkPrimary(true);
                test.onDriversLicenseSubmit('license', primary, $scope.driverId);
                if (primary == true) {
                    test.onUserInfoSubmit('driver_info', $scope.driverId);
                }
                $state.go('home');
            };
        }
        else {
            $scope.footerText = 'submit';
            $scope.submitForms = $scope.next();
        }
    });
    //
    //TODO: figure out which ones of these I actually use.
    //
    //probably used
    $scope.switchGaraging = function () {
        console.log("switch garaging called: ");
        if ($scope.showGaraging == false) {
            $scope.showGaraging = true;
            test.setGaraging();
        }
        else {
            $scope.showGaraging = false;
            test.unSetGaraging();
        }
    };
    //
    //
    $scope.showCard = function () {
        console.log("show card called");
        if ($scope.cardShown == true) {
            $scope.cardShown = false;
        }
        else {
            $scope.cardShown = true;
        }
    };
    //
    //used
    $scope.checkType = function (type) {
        if (type != "select") {
            return true;
        }
        else {
            return false;
        }
    };
    //
    //used
    $scope.getDriverId = function () {
        if (test.seePrimary() == true) {
            return 0;
        }
        else {
            try {
                return Object.keys(session.drivers).length + 1;
            }
            catch (err) {
                console.log('error with session.drivers\n', err);
                return;
            }
        }
    };
    //
    //
    $scope.checkHidden = function (pageBlock) {
        return test.checkHidden($scope.pageBlockOptions[pageBlock]);
    };
    //    
    $scope.checkPrimary = function (bool) {
        if (bool == true && $scope.driverId == "0") {
            return true;
        }
        else {
            return false;
        }
    };
    //
    //
    //add peripheral functions
    //
    $scope.checkEdit = $timeout(function () {
        return test.checkEdit($state.current.name, $scope.driverId);
    }, 0);
    //
    //
    $scope.checkEdit = function () {
        return test.checkEdit($state.current.name, $scope.driverId);
    };
    //
    $scope.capturePhoto = function () {
        return test.capturePhoto();
    };
    //
    //
    $scope.getPhoto = function () {
        return test.uploadPhoto();
    };
    //
    //
    $scope.submitForms = function () {
        $ionicSlideBoxDelegate.next();
    };
    //
    //
    //
    //
    $scope.newDate = function () {
        var today = new Date();
        var month = today.getMonth() + 1;
        var day = today.getDate();
        if (month < 10) {
            month = '0' + month;
        }
        if (day < 10) {
            day = '0' + day;
        }
        var formattedToday = today.getFullYear() + '-' + month + '-' + day;
        return formattedToday;
    };
    //
    //
    $scope.checkboxModel = [{
        "checkbox1": true
        }, {
        "checkbox2": false
        }];
    //
    //default slide behaviour
    //
    $scope.checkGaraging = function () {
        return test.setGaraging();
    };
}]);