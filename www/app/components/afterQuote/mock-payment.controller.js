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
    //    screen.lockOrientation('portrait');
    $scope.card = {
        name: 'Mike Brown'
        , number: '5555 4444 3333 1111'
        , expiry: '11 / 2020'
        , cvc: '123'
    };
    $scope.cardPlaceholders = {
        name: 'Your Full Name'
        , number: 'xxxx xxxx xxxx xxxx'
        , expiry: 'MM/YY'
        , cvc: 'xxx'
    };
    $scope.cardMessages = {
        validDate: 'valid\nthru'
        , monthYear: 'MM/YYYY'
    , };
    $scope.cardOptions = {
        debug: false
        , formatting: true
    };
}]);