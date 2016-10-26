controllers.controller('afterQuoteController', ['BASE_SERVER', '$scope', '$state', '$ionicSlideBoxDelegate', '$injector', '$stateParams', function (baseUrl, $scope, $state, $ionicSlideBoxDelegate, $injector, $stateParams) {
    $scope.footerText = 'submit';
    var afterQuoteServices = $injector.get('afterQuoteService');
    var sketch;
    //    $scope.submit = function () {};
    //    var initSign = function () {
    //        $('#signature').jSignature();
    //        //        sketch = document.getElementById('SketchPad');
    //    };
    $(function () {
        sketch = $('#SketchPad').sketch();
        //        sketch = document.getElementById('#SketchPad');
    });
    $scope.submitForms = function () {
        $scope.next();
    };
    $scope.submitForms2 = function () {
        afterQuoteServices.uploadSignature(sketch);
        //        afterQuoteServices.sendEmails();
        return $state.go('payment');
    };
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
        $scope.slider = data.slider;
    });
    $scope.$on("$ionicSlides.slideChangeStart", function (event, data) {
        console.log('Slide change is beginning');
        //        }
    });
    $scope.$on("$ionicSlides.slideChangeEnd", function (event, data) {
        // note: the indexes are 0-based
        $scope.activeIndex = data.activeIndex;
        $scope.previousIndex = data.previousIndex;
    });
    //    if (window.DeviceOrientationEvent) {
    //        console.log("DeviceOrientation is supported");
    //    }
    //    window.orientation = 90;
    //    initSign();
    //    window.addEventListener('deviceorientation', function (eventData) {});
    screen.lockOrientation('landscape');
}]);