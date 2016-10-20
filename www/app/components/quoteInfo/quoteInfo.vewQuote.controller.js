controllers.controller('quoteViewCtrl', ['BASE_SERVER', '$scope', '$state', '$injector', 'ionicDatePicker', function (baseUrl, $scope, $state, $injector, ionicDatePicker) {
    var quoteInfoService = $injector.get('quoteInfoServices');
    $scope.footerText = 'accept';
    //    var insurescanJson = $injector.get('insurescanJson');
    var insurescanJson = JSON.parse(sessionStorage.getItem('insurescanJson'));
    $scope.init = function () {
        var newdata = quoteInfoService.sendQuote(insurescanJson);
        $scope.data = newdata;
        //        document.getElementById('viewQuote').html = newdata;
    };
    $scope.submitForms = function () {
        $state.go('afterQuote');
    };
    //    init();
}]);