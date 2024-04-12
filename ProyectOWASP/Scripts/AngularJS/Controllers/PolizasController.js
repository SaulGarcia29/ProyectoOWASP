ProjectOWASP.controller('Polizas-Controller', ['$scope', '$http', 'PolizasUrl', 'HtmlOptionData', 'GlobalFctr', 'StorageService', 'SweetAlert', '$timeout', 'DefaultValuesInit', '$mdDialog', 'ClientesUrl', 'AseguradorasUrl', 'CasosUrl',
    function ($scope, $http, PolizasUrl, HtmlOptionData, GlobalFctr, StorageService, SweetAlert, $timeout, DefaultValuesInit, $mdDialog, ClientesUrl, AseguradorasUrl, CasosUrl) {

        $scope.Polizas = [];
        $scope.CantPages = 1;
        //$scope.SearchDias = 30;
        $scope.Page = 1;
        $scope.Inicio = false;
        $scope.formData = {};
        $scope.HtmlOptions = {};
        $scope.AddOrUpdate = "CREAR";
        $scope.ButtonInPoliza = 1;
        $("#CornerMessage").attr("hidden", true);
        $(".ShowToPrint").attr("hidden", true);
        $scope.AddOrUpdatePolizaBool = false;



        // ------------------------------------ INDEX ------------------------------------

        $scope.SearchByModel = function (op) {
            debugger
            if ($scope.Inicio) {
                if (op == 1) {
                    var data = {
                        data: {
                            SearchNo_Poliza: $scope.SearchNo_Poliza,
                            SearchCliente: $scope.SearchCliente,
                            SearchPolizaEstado: $scope.EstadoPolizaList.Value,
                            SearchEstatus: $scope.EstatusList.Value,
                            SearchEmision: $scope.SearchEmision,

                            SearchAseguradora: $scope.AseguradorasList.Value,
                            SearchTipoPoliza: $scope.TipoPolizaList.Value,
                            SearchSubtipoPoliza: $scope.SubtipoPolizaList.Value,
                            SearchPlanes: $scope.TipoPlanList.Value,

                            SearchDesde: $scope.SearchDesde,
                            SearchDias: $scope.SearchDias,
                        },
                        Page: $scope.Page
                    };
                } else {
                    var data = {
                        data: {
                            SearchNo_Poliza: $scope.SearchNo_Poliza,
                            SearchCliente: $scope.SearchCliente,
                            SearchPolizaEstado: "",
                            SearchEstatus: -1,
                            SearchEmision: null,

                            SearchAseguradora: 0,
                            SearchTipoPoliza: 0,
                            SearchSubtipoPoliza: 0,
                            SearchPlanes: 0,

                            SearchDesde: null,
                            SearchDias: 30,
                        },
                        Page: $scope.Page
                    };
                }
            } else {
                var data = {
                    data: {
                        SearchNo_Poliza: null,
                        SearchCliente: null,
                        SearchPolizaEstado: "Vigente",
                        SearchEstatus: 1,
                        SearchEmision: null,

                        SearchAseguradora: 0,
                        SearchTipoPoliza: 0,
                        SearchSubtipoPoliza: 0,
                        SearchPlanes: 0,

                        SearchDesde: $scope.SearchDesde,
                        SearchDias: $scope.SearchDias,
                    },
                    Page: $scope.Page
                };
                $scope.Inicio = true;
            }
            $http.post(PolizasUrl.Polizas.SearchByModel, data)
                .then(function (response) {

                    //$scope.Polizas = response.data.Data.result;
                    $scope.AllPoliza = response.data.Data.AllPoliza;
                    //$scope.CantPages = response.data.Data.CantPages;

                });
        }

        $scope.CleanFiltros = function (event) {
            if (event.pointerType == "mouse") {
                $scope.SearchNo_Poliza = null;
                $scope.SearchCliente = null;
                $scope.SearchEmision = null;
                $scope.SearchDesde = null;
                $scope.SearchDias = null;

                $scope.AseguradorasList = $scope.HtmlOptions.Aseguradoras[0];
                $scope.EstatusList = $scope.HtmlOptions.Estatus[0];
                $scope.TipoDePolizaList = $scope.HtmlOptions.TipoDePoliza[0];
                $scope.EstadoPolizaList = $scope.HtmlOptions.EstadoPoliza[0];
                $scope.ChangeTipoPoliza(0);
                $scope.ChangeSubtipoPoliza(0);
                $scope.ChangeTiploPlan(0);
            }
        }

        $scope.PrintPdfList = function () {
            //print();
            $("th").css("color", "black");
            //$("th").css("background-color", "#567aab");
            $(".HiddePrint").attr("hidden", true);
            $(".ShowToPrint").attr("hidden", false);
            window.print();
            $(".HiddePrint").attr("hidden", false);
            $(".ShowToPrint").attr("hidden", true);
            $("th").css("color", "white");
            //printJS('contentprint', 'html')
        }

        $scope.Add = function (data, event) {
            $http.post(PolizasUrl.Polizas.Create, { Polizas: data })
                .then(function (res) {
                    if (res.data.ResponseType != 2) {
                        CornerMessage("Registro agregado correctamente!", "", "HeadsUp");
                        //$scope.CleanFiltros(event);
                        $scope.CleanMantenimientoPoliza(event);
                        $scope.SearchByModel();
                    } else {
                        GlobalFctr.ShowCustomDialogAgree(res.data.Message);
                    }
                });
        }

        $scope.GoToDetails = function (id) {
            var url = PolizasUrl.Polizas.Details + "?polizaId=" + id;
            window.location.href = url;
        }

        // ---------------------------------- DETALLES  -----------------------------------

        $scope.EditPoliza = function () {
            $scope.AddOrUpdate = "GUARDAR";
            $scope.AddOrUpdatePolizaBool = true;
            $scope.OpenMantenimientoPoliza();

            $scope.ClientesList = $scope.HtmlOptions.Clientes.find(x => x.Value == $scope.clienteId);
            $("#select2-ClientesList-container").val(0)[0].innerText = $scope.ClientesList.Text;

            $scope.AseguradorasListForm = $scope.HtmlOptions.AseguradorasForm.find(x => x.Value == $scope.aseguradoraId);
            $scope.ChangeTipoPolizaForm($scope.aseguradoraId);

            $scope.SioNoList = $scope.HtmlOptions.SioNo.find(x => x.Value == $scope.tiene_dependencia);
            $scope.FrecuenciaPagoList = $scope.HtmlOptions.FrecuenciaPago.find(x => x.Value == $scope.frecuencia_pago);
            $scope.TipoMonedaList = $scope.HtmlOptions.TipoMoneda.find(x => x.Value == $scope.tipo_moneda);
            $scope.TipoDePolizaListForm = $scope.HtmlOptions.TipoDePolizaForm.find(x => x.Value == $scope.TipoDePolizaValue);
        }
        $scope.UpdatePoliza = function (data) {
            debugger
            $http.post(PolizasUrl.Polizas.Update, { data: data })
                .then(function (res) {
                    if (res.data.ResponseType != 2) {
                        CornerMessage("Registro actualizado correctamente!", "", "HeadsUp");
                        setTimeout(function () {
                            location.reload();
                        }, 3000);
                    } else {
                        CornerMessage(res.data.Message.Title, res.data.Message.Message, "Error");
                        //GlobalFctr.ShowCustomDialogAgree(res.data.Message);
                    }
                });
        }

        $scope.EditCliente = function (Id) {
            $http.post(ClientesUrl.Clientes.GetById, { Id: Id })
                .then(function (res) {
                    $scope.AddOrUpdate = "GUARDAR";
                    $scope.clienteId = res.data.Data.clienteId;
                    $scope.nombre = res.data.Data.nombre;
                    $scope.documento_identidad = res.data.Data.documento_identidad;
                    $scope.telefonos = res.data.Data.telefonos;
                    $scope.telefono_celular = res.data.Data.telefono_celular;
                    $scope.direccion = res.data.Data.direccion;
                    $scope.correo = res.data.Data.correo;
                    $scope.estado_cliente = res.data.Data.estado_cliente;
                    debugger
                    $scope.fecha_nacimiento = new Date(res.data.Data.fecha_nacimiento_string);
                    $scope.estatus = res.data.Data.estatus;

                    var Provincias = HtmlOptionData.Provincias();
                    Provincias.then(function (data) {
                        $scope.HtmlOptions.Provincias = data.Data;
                    }).then(function () {
                        $scope.ProvinciasList = $scope.HtmlOptions.Provincias.find(x => x.Text == res.data.Data.provincia);
                        var Municipios = HtmlOptionData.Municipios($scope.ProvinciasList.Value);
                        Municipios.then(function (data) {
                            $scope.HtmlOptions.Municipios = data.Data;
                        }).then(function () {
                            $scope.MunicipiosList = $scope.HtmlOptions.Municipios.find(x => x.Text == res.data.Data.municipio);
                        });
                    });

                    var TipoDocumento = HtmlOptionData.TipoDocumento();
                    TipoDocumento.then(function (data) {
                        $scope.HtmlOptions.TipoDocumento = data.Data;
                    }).then(function () {
                        $scope.TipoDocumentoList = $scope.HtmlOptions.TipoDocumento.find(x => x.Value == res.data.Data.tipo_documento);
                    });

                    var TipoCliente = HtmlOptionData.TipoCliente();
                    TipoCliente.then(function (data) {
                        $scope.HtmlOptions.TipoCliente = data.Data;
                    }).then(function () {
                        $scope.TipoClienteList = $scope.HtmlOptions.TipoCliente.find(x => x.Value == res.data.Data.tipo_cliente);
                    });

                    var Sexo = HtmlOptionData.Sexo();
                    Sexo.then(function (data) {
                        $scope.HtmlOptions.Sexo = data.Data;
                    }).then(function () {
                        $scope.SexoList = $scope.HtmlOptions.Sexo.find(x => x.Text == res.data.Data.Sexo);
                    });
                });

            //var Provincias = HtmlOptionData.Provincias();
            //Provincias.then(function (data) {
            //    $scope.HtmlOptions.Provincias = data.Data;
            //}).then(function () {
            //    $scope.ProvinciasList = $scope.HtmlOptions.Provincias[0];
            //});

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

            $scope.OpenMantenimientoCliente();
        }
        $scope.UpdateCliente = function (data) {
            debugger
            $http.post(ClientesUrl.Clientes.Update, { data: data })
                .then(function (res) {
                    if (res.data.ResponseType != 2) {
                        CornerMessage("Registro actualizado correctamente!", "", "HeadsUp");
                        setTimeout(function () {
                            location.reload();
                        }, 3000);
                    } else {
                        CornerMessage(res.data.Message.Title, res.data.Message.Message, "Error");
                        //GlobalFctr.ShowCustomDialogAgree(res.data.Message);
                    }
                });
        }

        $scope.EditAseguradora = function (Id) {
            $http.post(AseguradorasUrl.Aseguradoras.GetById, { Id: Id })
                .then(function (res) {
                    $scope.AddOrUpdate = "GUARDAR";
                    $scope.aseguradoraId = res.data.Data.aseguradoraId;
                    $scope.nombre = res.data.Data.nombre;
                    $scope.direccion = res.data.Data.direccion;
                    $scope.rnc = res.data.Data.rnc;
                    $scope.telefono = res.data.Data.telefono;
                    $scope.contacto = res.data.Data.contacto;
                    $scope.estatus = res.data.Data.estatus;
                    $scope.OpenMantenimientoAseguradora();
                });

        }
        $scope.UpdateAseguradora = function (data) {
            debugger
            $http.post(AseguradorasUrl.Aseguradoras.Update, { data: data })
                .then(function (res) {
                    if (res.data.ResponseType != 2) {
                        CornerMessage("Registro actualizado correctamente!", "", "HeadsUp");
                        setTimeout(function () {
                            location.reload();
                        }, 3000);
                    } else {
                        CornerMessage(res.data.Message.Title, res.data.Message.Message, "Error");
                        //GlobalFctr.ShowCustomDialogAgree(res.data.Message);
                    }
                });
        }

        $scope.GoToCasos = function (No_Poliza) {
            var url = CasosUrl.Casos.Index + "?No_Poliza=" + No_Poliza;
            window.location.href = url;
        }
        $scope.Desactivar_Activar = function (id) {
            GlobalFctr.Delete(PolizasUrl.Polizas.Activacion_Desactivacion, { id: id })
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
                        setTimeout(function () {
                            location.reload();
                        }, 3000);
                    } else {
                        GlobalFctr.ShowCustomDialogAgree(res.data.Message);
                    }
                });
        }
        $scope.PrintPdfDetails = function () {
            //print();
            $(".HiddePrint").attr("hidden", true);
            $(".ShowToPrint").attr("hidden", false);
            $("#MoveToPrint").css("margin-bottom", "1%");
            //$("h7").css("color", "black");
            window.print();
            $(".HiddePrint").attr("hidden", false);
            $(".ShowToPrint").attr("hidden", true);
            $("#MoveToPrint").css("margin-bottom", "0px");
            //$("h7").css("color", "white");
            //printJS('contentprint', 'html')
        }
        $scope.OpenRenovar = function () {
            $mdDialog.show({
                contentElement: '#ContainerToRenovar',
                parent: angular.element(document.body),
                controller: 'Polizas-Controller',
                clickOutsideToClose: false,
                escapeToClose: false
            });
        }
        $scope.RenovarPoliza = function () {
            $http.post(PolizasUrl.Polizas.RenovarPoliza, { renovarFecha: $scope.FechaRenovar, id: $scope.polizaId })
                .then(function (res) {
                    if (res.data.ResponseType != 2) {
                        CornerMessage("Registro actualizado correctamente!", "", "HeadsUp");
                        setTimeout(function () {
                            location.reload();
                        }, 3000);
                    } else {
                        CornerMessage(res.data.Message.Title, res.data.Message.Message, "Error");
                        //GlobalFctr.ShowCustomDialogAgree(res.data.Message);
                    }
                });
        }

        // ------------------------------------ OTHERS  ------------------------------------

        $scope.SaveOrEditPoliza = function (event) {
            debugger
            if (event.pointerType == "mouse") {
                $scope.formData = {
                    polizaId: $scope.polizaId,
                    no_poliza: $scope.no_poliza,
                    clienteId: $("#ClientesList").val(),
                    tipo_planId: $scope.TipoPlanListForm.Value,
                    aseguradoraId: $scope.AseguradorasListForm.Value,
                    tipo_polizaId: $scope.TipoPolizaListForm.Value,
                    fecha_emision: $scope.fecha_emision,
                    fecha_vencimiento: $scope.fecha_vencimiento,
                    tiene_dependencia: $scope.SioNoList.Value,
                    frecuencia_pago: $scope.FrecuenciaPagoList.Value,
                    dia_de_facturacion: $scope.dia_de_facturacion,
                    valor_asegurado: $scope.valor_asegurado,
                    tipo_moneda: $scope.TipoMonedaList.Value,
                    chasis: $scope.chasis,
                    descripcion: $scope.descripcion,
                    descripcion_2: $scope.descripcion_2,
                    usuario: $scope.usuario,
                    SubTipoId: $scope.SubtipoPolizaListForm.Value,
                    EstadoPoliza: $scope.EstadoPoliza,
                    estatus: $scope.estatus,
                    TipoDePoliza: $scope.TipoDePolizaListForm.Value,
                    CantDependientes: $scope.CantDependientes,
                    UsuarioCreador: $scope.UsuarioCreador,
                    ValorPrima: $scope.ValorPrima,
                };
                debugger
                if ($scope.formData.no_poliza == "" || $scope.formData.no_poliza == null) {
                    var content = {
                        Message: "El campo numero de poliza no puede ir vacío.",
                        Title: "¡Campo sin llenar!"
                    };
                    CornerMessage(content.Title, content.Message, "Error");
                    return;
                }
                if ($scope.formData.clienteId == 0) {
                    var content = {
                        Message: "Debe elegir un cliente.",
                        Title: "¡Campo sin elegir!"
                    };
                    CornerMessage(content.Title, content.Message, "Error");
                    return;
                }
                if ($scope.formData.aseguradoraId == 0) {
                    var content = {
                        Message: "Debe elegir una aseguradora.",
                        Title: "¡Campo sin elegir!"
                    };
                    CornerMessage(content.Title, content.Message, "Error");
                    return;
                }
                if ($scope.formData.tipo_polizaId == 0) {
                    var content = {
                        Message: "Debe elegir una rama.",
                        Title: "¡Campo sin elegir!"
                    };
                    CornerMessage(content.Title, content.Message, "Error");
                    return;
                }
                if ($scope.formData.SubTipoId == 0) {
                    var content = {
                        Message: "Debe elegir un división.",
                        Title: "¡Campo sin elegir!"
                    };
                    CornerMessage(content.Title, content.Message, "Error");
                    return;
                }
                if ($scope.formData.tipo_planId == 0) {
                    var content = {
                        Message: "Debe elegir un tipo de plan.",
                        Title: "¡Campo sin elegir!"
                    };
                    CornerMessage(content.Title, content.Message, "Error");
                    return;
                }
                //if (isNullOrUndef($scope.formData.fecha_emision)) {
                //    var content = {
                //        Message: "Debe introducir una fecha de emision.",
                //        Title: "¡Campo sin llenar!"
                //    };
                //    CornerMessage(content.Title, content.Message, "Error");
                //    return;
                //}
                if ($scope.formData.fecha_vencimiento == undefined || $scope.formData.fecha_vencimiento == null) {
                    var content = {
                        Message: "Debe introducir una fecha de vencimiento.",
                        Title: "¡Campo sin llenar!"
                    };
                    CornerMessage(content.Title, content.Message, "Error");
                    return;
                }
                debugger
                if ($scope.formData.dia_de_facturacion < 1 || $scope.formData.dia_de_facturacion > 31) {
                    var content = {
                        Message: "El campo dia de facturación debe de estar entre los dias del 1 a 31.",
                        Title: "¡Campo sin llenar!"
                    };
                    CornerMessage(content.Title, content.Message, "Error");
                    return;
                }
                if ($scope.formData.TipoDePoliza == 0) {
                    var content = {
                        Message: "Debe elegir un tipo de poliza.",
                        Title: "¡Campo sin elegir!"
                    };
                    CornerMessage(content.Title, content.Message, "Error");
                    return;
                }
                if ($scope.formData.tiene_dependencia != 'Si') {
                    $scope.formData.CantDependientes = 0;

                }
                if ($scope.AddOrUpdate == "CREAR") {
                    $scope.Add($scope.formData, event);
                } else {
                    $scope.formData.estatus = $scope.formData.estatus == "Activo" ? true : false;
                    $scope.UpdatePoliza($scope.formData);
                }
            }
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
                debugger
                if ($scope.nombre == undefined || $scope.nombre == "") {
                    var content = {
                        Message: "El campo nombre no puede ir vacío.",
                        Title: "¡Campo sin llenar!"
                    };
                    CornerMessage(content.Title, content.Message, "Error");
                    return;
                }
            }

            $scope.UpdateCliente($scope.formData);
        }
        $scope.SaveOrEditAseguradora = function (event) {
            if (event.pointerType == "mouse") {
                $scope.formData = {
                    aseguradoraId: $scope.aseguradoraId,
                    nombre: $scope.nombre,
                    direccion: $scope.direccion,
                    rnc: $scope.rnc,
                    telefono: $scope.telefono,
                    contacto: $scope.contacto,
                    estatus: true,
                };
                if ($scope.nombre == undefined || $scope.nombre == "") {
                    var content = {
                        Message: "El campo nombre no puede ir vacío.",
                        Title: "¡Campo sin llenar!"
                    };
                    CornerMessage(content.Title, content.Message, "Error");
                    return;
                }
                $scope.UpdateAseguradora($scope.formData);
            }
        }

        $scope.OpenMantenimientoPoliza = function () {
            $mdDialog.show({
                contentElement: '#ContainerMantenimientoPoliza',
                parent: angular.element(document.body),
                controller: 'Polizas-Controller',
                clickOutsideToClose: false,
                escapeToClose: false
            });
        }
        $scope.OpenMantenimientoCliente = function () {
            $mdDialog.show({
                contentElement: '#ContainerMantenimientoCliente',
                parent: angular.element(document.body),
                controller: 'Polizas-Controller',
                clickOutsideToClose: false,
                escapeToClose: false
            });
        }
        $scope.OpenMantenimientoAseguradora = function () {
            $mdDialog.show({
                contentElement: '#ContainerMantenimientoAseguradora',
                parent: angular.element(document.body),
                controller: 'Polizas-Controller',
                clickOutsideToClose: false,
                escapeToClose: false
            });
        }

        $scope.CleanMantenimientoPoliza = function (event) {
            if (event.pointerType == "mouse") {
                $scope.AddOrUpdatePolizaBool = false;
                $scope.polizaId = null;
                $scope.no_poliza = null;
                $scope.fecha_emision = null;
                $scope.fecha_vencimiento = null;
                $scope.dia_de_facturacion = null;
                $scope.valor_asegurado = null;
                $scope.chasis = null;
                $scope.descripcion = null;
                $scope.descripcion_2 = null;
                $scope.usuario = null;
                $scope.EstadoPoliza = null;
                $scope.ValorPrima = null;
                $scope.EstadoPoliza = null;
                $scope.TipoPolizaListForm = $scope.HtmlOptions.TipoPolizaByAseguradoraForm[0];
                $scope.ClientesList = $scope.HtmlOptions.Clientes[0];
                $("#select2-ClientesList-container").val(0)[0].innerText = $scope.ClientesList.Text

                $scope.AseguradorasListForm = $scope.HtmlOptions.AseguradorasForm[0];
                $scope.ChangeTipoPolizaForm($scope.AseguradorasListForm.Value);

                $scope.SioNoList = $scope.HtmlOptions.SioNo[0];
                $scope.FrecuenciaPagoList = $scope.HtmlOptions.FrecuenciaPago[0];
                $scope.TipoMonedaList = $scope.HtmlOptions.TipoMoneda[0];

                $scope.estatus = true;
            }
        }

        $scope.CloseDialog = function () {
            $mdDialog.hide();
        }

        $scope.ChangeTipoPoliza = function (id) {
            var TipoPolizaByAseguradora = HtmlOptionData.TipoPolizaByAseguradora(id);
            TipoPolizaByAseguradora.then(function (data) {
                $scope.HtmlOptions.TipoPolizaByAseguradora = data.Data;
            }).then(function () {
                $scope.HtmlOptions.TipoPolizaByAseguradora[0].Text = "Todos";
                $scope.TipoPolizaList = $scope.HtmlOptions.TipoPolizaByAseguradora[0];
                $scope.ChangeSubtipoPoliza($scope.TipoPolizaList.Value);
            });
        }
        $scope.ChangeSubtipoPoliza = function (id) {
            var SubtipoByTipoPoliza = HtmlOptionData.SubtipoByTipoPoliza(id);
            SubtipoByTipoPoliza.then(function (data) {
                $scope.HtmlOptions.SubtipoByTipoPoliza = data.Data;
            }).then(function () {
                $scope.HtmlOptions.SubtipoByTipoPoliza[0].Text = "Todos";
                $scope.SubtipoPolizaList = $scope.HtmlOptions.SubtipoByTipoPoliza[0];
                $scope.ChangeTiploPlan($scope.SubtipoPolizaList.Value);
            });
        }
        $scope.ChangeTiploPlan = function (id) {
            var TipoPlanBySubtipo = HtmlOptionData.TipoPlanBySubtipo(id);
            TipoPlanBySubtipo.then(function (data) {
                $scope.HtmlOptions.TipoPlanBySubtipo = data.Data;
            }).then(function () {
                $scope.HtmlOptions.TipoPlanBySubtipo[0].Text = "Todos";
                $scope.TipoPlanList = $scope.HtmlOptions.TipoPlanBySubtipo[0];
            });
        }

        $scope.ChangeTipoPolizaForm = function (id) {
            var TipoPolizaByAseguradora = HtmlOptionData.TipoPolizaByAseguradora(id);
            TipoPolizaByAseguradora.then(function (data) {
                $scope.HtmlOptions.TipoPolizaByAseguradoraForm = data.Data;
            }).then(function () {
                if ($scope.AddOrUpdate == "GUARDAR") {
                    $scope.TipoPolizaListForm = $scope.HtmlOptions.TipoPolizaByAseguradoraForm.find(x => x.Value == $scope.tipo_polizaId);
                    $scope.ChangeSubtipoPolizaForm($scope.tipo_polizaId);
                } else {
                    $scope.TipoPolizaListForm = $scope.HtmlOptions.TipoPolizaByAseguradoraForm[0];
                    $scope.ChangeSubtipoPolizaForm($scope.TipoPolizaListForm.Value)
                }
            });
        }
        $scope.ChangeSubtipoPolizaForm = function (id) {
            var SubtipoByTipoPoliza = HtmlOptionData.SubtipoByTipoPoliza(id);
            SubtipoByTipoPoliza.then(function (data) {
                $scope.HtmlOptions.SubtipoByTipoPolizaForm = data.Data;
            }).then(function () {
                if ($scope.AddOrUpdate == "GUARDAR") {
                    $scope.SubtipoPolizaListForm = $scope.HtmlOptions.SubtipoByTipoPolizaForm.find(x => x.Value == $scope.SubTipoId);
                    $scope.ChangeTiploPlanForm($scope.SubTipoId);
                } else {
                    $scope.SubtipoPolizaListForm = $scope.HtmlOptions.SubtipoByTipoPolizaForm[0];
                    $scope.ChangeTiploPlanForm($scope.SubtipoPolizaListForm.Value);
                }
            });
        }
        $scope.ChangeTiploPlanForm = function (id) {
            var TipoPlanBySubtipo = HtmlOptionData.TipoPlanBySubtipo(id);
            TipoPlanBySubtipo.then(function (data) {
                $scope.HtmlOptions.TipoPlanBySubtipoForm = data.Data;
            }).then(function () {
                if ($scope.AddOrUpdate == "GUARDAR") {
                    $scope.TipoPlanListForm = $scope.HtmlOptions.TipoPlanBySubtipoForm.find(x => x.Value == $scope.tipo_planId);
                } else {
                    $scope.TipoPlanListForm = $scope.HtmlOptions.TipoPlanBySubtipoForm[0];
                }
            });
        }

        $scope.LoadPage = function () {
            var id = StorageService.Session.getObject("Id")
            var url = baseUrl + '/Contacto/GetData/';
            if (id != null) {
                $http.post(url, { id: id })
                    .then(function (response) {
                        $scope.formData.Habilitado = response.data.Data.C_Habilitado;
                    });
            }

            var Aseguradoras = HtmlOptionData.Aseguradoras();
            Aseguradoras.then(function (data) {
                $scope.HtmlOptions.Aseguradoras = data.Data;
            }).then(function () {
                $scope.HtmlOptions.Aseguradoras[0].Text = "Todas";
                $scope.AseguradorasList = $scope.HtmlOptions.Aseguradoras[0];
            });

            var AseguradorasForm = HtmlOptionData.Aseguradoras();
            AseguradorasForm.then(function (data) {
                $scope.HtmlOptions.AseguradorasForm = data.Data;
            }).then(function () {
                $scope.AseguradorasListForm = $scope.HtmlOptions.AseguradorasForm[0];
            });

            var Estatus = HtmlOptionData.Estatus();
            Estatus.then(function (data) {
                $scope.HtmlOptions.Estatus = data.Data;
            }).then(function () {
                $scope.EstatusList = $scope.HtmlOptions.Estatus[1];
            });


            var Clientes = HtmlOptionData.Clientes();
            Clientes.then(function (data) {
                $scope.HtmlOptions.Clientes = data.Data;
            }).then(function () {

                $scope.ClientesList = $scope.HtmlOptions.Clientes[0];
            });


            var TipoDePolizaForm = HtmlOptionData.TipoDePoliza();
            TipoDePolizaForm.then(function (data) {
                $scope.HtmlOptions.TipoDePolizaForm = data.Data;
            }).then(function () {
                $scope.TipoDePolizaListForm = $scope.HtmlOptions.TipoDePolizaForm[0];
            });


            var TipoDePoliza = HtmlOptionData.TipoDePoliza();
            TipoDePoliza.then(function (data) {
                $scope.HtmlOptions.TipoDePoliza = data.Data;
            }).then(function () {
                $scope.HtmlOptions.TipoDePoliza[0].Text = "Todos";
                $scope.TipoDePolizaList = $scope.HtmlOptions.TipoDePoliza[0];
            });

        }

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

        $(document).ready(function () {
            $scope.LoadPage();
            var Selects = $scope.ManualSelect();


            $scope.HtmlOptions = {
                TipoPolizaByAseguradora: DefaultValuesInit.Select2,
                TipoPolizaByAseguradoraForm: DefaultValuesInit.Select,
                SubtipoByTipoPoliza: DefaultValuesInit.Select2,
                SubtipoByTipoPolizaForm: DefaultValuesInit.Select,
                TipoPlanBySubtipo: DefaultValuesInit.Select2,
                TipoPlanBySubtipoForm: DefaultValuesInit.Select,
                FrecuenciaPago: Selects.SelectPago,
                TipoMoneda: Selects.SelectMoneda,
                SioNo: Selects.SelectSioNo,
                EstadoPoliza: Selects.SelectEstadoPoliza
            };

            $scope.TipoPolizaList = $scope.HtmlOptions.TipoPolizaByAseguradora[0];
            $scope.TipoPolizaListForm = $scope.HtmlOptions.TipoPolizaByAseguradoraForm[0];
            $scope.SubtipoPolizaList = $scope.HtmlOptions.SubtipoByTipoPoliza[0];
            $scope.SubtipoPolizaListForm = $scope.HtmlOptions.SubtipoByTipoPolizaForm[0];
            $scope.TipoPlanList = $scope.HtmlOptions.TipoPlanBySubtipo[0];
            $scope.TipoPlanListForm = $scope.HtmlOptions.TipoPlanBySubtipoForm[0];
            $scope.FrecuenciaPagoList = $scope.HtmlOptions.FrecuenciaPago[0];
            $scope.TipoMonedaList = $scope.HtmlOptions.TipoMoneda[0];
            $scope.SioNoList = $scope.HtmlOptions.SioNo[0];
            $scope.EstadoPolizaList = $scope.HtmlOptions.EstadoPoliza[1];

            $scope.SearchByModel();
        });

        $scope.ManualSelect = function () {

            var OptionNaN = { Text: "Seleccione un elemento de la lista", Value: "", Selected: false }
            var OptionNaN2 = { Text: "Todos", Value: "", Selected: false }

            var SelectPago = [];
            var OptionPago1 = { Text: "Semanal", Value: "Semanal", Selected: false }
            var OptionPago2 = { Text: "Mensual", Value: "Mensual", Selected: false }
            var OptionPago3 = { Text: "Trimestral", Value: "Trimestral", Selected: false }
            var OptionPago4 = { Text: "Cuatrimestral", Value: "Cuatrimestral", Selected: false }
            var OptionPago5 = { Text: "Semestral", Value: "Semestral", Selected: false }
            var OptionPago5 = { Text: "Anual", Value: "Anual", Selected: false }
            SelectPago.push(OptionNaN, OptionPago1, OptionPago2, OptionPago3, OptionPago4, OptionPago5)


            var SelectMoneda = [];
            var OptionMoneda1 = { Text: "DOP", Value: "DOP", Selected: false }
            var OptionMoneda2 = { Text: "USD", Value: "USD", Selected: false }
            SelectMoneda.push(OptionNaN, OptionMoneda1, OptionMoneda2)

            var SelectSioNo = [];
            var OptionSi = { Text: "Si", Value: "Si", Selected: false }
            var OptionNo = { Text: "No", Value: "No", Selected: false }
            SelectSioNo.push(OptionNaN, OptionSi, OptionNo)

            var SelectEstadoPoliza = [];
            var OptionVigente = { Text: "Vigente", Value: "Vigente", Selected: false }
            var OptionNoVigente = { Text: "No vigente", Value: "No vigente", Selected: false }
            SelectEstadoPoliza.push(OptionNaN2, OptionVigente, OptionNoVigente)

            return { SelectPago, SelectMoneda, SelectSioNo, SelectEstadoPoliza };
        }

    }]);