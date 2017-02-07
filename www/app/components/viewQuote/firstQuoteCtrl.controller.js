controllers.controller('firstQuoteCtrl', ['BASE_SERVER', '$scope', '$state', '$ionicSlideBoxDelegate', '$injector', '$stateParams', function (baseUrl, $scope, $state, $ionicSlideBoxDelegate, $injector, $stateParams) {
    var params = $state.params;
    var quoteJson = $injector.get('quoteJson');
    if (params.first == false) {
        quoteJson.quoteJson.overview.policypremium = "$600.00"
        $scope.nextState = "legal"
    }
    else {
        $scope.nextState = "pre-payment";
    }
    $scope.quote = quoteJson.quoteJson;
    //    $scope.submitForms = function () {
    //        $state.go('pre-payment');
    //    };
}]);