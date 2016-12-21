controllers.controller('paymentCtrl', ['BASE_SERVER', '$scope', '$state', '$ionicSlideBoxDelegate', '$injector', '$stateParams', function (baseUrl, $scope, $state, $ionicSlideBoxDelegate, $injector, $stateParams) {
    $scope.footerText = 'next';
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
    $scope.submitForms = function (index) {
        navigator.app.exitApp();
    };
    $scope.$on("$ionicSlides.sliderInitialized", function (event, data) {
        // data.slider is the instance of Swiper
        if (data.slider.activeIndex == data.slider.slides.length - 1) {
            $scope.footerText = 'exit';
        }
        else {
            $scope.footerText = 'next';
        }
        $scope.slider = data.slider;
    });
    $scope.$on("$ionicSlides.slideChangeEnd", function (event, data) {
        console.log('Slide change is beginning');
        // data.slider is the instance of Swiper
        if (data.slider.activeIndex == data.slider.slides.length - 1) {
            $scope.footerText = 'exit';
        }
        else {
            $scope.footerText = 'next';
        }
        $scope.slider = data.slider;
    });
    screen.lockOrientation('portrait');
}]);