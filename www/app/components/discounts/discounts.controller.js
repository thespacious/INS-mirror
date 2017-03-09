controllers.controller('discountsCtrl', ['BASE_SERVER', '$scope', '$state', '$ionicSlideBoxDelegate', '$injector', '$stateParams', function (baseUrl, $scope, $state, $ionicSlideBoxDelegate, $injector, $stateParams) {
    $scope.discounts = {
        "prior-cov": {
            "text": "Prior Coverage"
            , "checked": "false"
            , "description": "check this if you already have insurance, and you're thinking about switching."
        }
        , "multi-car": {
            "text": "Multi Car"
            , "checked": "false"
        }
        , "home-owner": {
            "text": "Home Owner"
            , "checked": "false"
        }
        , "paid-in-full": {
            "text": "Paid in Full"
            , "checked": "false"
        }
        , "good-student": {
            "text": "Good Student"
            , "checked": "false"
        }
    };
}]);