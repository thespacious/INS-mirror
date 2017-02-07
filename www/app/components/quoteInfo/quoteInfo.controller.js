controllers.controller('quoteInfoCtrl', ['BASE_SERVER', '$scope', '$state', '$injector', 'ionicDatePicker', function (baseUrl, $scope, $state, $injector, ionicDatePicker) {
    var _this = this;
    $scope.footerText = 'submit';
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
    $scope.newnewDate = function () {
        var today = new Date();
        var day = today.getDate();
        var month = today.getMonth() + 1;
        if (day < 10) {
            day = '0' + day;
        }
        var year = today.getFullYear();
        if ((month + 6) > 12) {
            month = (month + 6) % 12;
            month = '0' + month;
            year = year + 1;
        }
        else {
            month = month + 6;
        }
        if (month < 10) {
            month = '0' + month;
        }
        //        var formattedToday = year + '-' + month + '-' + day;
        var formattedToday = month + '/' + day + '/' + year;
        $scope.sixmonths = formattedToday;
        return formattedToday;
    };
    //
    $scope.today = $scope.newDate();
    //
    $scope.todayasdate = new Date();
    //
    $scope.sixmonths = $scope.newnewDate();
    //
    var tempdate = new Date();
    //
    $scope.sixmonthsasdate = tempdate.setMonth(tempdate.getMonth() + 6)
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
    //
    $scope.incrementDate = function () {
        test.incrementDate();
    };
    $scope.submitForms = function () {
        var insurescanJson = JSON.parse(sessionStorage.getItem('insurescanJson'));
        $state.go('viewQuote');
    };
}]);