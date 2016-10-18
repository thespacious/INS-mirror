controllers.controller('newDriverCtrl', ['BASE_SERVER', '$scope', '$state', '$stateParams', '$ionicSlideBoxDelegate', '$injector', '$timeout', function (baseUrl, $scope, $state, $stateParams, $ionicSlideBoxDelegate, $injector, $timeout) {
    //Why bother? Well look at the alternative. . .
    var _this = this;
    var session = JSON.parse(sessionStorage.getItem("session"));
    //
    //load services
    //
    var loadBlock = $injector.get('loadBlock');
    var test = $injector.get('testService');
    var insurescanJson = $injector.get('insurescanJson');
    //TODO, all this shit
    //    var newJson = $injector.get('newJson');
    //
    //
    $scope.getDriverId = function () {
        if (test.seePrimary() == true) {
            return 0;
        }
        else {
            try {
                return Object.keys(session.drivers).length + 1;
            }
            catch (err) {
                console.log('error with session.drivers');
                return;
            }
        }
    };
    //
    $scope.driverId = $scope.getDriverId();
    //
    //
    $scope.checkHidden = function (pageBlock) {
        return test.checkHidden($scope.pageBlockOptions[pageBlock]);
    };
    //
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
    //utilize our loaded template
    //
    $scope.template = $injector.get('loadJsonTemplate');
    $scope.block = "drivers";
    //
    //
    //TODO
    //    $scope.pages = newJson.getPageBlockItems(newJson.json, 'drivers', true);
    //
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
    //    if ($scope.driverId != 0) {
    //        delete $scope.pageBloc
    //    }
    //
    //add peripheral functions
    //
    $scope.checkEdit = $timeout(function (_this) {
        return _this.test.checkEdit($state.current.name, $scope.driverId);
    }, 0);
    //
    $scope.capturePhoto = function () {
        return test.capturePhoto();
    };
    $scope.submitForms = function () {
        var primary = $scope.checkPrimary(true);
        test.onDriversLicenseSubmit('license', primary, $scope.driverId);
        if (primary == true) {
            test.onUserInfoSubmit('driver_info', $scope.driverId);
        }
        $state.go('home');
    };
    //
    //Do UI stuff
    //
    $scope.change = function (value) {
        console.log('ng change fired.', value);
    };
    //
    //
    $scope.cardShown = false;
    //
    $scope.showCard = function () {
        if ($scope.cardShown == true) {
            $scope.cardShown = false;
        }
        else {
            $scope.cardShown = true;
        }
    };
    //
    $scope.checkType = function (type) {
        if (type != "select") {
            return true;
        }
        else {
            return false;
        }
    };
    //
    //
    //
    //    $scope.superHacky = function () {
    //        if (driverId != 0) {
    //            var maritalstatus = {
    //                "type": "select"
    //                , "label": "Marital Status"
    //                , "options": [
    //                            "single"
    //                            , "married"]
    //            }
    //            $scope.pageBlockItems['maritalstatus'] = maritalstatus;
    //        }
    //    };
    //
    $scope.showGaraging = false;
    $scope.switchGaraging = function () {
        if ($scope.showGaraging == false) {
            $scope.showGaraging = true;
            test.setGaraging(page);
        }
        else {
            $scope.showGaraging = false;
            test.unSetGaraging(page);
        }
    };
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
    $scope.$on("$ionicSlides.sliderInitialized", function (event, data) {
        // data.slider is the instance of Swiper
        $scope.slider = data.slider;
    });
    $scope.$on("$ionicSlides.slideChangeStart", function (event, data) {
        console.log('Slide change is beginning');
    });
    $scope.$on("$ionicSlides.slideChangeEnd", function (event, data) {
        // note: the indexes are 0-based
        $scope.activeIndex = data.activeIndex;
        $scope.previousIndex = data.previousIndex;
    });
}]);