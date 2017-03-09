controllers.controller('coveragesCtrl', ['BASE_SERVER', '$scope', '$state', '$ionicSlideBoxDelegate', '$injector', '$stateParams', function (baseUrl, $scope, $state, $ionicSlideBoxDelegate, $injector, $stateParams) {
    $scope.coverages = {
        "BI": {
            "type": "select"
            , "label": "Bodily Injury"
            , "options": [
                            "25,000/50,000"]
            , "selected": "25,000/50,000"
        }
        , "PD": {
            "type": "select"
            , "label": "Property Destruction"
            , "options": [
                            "25,000"]
            , "selected": "25,000"
        }
        , "UML": {
            "type": "select"
            , "label": "Uninsured/Underinsured Motorist Bodily Injury"
            , "options": [
                            "Accept"
                            , "Reject"]
            , "selected": "Accept"
        }
        , "UMP": {
            "type": "select"
            , "label": "Uninsured/Underinsured Motorist Property Damage"
            , "options": [
                            "Accept"
                            , "Reject"]
            , "selected": "Accept"
        }
        , "MP": {
            "type": "select"
            , "label": "Medical Payments"
            , "options": [
                             "500"
                            , "1,000"]
            , "selected": "500"
        }
        , "compdeduct": {
            "type": "select"
            , "label": "Comprehensive Deductible"
            , "options": ["200"
                             , "250"
                            , "500", "1,000"]
            , "selected": "250"
        }
        , "collprem": {
            "type": "select"
            , "label": "Collision  Deductible"
            , "options": ["200"
                            , "250"
                            , "500", "1,000"]
            , "selected": "250"
        }
        , "towing": {
            "type": "select"
            , "label": "Towing"
            , "options": ["Accept", "Reject"]
            , "selected": "Accept"
        }
        , "RR": {
            "type": "select"
            , "label": "Rental Reimbursement"
            , "options": ["Accept", "Reject"]
            , "selected": "Accept"
        }
    };
}]);