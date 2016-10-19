controllers.controller('quoteInfoCtrl', ['BASE_SERVER', '$scope', '$state', '$injector', 'ionicDatePicker', function (baseUrl, $scope, $state, $injector, ionicDatePicker) {
    var _this = this;
    var loadBlock = $injector.get('loadBlock');
    $scope.datePicker = $injector.get('ionicDatePicker');
    var test = $injector.get('quoteInfoServices');
    $scope.noRun = function () {
        return test.openDatePicker($scope.datePicker);
    };
    $scope.template = $injector.get('loadJsonTemplate');
    //    $scope.newDatePicker = function (page) {
    //        if (page == "policyterm") {
    //            return test.openDatePicker(datePicker);
    //        }
    //    };
    $scope.block = "quote";
    //
    //parse for useful content first, then build pages, so pages goes last.
    //get page names
    $scope.pageNames = loadBlock.getPageNames($scope.template, $scope.block);
    //
    //get block names -> push into appropriate pages
    //
    $scope.pageBlocks = loadBlock.getBlockNames($scope.template, $scope.block, $scope.pageNames);
    //
    //get block content and push into block names
    //
    //
    $scope.pageBlockItems = loadBlock.newGetPageBlockItems($scope.template, $scope.block, $scope.pageNames, $scope.pageBlocks);
    //
    //
    $scope.pageCheck = function (page) {
        if (page == 'policyterm') {
            //            $scope.newDatePicker(page);
            return true;
        }
        else {
            return false;
        }
    };
    //
    //
    $scope.newDate = function () {
        return new Date();
    };
    //
    $scope.createDiscounts = function () {
        return test.createDiscounts();
    };
    //
    //
    $scope.$on("$ionicSlides.sliderInitialized", function (event, data) {
        // data.slider is the instance of Swiper
        $scope.slider = data.slider;
    });
    $scope.$on("$ionicSlides.slideChangeStart", function (event, data) {
        console.log('Slide change is beginning');
        $scope.pageCheck($scope.pageNames[data.slider.activeIndex]);
        if (data.slider.activeIndex != 0) {
            $scope.$apply(function () {
                $state.go('quoteInfo.datePicker');
            });
            $state.go('quoteInfo.datePicker');
        }
        else if (data.slider.activeIndex == 0) {
            $scope.pageCheck($scope.pageNames[data.slider.activeIndex]);
            //            $scope.$apply(function () {
            //                $scope.showScanButtons = true;
            //                $scope.showGaragingCard = true;
            //            });
        }
    });
    $scope.$on("$ionicSlides.slideChangeEnd", function (event, data) {
        // note: the indexes are 0-based
        $scope.activeIndex = data.activeIndex;
        $scope.previousIndex = data.previousIndex;
    });
}]);