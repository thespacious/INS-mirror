controllers.controller('datepickerCtrl', ['BASE_SERVER', '$scope', '$state', '$ionicSlideBoxDelegate', '$injector', '$stateParams', function (baseUrl, $scope, $state, $ionicSlideBoxDelegate, $injector, $stateParams) {
    //////////////////////// Create and format todays date for default //////
    // == Get date and components for display
    var d = new Date()
        , month = '' + (d.getMonth() + 1)
        , day = '' + d.getDate()
        , year = d.getFullYear();
    var endmonth = d.getMonth() + 7;
    var endyear = d.getFullYear();
    if (endmonth > 12) {
        endmonth = endmonth % 12;
        endyear += 1;
    }
    if (endmonth.length < 2) month = '0' + month;
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    var today = month + "-" + day + "-" + year;
    var end = endmonth + "-" + day + "-" + endyear;
    /////////////////////////////////////////////////////////
    //
    ///////////////////////// FORMAT DATE ///////////////////
    var formatDate = function (date) {
        //        console.log(date.getDay());
        var d = new Date(date)
            , month = '' + (d.getMonth() + 1)
            , day = '' + d.getDate()
            , year = d.getFullYear();
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
        return month + "-" + day + "-" + year;
    };
    var addSixMonths = function (date) {
        var d = new Date(date)
            , month = '' + (d.getMonth() + 1)
            , day = '' + d.getDate()
            , year = d.getFullYear();
        var endmonth = d.getMonth() + 7;
        var endyear = d.getFullYear();
        if (endmonth > 12) {
            endmonth = endmonth % 12;
            endyear += 1;
        }
        console.log("endmonth.length: ", endmonth);
        if (endmonth < 10) endmonth = '0' + endmonth;
        if (day.length < 2) day = '0' + day;
        console.log('addSixMonths date: ', endmonth, day, endyear)
        var end = endmonth + "-" + day + "-" + endyear;
        return end;
    };
    $scope.$watch('date.date', function (newDate) {
        console.log("date has changed: ", newDate);
        $scope.date.start = formatDate(newDate);
        $scope.date.end = addSixMonths(newDate);
    });
    $scope.date = {
        "type": "date"
        , "start": today
        , "date": d
        , "end": end
    };
}]);