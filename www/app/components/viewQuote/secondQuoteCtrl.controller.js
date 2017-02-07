controllers.controller('secondQuoteCtrl', ['BASE_SERVER', '$scope', '$state', '$ionicSlideBoxDelegate', '$injector', '$stateParams', function (baseUrl, $scope, $state, $ionicSlideBoxDelegate, $injector, $stateParams) {
    var quoteJson = $injector.get('quoteJson');
    quoteJson.quoteJson.overview.policypremium = "$600.00"
    $scope.quote = quoteJson.quoteJson;
    $scope.nextState = "legal";
    var params = $state.stateParams;
    $scope.submitForms = function () {
        $state.go('legal');
    };
}]);