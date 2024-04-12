ProjectOWASP.factory('CornerAlert', ['$http', '$q', '$mdDialog', '$scope', function ($http, $q, $mdDialog, $scope) {

    var Success = function (Title, Message) {

        $scope.TitleAlert = Title;
        $scope.MessageAlert = Message;
        $scope.AlertClass = 'alert alert-success';
        $scope.AlertIcon = 'icon ion-ios-checkmark alert-icon tx-24 mg-t-5 mg-xs-t-0';

        $("#CornerMessage").attr("hidden", false);
        setTimeout(function () {
            $("#CornerMessage").attr("hidden", true);
        }, 4000);

        return
    }

    var Error = function (data) {

        $scope.TitleAlert = Title;
        $scope.MessageAlert = Message;
        $scope.AlertClass = 'alert alert-danger';
        $scope.AlertIcon = 'icon ion-ios-close alert-icon tx-32 mg-t-5 mg-xs-t-0';

        $("#CornerMessage").attr("hidden", false);
        setTimeout(function () {
            $("#CornerMessage").attr("hidden", true);
        }, 4000);

        return
    }

    var Warning = function (data) {

        $scope.TitleAlert = Title;
        $scope.MessageAlert = Message;
        $scope.AlertClass = 'alert alert-warning';
        $scope.AlertIcon = 'icon ion-android-warning alert-icon tx-32 mg-t-5 mg-xs-t-0';

        $("#CornerMessage").attr("hidden", false);
        setTimeout(function () {
            $("#CornerMessage").attr("hidden", true);
        }, 4000);

        return
    }

    var HeadsUp = function (data) {

        $scope.TitleAlert = Title;
        $scope.MessageAlert = Message;
        $scope.AlertClass = 'alert alert-info';
        $scope.AlertIcon = 'icon ion-ios-information alert-icon tx-24 mg-t-5 mg-xs-t-0';

        $("#CornerMessage").attr("hidden", false);
        setTimeout(function () {
            $("#CornerMessage").attr("hidden", true);
        }, 4000);

        return
    }

    return {
        Success: Success,
        Error: Error,
        Warning: Warning,
        HeadsUp: HeadsUp
    };

}]);