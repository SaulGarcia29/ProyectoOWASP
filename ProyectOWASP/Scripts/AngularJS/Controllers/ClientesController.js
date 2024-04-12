ProjectOWASP.controller('Clientes-Controller', ['$scope', '$http', 'ClientesUrl', 'HtmlOptionData', 'GlobalFctr', 'StorageService',
    'SweetAlert', '$timeout', '$mdDialog', 'DefaultValuesInit',
    function ($scope, $http, ClientesUrl, HtmlOptionData, GlobalFctr, StorageService, SweetAlert, $timeout, $mdDialog, DefaultValuesInit) {


        $scope.Clientes = [];
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
            $http.post(ClientesUrl.Clientes.SearchByModel, Data)
                .then(function (response) {
                    $scope.Clientes = response.data.Data.result;
                    $scope.CantPages = response.data.Data.CantPages;
                });
        }

        $scope.SaveOrEditCliente = function (event) {
            if (event.pointerType == "mouse") {
                $scope.formData = {
                    clienteId: $scope.clienteId,
                    nombre: $scope.nombre,
                    documento_identidad: $scope.documento_identidad,
                    tipo_documento: $scope.TipoDocumentoList.Value,
                    Sexo: $scope.SexoList.Text,
                    telefonos: $scope.telefonos,
                    telefono_celular: $scope.telefono_celular,
                    provincia: $scope.ProvinciasList.Text,
                    municipio: $scope.MunicipiosList.Text,
                    direccion: $scope.direccion,
                    correo: $scope.correo,
                    tipo_cliente: $scope.TipoClienteList.Value,
                    estado_cliente: $scope.estado_cliente,
                    fecha_nacimiento: $scope.fecha_nacimiento,
                    estatus: true
                };
                if ($scope.nombre == undefined || $scope.nombre == "") {
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
            $http.post(ClientesUrl.Clientes.Create, { data: data })
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
            $scope.clienteId = $scope.Clientes[index].clienteId;
            $scope.nombre = $scope.Clientes[index].nombre;
            $scope.documento_identidad = $scope.Clientes[index].documento_identidad;
            $scope.TipoDocumentoList = $scope.HtmlOptions.TipoDocumento.find(x => x.Value == $scope.Clientes[index].tipo_documento);
            $scope.SexoList = $scope.HtmlOptions.Sexo.find(x => x.Text == $scope.Clientes[index].Sexo);
            $scope.telefonos = $scope.Clientes[index].telefonos;
            $scope.telefono_celular = $scope.Clientes[index].telefono_celular;
            $scope.ProvinciasList = $scope.HtmlOptions.Provincias.find(x => x.Text == $scope.Clientes[index].provincia);

            $scope.ChangeMunicipios($scope.ProvinciasList.Value, $scope.Clientes[index].municipio);

            $scope.direccion = $scope.Clientes[index].direccion;
            $scope.correo = $scope.Clientes[index].correo;
            $scope.TipoClienteList = $scope.HtmlOptions.TipoCliente.find(x => x.Value == $scope.Clientes[index].tipo_cliente);
            $scope.estado_cliente = $scope.Clientes[index].estado_cliente;
            $scope.fecha_nacimiento = $scope.Clientes[index].fecha_nacimiento_string == null ? null : new Date($scope.Clientes[index].fecha_nacimiento_string);
            $scope.estatus = $scope.Clientes[index].estatus;

            $mdDialog.show({
                contentElement: '#ContainerMantenimientoCliente',
                parent: angular.element(document.body),
                controller: 'Clientes-Controller',
                clickOutsideToClose: false,
                escapeToClose: false
            });
        }

        $scope.Update = function (data) {
            $http.post(ClientesUrl.Clientes.Update, { data: data })
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
            GlobalFctr.Delete(ClientesUrl.Clientes.Activacion_Desactivacion, { id: id })
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
                contentElement: '#ContainerMantenimientoCliente',
                parent: angular.element(document.body),
                controller: 'Clientes-Controller',
                clickOutsideToClose: false,
                escapeToClose: false
            });
        }

        $scope.ClearForm = function (event) {
            if (event.pointerType == "mouse") {
                $scope.clienteId = 0;
                $scope.nombre = null;
                $scope.documento_identidad = null;
                $scope.telefonos = null;
                $scope.telefono_celular = null;
                $scope.HtmlOptions = {
                    Municipios: DefaultValuesInit.Select
                };
                $scope.MunicipiosList = $scope.HtmlOptions.Municipios[0];
                $scope.direccion = null;
                $scope.correo = null;
                $scope.estado_cliente = null;
                $scope.fecha_nacimiento = null;
                $scope.LoadPage();
                $scope.estatus = true;
            }
        }

        $scope.CloseDialog = function (event) {
            $mdDialog.hide();
            $scope.ClearForm(event);
        }

        $scope.ChangeMunicipios = function (ProvinciaId, MunicipioIdFromEdit) {
            debugger
            var Municipios = HtmlOptionData.Municipios(ProvinciaId);
            Municipios.then(function (data) {
                $scope.HtmlOptions.Municipios = data.Data;
            }).then(function () {
                debugger
                if (MunicipioIdFromEdit != null) {
                    $scope.MunicipiosList = $scope.HtmlOptions.Municipios.find(x => x.Text == MunicipioIdFromEdit);
                } else {
                    $scope.MunicipiosList = $scope.HtmlOptions.Municipios[0];
                }
            });
        }

        $scope.LoadPage = function () {

            var Provincias = HtmlOptionData.Provincias();
            Provincias.then(function (data) {
                $scope.HtmlOptions.Provincias = data.Data;
            }).then(function () {
                $scope.ProvinciasList = $scope.HtmlOptions.Provincias[0];
            });

            var Sexo = HtmlOptionData.Sexo();
            Sexo.then(function (data) {
                $scope.HtmlOptions.Sexo = data.Data;
            }).then(function () {
                $scope.SexoList = $scope.HtmlOptions.Sexo[0];
            });

            var TipoDocumento = HtmlOptionData.TipoDocumento();
            TipoDocumento.then(function (data) {
                $scope.HtmlOptions.TipoDocumento = data.Data;
            }).then(function () {
                $scope.TipoDocumentoList = $scope.HtmlOptions.TipoDocumento[0];
            });

            var TipoCliente = HtmlOptionData.TipoCliente();
            TipoCliente.then(function (data) {
                $scope.HtmlOptions.TipoCliente = data.Data;
            }).then(function () {
                $scope.TipoClienteList = $scope.HtmlOptions.TipoCliente[0];
            });

        }

        $(document).ready(function () {
            $scope.LoadPage();

            $scope.HtmlOptions = {
                Municipios: DefaultValuesInit.Select
            };
            $scope.MunicipiosList = $scope.HtmlOptions.Municipios[0];

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