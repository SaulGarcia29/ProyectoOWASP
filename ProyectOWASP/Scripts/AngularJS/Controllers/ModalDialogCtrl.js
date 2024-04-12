ProjectOWASP.controller('CustomMessageModalDialogCtrl', ['$scope', '$mdDialog', 'GlobalFctr', function ($scope, $mdDialog, GlobalFctr) {

    $scope.ModalConfim = {};

    $scope.ModalConfim.Title = GlobalFctr.MessageModal.Title;
    $scope.ModalConfim.Message = GlobalFctr.MessageModal.Message;
    $scope.answer = function (result) {
        $mdDialog.hide(result);
    };

}]);