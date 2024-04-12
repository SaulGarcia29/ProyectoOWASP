ProjectOWASP.controller('Roles-Controller', ['$scope', '$http', 'RolesUrl', 'HtmlOptionData', 'GlobalFctr', 'StorageService',
    'SweetAlert', '$timeout', '$mdDialog', 'DefaultValuesInit',
    function ($scope, $http, RolesUrl, HtmlOptionData, GlobalFctr, StorageService, SweetAlert, $timeout, $mdDialog, DefaultValuesInit) {


        $scope.Roles = [];
        $scope.CantPages = 1;
        $scope.Page = 1;
        $scope.formData = {};
        $scope.HtmlOptions = {};
        $scope.AddOrUpdate = "CREAR";
        $("#CornerMessage").attr("hidden", true);

        $scope.SearchByModel = function () {
            var Data = {
                Page: $scope.Page,
                SearchName: $scope.SearchData
            }
            $http.post(RolesUrl.Roles.SearchByModel, Data)
                .then(function (response) {
                    debugger
                    $scope.Roles = response.data.Data.result;
                    $scope.CantPages = response.data.Data.CantPages;
                });
        }

        $scope.SaveOrEdit = function (event) {
            if (event.pointerType == "mouse") {
                $scope.formData = {
                    RolId: $scope.RolId,
                    Nombre: $scope.Nombre,
                };
                if ($scope.Nombre == undefined || $scope.Nombre == "") {
                    var content = {
                        Message: "El campo nombre no puede ir vacío.",
                        Title: "¡Campo sin llenar!"
                    };
                    CornerMessage(content.Title, content.Message, "Error");
                    return;
                }
                if ($scope.AddOrUpdate == "CREAR") {
                    $scope.Add($scope.formData);
                } else {
                    $scope.Update($scope.formData);
                }
            }
        }

        $scope.Add = function (data) {
            $http.post(RolesUrl.Roles.Create, { data: data })
                .then(function (res) {
                    debugger
                    if (res.data.ResponseType != 2) {
                        CornerMessage("Registro agregado correctamente!", "", "HeadsUp");
                        $scope.SearchByModel();
                        $scope.ClearForm();
                    } else {
                        GlobalFctr.ShowCustomDialogAgree(res.data.Message);
                    }
                });
        }

        $scope.Edit = function (index) {
            $scope.AddOrUpdate = "GUARDAR";
            $scope.Id = $scope.Roles[index].RolId;
            $scope.Nombre = $scope.Roles[index].Nombre;

            $mdDialog.show({
                contentElement: '#ContainerMantenimiento',
                parent: angular.element(document.body),
                controller: 'Roles-Controller',
                clickOutsideToClose: false,
                escapeToClose: false
            });
        }

        $scope.Update = function (data) {
            $http.post(RolesUrl.Roles.Update, { data: data })
                .then(function (res) {
                    debugger
                    if (res.data.ResponseType != 2) {
                        CornerMessage("Registro actualizado correctamente!", "", "HeadsUp");
                        $scope.SearchByModel();
                    } else {
                        GlobalFctr.ShowCustomDialogAgree(res.data.Message);
                    }
                });
        }

        $scope.Desactivar_Activar = function (id) {
            GlobalFctr.Delete(RolesUrl.Roles.Activacion_Desactivacion, { id: id })
                .then(function (res) {
                    debugger
                    if (res.ResponseType != 2) {
                        debugger
                        var res = res.Data.estatus == true ? "activado" : "desactivado";
                        $scope.SearchByModel();
                        var content = {
                            Message: "El registro ha sido " + res + ".",
                            Title: "¡Registro " + res + "!"
                        }
                        CornerMessage(content.Title, content.Message, "HeadsUp");
                    } else {
                        GlobalFctr.ShowCustomDialogAgree(res.data.Message);
                    }
                });
        }

        $scope.OpenMantenimiento = function () {
            $scope.AddOrUpdate = "CREAR";
            $mdDialog.show({
                contentElement: '#ContainerMantenimiento',
                parent: angular.element(document.body),
                controller: 'Roles-Controller',
                clickOutsideToClose: false,
                escapeToClose: false
            });
        }

        $scope.ClearForm = function (event) {
            if (event.pointerType == "mouse") {
                $scope.Id = 0;
                $scope.Nombre = null;
                $scope.Email = null;
                $scope.UserName = null;
                $scope.Password = null;

            }
        }

        $scope.CloseDialog = function (event) {
            $mdDialog.hide();
            $scope.ClearForm(event);
        }


        $(document).ready(function () {

        });


        var CornerMessage = function (Title, Message, Type) {

            $scope.TitleAlert = Title;
            $scope.MessageAlert = Message;
            $scope.AlertClass = "";
            $scope.AlertIcon = "";
            if (Type == "Success") {
                $scope.AlertClass = 'alert alert-success';
                $scope.AlertIcon = 'icon ion-ios-checkmark alert-icon tx-24 mg-t-5 mg-xs-t-0';
            } else if (Type == "Error") {
                $scope.AlertClass = 'alert alert-danger';
                $scope.AlertIcon = 'icon ion-ios-close alert-icon tx-32 mg-t-5 mg-xs-t-0';
            } else if (Type == "Warning") {
                $scope.AlertClass = 'alert alert-warning';
                $scope.AlertIcon = 'icon ion-android-warning alert-icon tx-32 mg-t-5 mg-xs-t-0';
            } else if (Type == "HeadsUp") {
                $scope.AlertClass = 'alert alert-info';
                $scope.AlertIcon = 'icon ion-ios-information alert-icon tx-24 mg-t-5 mg-xs-t-0';
            }

            $("#CornerMessage").attr("hidden", false);
            setTimeout(function () {
                $("#CornerMessage").attr("hidden", true);
            }, 5000);

            return

        }

    }]);