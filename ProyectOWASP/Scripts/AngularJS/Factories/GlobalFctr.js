ProjectOWASP.factory('GlobalFctr', ['$http', '$q', '$mdDialog', function ($http, $q, $mdDialog) {

    var Add = function (url, formData) {
        var defered = $q.defer();
        var promise = defered.promise;

        $http.post(url, formData)
            .then(function (response) {
                defered.resolve(response.data);
            });

        return promise;
    };

    var ProgressBar =
    {
        Visible: false
    };

    var Add = function (url, formData) {
        var defered = $q.defer();
        var promise = defered.promise;

        $http.post(url, formData)
            .then(function (response) {
                defered.resolve(response.data);
            });

        return promise;
    };


    var Update = function (url, formData) {
        var defered = $q.defer();
        var promise = defered.promise;

        ProgressBar.Visible = true;

        $http.post(url, formData)
            .then(function (response) {
                defered.resolve(response.data);
                ProgressBar.Visible = false;
            });
        return promise;
    }

    var Delete = function (url, data) {

        var defered = $q.defer();
        var promise = defered.promise;
        ProgressBar.Visible = true;

        var content =
        {
            Message: '¿Esta seguro de activar/desactivar el registro seleccionado?',
            Title: 'Activar/Desactivar registro'
        };


        var ok = ShowCustomDialogConfirm(content);
        ok.then(function (result) {

            if (result) {

                $http.post(url, data)
                    .then(function (response) {
                        defered.resolve(response.data);
                        ProgressBar.Visible = false;
                    });
            }

        });
        return promise;
    }

    var FinalizarCaso = function (url, data) {

        var defered = $q.defer();
        var promise = defered.promise;
        ProgressBar.Visible = true;

        var content =
        {
            Message: '¿Desea finalizar este caso?',
            Title: 'Finalización caso'
        };


        var ok = ShowCustomDialogConfirm(content);
        ok.then(function (result) {

            if (result) {

                $http.post(url, data)
                    .then(function (response) {
                        defered.resolve(response.data);
                        ProgressBar.Visible = false;
                    });
            }

        });
        return promise;
    }


    var MessageModal = {
        Message: null,
        Title: null
    };

    var ShowCustomDialogConfirm = function (obj) {

        var defered = $q.defer();
        var promise = defered.promise;

        obj = obj || {};
        obj.Message = obj.Message || 'Mensaje';
        obj.Title = obj.Title || 'Titulo';

        MessageModal.Message = obj.Message;
        MessageModal.Title = obj.Title;

        $mdDialog.show({
            templateUrl: baseUrl + '/Scripts/AngularJS/Template/ModalDialogDelete.Html ',
            parent: angular.element(document.body),
            clickOutsideToClose: true,
            escapeToClose: false,
            controller: 'CustomMessageModalDialogCtrl',
        }).then(function (result) {
            defered.resolve(result);
        })

        return promise;
    }

    var ShowCustomDialogAgree = function (obj) {

        var defered = $q.defer();
        var promise = defered.promise;

        obj = obj || {};
        obj.Message = obj.Message || 'Mensaje';
        obj.Title = obj.Title || 'Titulo';

        MessageModal.Message = obj.Message;
        MessageModal.Title = obj.Title;

        $mdDialog.show({
            templateUrl: baseUrl + '/Scripts/AngularJS/Template/ModalDialogAgree.Html ',
            parent: angular.element(document.body),
            clickOutsideToClose: true,
            escapeToClose: false,
            controller: 'CustomMessageModalDialogCtrl',
        }).then(function (result) {
            defered.resolve(result);
        })

        return promise;
    }

    var Request = function (url, data) {

        var defered = $q.defer();
        var promise = defered.promise;
        ProgressBar.Visible = true;

        $http.post(url, data)
            .then(function (response) {
                defered.resolve(response.data);
                ProgressBar.Visible = false;
            })

        return promise;
    }

    var message = function (data) {

        var defered = $q.defer();
        var promise = defered.promise;

        var content =
        {
            Message: data.Message.Message,
            Title: data.Message.Title
        };

        var ok = ShowCustomDialogConfirm(content);
        ok.then(function (result) {
            defered.resolve(result);
        });

        return promise;

    }

    var ResponseManagement = function (response, cases) {

        cases = cases || null;

        if (cases != null) {
            cases.case1 = cases.case1 || null;
            cases.case2 = cases.case2 || null;
            cases.case3 = cases.case3 || null;
            cases.case4 = cases.case4 || null;
            cases.case5 = cases.case5 || null;
            cases.case6 = cases.case6 || null;
            cases.case7 = cases.case7 || null;
        }
        else if (cases == null) {
            cases = {
                case1: null,
                case2: null,
                case3: null,
                case4: null,
                case5: null,
                case6: null,
                case7: null,
            }
        }


        var message = function (data) {

            var defered = $q.defer();
            var promise = defered.promise;

            var content =
            {
                Message: data.Message.Message,
                Title: data.Message.Title
            };

            var ok = ShowCustomDialogConfirm(content);
            ok.then(function (result) {
                defered.resolve(result);
            });

            return promise;

        }


        switch (response.ResponseType) {

            /*Success*/
            case 1:
                if (cases.case1 == null) {
                    return message(response);
                }
                else {
                    var result = cases.case1(response);
                    return result;
                }
                break;
            /*Error*/
            case 2:
                if (cases.case2 == null) {
                    return message(response);
                }
                else {
                    var result = cases.case2(response);
                    return result;
                }
                break;
            /*AccesDenied*/
            case 3:
                if (cases.case3 == null) {
                    return message(response);
                }
                else {
                    var result = cases.case3(response);
                    return result;
                }
                break;
            /*IsAdded*/
            case 4:
                if (cases.case4 == null) {
                    return message(response);
                }
                else {
                    var result = cases.case4(response);
                    return result;
                }
                break;
            /*Foreig Key Relationship*/
            case 5:
                if (cases.case5 == null) {
                    return message(response);
                }
                else {
                    var result = cases.case5(response);
                    return result;
                }
                break;
            /*Not Success*/
            case 6:
                if (cases.case6 == null) {
                    return message(response);
                }
                else {
                    var result = cases.case6(response);
                    return result;
                }
                break;
            /*Session expired*/
            case 7:
                if (cases.case7 == null) {
                    return message(response);
                }
                else {
                    var result = cases.case7(response);
                    return result;
                }
                break;
        }
    }

    return {
        Add: Add,
        Update: Update,
        ResponseManagement: ResponseManagement,
        Delete: Delete,
        Request: Request,
        ShowCustomDialogConfirm: ShowCustomDialogConfirm,
        MessageModal: MessageModal,
        ProgressBar: ProgressBar,
        ShowCustomDialogAgree: ShowCustomDialogAgree,
        FinalizarCaso: FinalizarCaso
    };
}]);

ProjectOWASP.factory('HtmlOptionData', ['$http', '$q', 'HtmlOptionsUrl', function ($http, $q, HtmlOptionsUrl) {
    var Estatus = function () {
        var defered = $q.defer();
        var promise = defered.promise;

        $http.post(HtmlOptionsUrl.Estatus)
            .then(function (response) {
                defered.resolve(response.data);
            });

        return promise;
    }

    var TipoPolizas = function () {
        var defered = $q.defer();
        var promise = defered.promise;

        $http.post(HtmlOptionsUrl.TipoPolizas)
            .then(function (response) {
                defered.resolve(response.data);
            });

        return promise;
    }

    var SubTipoPolizas = function () {
        var defered = $q.defer();
        var promise = defered.promise;

        $http.post(HtmlOptionsUrl.SubTipoPolizas)
            .then(function (response) {
                defered.resolve(response.data);
            });

        return promise;
    }

    var TipoPlan = function () {
        var defered = $q.defer();
        var promise = defered.promise;

        $http.post(HtmlOptionsUrl.TipoPlan)
            .then(function (response) {
                defered.resolve(response.data);
            });

        return promise;
    }

    var Aseguradoras = function () {
        var defered = $q.defer();
        var promise = defered.promise;

        $http.post(HtmlOptionsUrl.Aseguradoras)
            .then(function (response) {
                defered.resolve(response.data);
            });

        return promise;
    }

    var Clientes = function () {
        var defered = $q.defer();
        var promise = defered.promise;

        $http.post(HtmlOptionsUrl.Clientes)
            .then(function (response) {
                defered.resolve(response.data);
            });

        return promise;
    }

    var TipoPolizaByAseguradora = function (id) {
        var defered = $q.defer();
        var promise = defered.promise;

        $http.post(HtmlOptionsUrl.TipoPolizaByAseguradora, { id: id })
            .then(function (response) {
                defered.resolve(response.data);
            });

        return promise;
    }

    var SubtipoPolizaByTipoPoliza = function (id) {
        var defered = $q.defer();
        var promise = defered.promise;

        $http.post(HtmlOptionsUrl.SubtipoPolizaByTipoPoliza, { id: id })
            .then(function (response) {
                defered.resolve(response.data);
            });

        return promise;
    }

    var Provincias = function () {
        var defered = $q.defer();
        var promise = defered.promise;

        $http.post(HtmlOptionsUrl.Provincias)
            .then(function (response) {
                defered.resolve(response.data);
            });

        return promise;
    }

    var Municipios = function (id) {
        var defered = $q.defer();
        var promise = defered.promise;

        $http.post(HtmlOptionsUrl.Municipios, { id: id })
            .then(function (response) {
                defered.resolve(response.data);
            });

        return promise;
    }

    var Sexo = function () {
        var defered = $q.defer();
        var promise = defered.promise;

        $http.post(HtmlOptionsUrl.Sexo)
            .then(function (response) {
                defered.resolve(response.data);
            });

        return promise;
    }

    var TipoDocumento = function () {
        var defered = $q.defer();
        var promise = defered.promise;

        $http.post(HtmlOptionsUrl.TipoDocumento)
            .then(function (response) {
                defered.resolve(response.data);
            });

        return promise;
    }

    var TipoCliente = function () {
        var defered = $q.defer();
        var promise = defered.promise;

        $http.post(HtmlOptionsUrl.TipoCliente)
            .then(function (response) {
                defered.resolve(response.data);
            });

        return promise;
    }

    var SubtipoByTipoPoliza = function (id) {
        var defered = $q.defer();
        var promise = defered.promise;

        $http.post(HtmlOptionsUrl.SubtipoByTipoPoliza, { id: id })
            .then(function (response) {
                defered.resolve(response.data);
            });

        return promise;
    }

    var TipoPlanBySubtipo = function (id) {
        var defered = $q.defer();
        var promise = defered.promise;

        $http.post(HtmlOptionsUrl.TipoPlanBySubtipo, { id: id })
            .then(function (response) {
                defered.resolve(response.data);
            });

        return promise;
    }

    var TipoDePoliza = function () {
        var defered = $q.defer();
        var promise = defered.promise;

        $http.post(HtmlOptionsUrl.TipoDePoliza)
            .then(function (response) {
                defered.resolve(response.data);
            });

        return promise;
    }

    return {
        Estatus: Estatus,
        TipoPolizas: TipoPolizas,
        SubTipoPolizas: SubTipoPolizas,
        TipoPlan: TipoPlan,
        Aseguradoras: Aseguradoras,
        Clientes: Clientes,
        TipoPolizaByAseguradora: TipoPolizaByAseguradora,
        SubtipoPolizaByTipoPoliza: SubtipoPolizaByTipoPoliza,
        Provincias: Provincias,
        Municipios: Municipios,
        Sexo: Sexo,
        TipoDocumento: TipoDocumento,
        TipoCliente: TipoCliente,
        SubtipoByTipoPoliza: SubtipoByTipoPoliza,
        TipoPlanBySubtipo: TipoPlanBySubtipo,
        TipoDePoliza: TipoDePoliza
    }
}]);