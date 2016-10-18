controllers.controller('newCarCtrl', ['BASE_SERVER', '$scope', '$state', '$ionicSlideBoxDelegate', '$injector', '$stateParams', function (baseUrl, $scope, $state, $ionicSlideBoxDelegate, $injector, $stateParams) {
    var _this = this;
    var loadBlock = $injector.get('loadBlock');
    var test = $injector.get('newCarService');
    var insurescanJson = $injector.get('insurescanJson');
    $scope.template = $injector.get('loadJsonTemplate');
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
    //
    //Do UI stuff
    //
    $scope.uploadCarPicture = function (photoId) {
        return test.selectPhotoCar(photoId);
        //        return test.uploadImage2();
    };
    //
    $scope.takeCarPicture = function () {
        //        return test.takePhotoCar();
        test.selectPhotoCar();
    };
    //
    $scope.capturePhoto = function () {
        return test.capturePhotoVin();
    };
    //
    $scope.getPhoto = function () {
        return test.selectPhotoVIN();
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
    $scope.uploadpicture = function () {
        test.uploadPhoto();
    };
    //
    $scope.submitForms = function () {
        //        return test.submitForms();
        //        test.sendEmails();
        //        test.sendQuote();
        $state.go('afterQuote');
    };
    //
    //
    $scope.sendQuote = function () {
        test.sendQuote(insurescanJson.insurescanJson);
        $state.go('afterQuote');
    };
    //
    //TODO this is hideously inefficient, runs through array multiple times
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
}]);