controllers.controller('newCarCtrl', ['BASE_SERVER', '$scope', '$state', '$ionicSlideBoxDelegate', '$injector', '$stateParams', function (baseUrl, $scope, $state, $ionicSlideBoxDelegate, $injector, $stateParams) {
    //
    //=============
    //LOAD SERVICES
    //=============
    //
    var loadBlock = $injector.get('loadBlock');
    var test = $injector.get('newCarService');
    var insurescanJson = $injector.get('insurescanJson');
    $scope.template = $injector.get('loadJsonTemplate');
    //
    //==============
    //VARIABLES HERE
    //==============
    //
    var _this = this;
    $scope.owner = $stateParams.fullname;
    $scope.ownerId = $stateParams.driverId;
    console.log($scope.owner);
    $scope.footerText = "submit";
    $scope.block = "cars";
    //
    //parse for useful content first, then build pages, so pages goes last.
    //get page names
    $scope.pageNames = loadBlock.getPageNames($scope.template, $scope.block);
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
    $scope.pageBlockItems = loadBlock.newGetPageBlockItems($scope.template, $scope.block, $scope.pageNames, $scope.pageBlocks);
    //
    //============
    //UI FUNCTIONS
    //============
    //
    $scope.showGaraging = false;
    //DIAGNOSE
    //    $scope.checkHidden = function (pageBlock) {
    //        //        return test.checkHidden($scope.pageBlockOptions[pageBlock]);
    //        if (pageBlock == "garaging_address") {
    //            return false
    //        }
    //    };
    //
    //default slide behaviour
    //
    $scope.$on("$ionicSlides.sliderInitialized", function (event, data) {
        // data.slider is the instance of Swiper
        $scope.slider = data.slider;
    });
    $scope.$on("$ionicSlides.slideChangeStart", function (event, data) {
        console.log('Slide change is beginning');
        //        if (data.slider.activeIndex != 0) {
        //            $scope.$apply(function () {
        //                $scope.showScanButtons = false;
        //                $scope.showGaragingCard = false;
        //            });
        //        }
        //        else if (data.slider.activeIndex == 0) {
        //            $scope.$apply(function () {
        //                $scope.showScanButtons = true;
        //                $scope.showGaragingCard = true;
        //            });
        //        }
    });
    $scope.$on("$ionicSlides.slideChangeEnd", function (event, data) {
        // note: the indexes are 0-based
        $scope.activeIndex = data.activeIndex;
        $scope.previousIndex = data.previousIndex;
    });
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
    //    screen.lockOrientation('portrait');
    //
    //=================
    //SERVICE FUNCTIONS
    //=================
    //
    $scope.getVinManual = function () {
        document.getElementById('vin').addEventListener('focusout', function () {
            test.getInfoFromWeb(document.carInfo.vin.value);
        });
    };
    //
    $scope.checkHidden = function () {
        return true;
    };
    //
    $scope.uploadCarPicture = function () {
        return test.selectPhotoCar();
        //        return test.uploadImage2();
    };
    //
    $scope.takeCarPicture = function () {
        return test.takePhotoCar();
        //        test.selectPhotoCar();
    };
    //
    $scope.capturePhoto = function () {
        return test.capturePhotoVin();
        //        return test.testScan();
    };
    //
    $scope.getPhoto = function () {
        return test.selectPhotoVIN();
    };
    //
    //
    //
    $scope.uploadpicture = function () {
        test.uploadPhoto();
    };
    //
    $scope.submitForms = function () {
        //        test.submitForms();
        //        test.sendEmails();
        test.submitForms($scope.owner);
        $state.go('home');
    };
    //
    //
    //    $scope.sendQuote = function () {
    //        test.sendQuote(insurescanJson.insurescanJson);
    //        $state.go('afterQuote');
    //    };
    //
    //TODO this is hideously inefficient, runs through array multiple times
    //
    //
    angular.element(document).ready(function () {
        $scope.getVinManual();
    });
}]);