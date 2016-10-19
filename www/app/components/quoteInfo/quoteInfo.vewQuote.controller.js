controllers.controller('quoteViewCtrl', ['BASE_SERVER', '$scope', '$state', '$injector', 'ionicDatePicker', function (baseUrl, $scope, $state, $injector, ionicDatePicker) {
    var quoteInfoService = $injector.get('quoteInfoServices');
    var insurescanJson = $injector.get('insurescanJson');
    var init = function () {
        var newdata = quoteInfoService.sendQuote();
        $scope.data = newdata;
    };
    $scope.submitForms = function () {
        $state.go('afterQuote');
    };
    init();
}]);