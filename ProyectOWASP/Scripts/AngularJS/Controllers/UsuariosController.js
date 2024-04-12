ProjectOWASP.controller('Usuarios-Controller', ['$scope', '$http', 'UsuariosUrl', 'HtmlOptionData', 'GlobalFctr', 'StorageService',
    'SweetAlert', '$timeout', '$mdDialog', 'DefaultValuesInit',
    function ($scope, $http, UsuariosUrl, HtmlOptionData, GlobalFctr, StorageService, SweetAlert, $timeout, $mdDialog, DefaultValuesInit) {


        $scope.Usuarios = [];
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
            $http.post(UsuariosUrl.Usuarios.SearchByModel, Data)
                .then(function (response) {
                    debugger
                    $scope.Usuarios = response.data.Data.result;
                    $scope.CantPages = response.data.Data.CantPages;
                });
        }

        $scope.SaveOrEdit = function (event) {
            if (event.pointerType == "mouse") {
                $scope.formData = {
                    Id: $scope.Id,
                    Nombre: $scope.Nombre,
                    Email: $scope.Email,
                    UserName: $scope.UserName,
                    Password: $scope.Password,
                    estatus: true
                };
                if ($scope.Nombre == undefined || $scope.Nombre == "") {
                    var content = {
                        Message: "El campo nombre no puede ir vacío.",
                        Title: "¡Campo sin llenar!"
                    };
                    CornerMessage(content.Title, content.Message, "Error");
                    return;
                }
                if ($scope.UserName == undefined || $scope.UserName == "") {
                    var content = {
                        Message: "El campo nombre de usuario no puede ir vacío.",
                        Title: "¡Campo sin llenar!"
                    };
                    CornerMessage(content.Title, content.Message, "Error");
                    return;
                }
                if ($scope.Password == undefined || $scope.Password == "") {
                    var content = {
                        Message: "El campo contraseña no puede ir vacío.",
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
            $http.post(UsuariosUrl.Usuarios.Create, { data: data })
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
            $scope.Id = $scope.Usuarios[index].Id;
            $scope.Nombre = $scope.Usuarios[index].Nombre;
            $scope.Email = $scope.Usuarios[index].Email;
            $scope.UserName = $scope.Usuarios[index].UserName;
            $scope.Password = $scope.Usuarios[index].Password;
            $scope.Password = $scope.Usuarios[index].Password;
            $scope.Password = $scope.Usuarios[index].Password;

            $mdDialog.show({
                contentElement: '#ContainerMantenimiento',
                parent: angular.element(document.body),
                controller: 'Usuarios-Controller',
                clickOutsideToClose: false,
                escapeToClose: false
            });
        }

        $scope.Update = function (data) {
            $http.post(UsuariosUrl.Usuarios.Update, { data: data })
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
            GlobalFctr.Delete(UsuariosUrl.Usuarios.Activacion_Desactivacion, { id: id })
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
                controller: 'Usuarios-Controller',
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