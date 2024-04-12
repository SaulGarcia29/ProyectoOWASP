using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ProyectOWASP.Models
{
    public class HttpResponseData
    {
        public ResponseType ResponseType { get; set; }
        public ResponseMessage Message { get; set; }
        public object Data { get; set; }

        public HttpResponseData()
        {
            this.Message = new ResponseMessage();
        }

        public HttpResponseData(ResponseType responseType)
        {
            this.Message = new ResponseMessage();
            this.ResponseType = responseType;
        }

        public HttpResponseData(ResponseType responseType, string messageTilte, string messageContent, object result = null)
        {

            this.ResponseType = responseType;
            this.Message = new ResponseMessage
            {
                Message = messageContent,
                Title = messageTilte
            };
            this.Data = result;
        }



        public static HttpResponseData Error(Exception ex)
        {


            HttpResponseData response = new HttpResponseData
            {
                ResponseType = ResponseType.error
            };

            response.Message = new ResponseMessage { Title = "Error" };

            if (ex.InnerException != null)
            {
                response.Message.Message = ex.InnerException.Message;

                if (ex.InnerException.InnerException != null)
                {
                    response.Message.Message = ex.InnerException.InnerException.Message;
                }

            }




            return new HttpResponseData
            {
                ResponseType = ResponseType.error,
                Message = new ResponseMessage
                {
                    Message = (ex.InnerException != null) ? ex.InnerException.Message : ex.Message,
                    Title = "Error"
                }

            }; ;
        }

        public static HttpResponseData IsAdded(object data = null)
        {
            return new HttpResponseData
            {
                ResponseType = ResponseType.isAdded,
                Message = new ResponseMessage
                {
                    Message = "Ya existe un registro con estos datos.",
                    Title = "Agregar Registro"
                },
                Data = data
            }; ;
        }

        public static HttpResponseData AccessDenied()
        {
            return new HttpResponseData
            {
                ResponseType = ResponseType.accesDenied,
                Message = new ResponseMessage
                {
                    Message = "Usted no tiene los permsisos suficiente para realizar esta accion.",
                    Title = "Mensaje de Autorizacion"
                }

            }; ;
        }

        public static HttpResponseData SessionExpired()
        {
            return new HttpResponseData
            {
                ResponseType = ResponseType.sessionExpired,
                Message = new ResponseMessage
                {
                    Message = "Su sesion ha expirado, por favor vuelva a iniciar sesion.",
                    Title = "Sesion Expirada"
                }

            }; ;
        }

        public static HttpResponseData ForeignKeyRelationship()
        {
            return new HttpResponseData
            {
                ResponseType = ResponseType.fkrelation,
                Message = new ResponseMessage
                {
                    Message = "Este registro no puede ser eliminado. Existen relaciones con otras dependencias.",
                    Title = "Eliminar Registro"
                }

            }; ;
        }

        public static HttpResponseData SuccessDataSend(object data = null)
        {
            return new HttpResponseData
            {
                ResponseType = ResponseType.success,
                Message = new ResponseMessage
                {
                    Message = "Datos enviados Correctamente",
                    Title = "Envio de datos"
                },
                Data = data

            }; ;
        }



        public static HttpResponseData SuccessAdded(object data = null)
        {
            return new HttpResponseData
            {
                ResponseType = ResponseType.success,
                Message = new ResponseMessage
                {
                    Message = "Registro agregado Correctamente",
                    Title = "Agregar Registro"
                },
                Data = data

            }; ;
        }

        public static HttpResponseData SuccessDelete(object data = null)
        {
            return new HttpResponseData
            {
                ResponseType = ResponseType.success,
                Message = new ResponseMessage
                {
                    Message = "Registro eliminado Correctamente",
                    Title = "Eliminar Registro"
                },
                Data = data

            }; ;
        }


        public static HttpResponseData SuccessUpdate(object data = null)
        {
            return new HttpResponseData
            {
                ResponseType = ResponseType.success,
                Message = new ResponseMessage
                {
                    Message = "Registro editado Correctamente",
                    Title = "Editar Registro"
                },
                Data = data

            }; ;
        }

        public static HttpResponseData CreateMessage(string Title, string Message, int ResponseT)
        {
            return new HttpResponseData
            {
                ResponseType = (ResponseType)ResponseT,
                Message = new ResponseMessage
                {
                    Message = Message,
                    Title = Title
                }
            }; ;
        }
    }

    public enum ResponseType
    {
        success = 1,
        error = 2,
        accesDenied = 3,
        isAdded = 4,
        fkrelation = 5,
        notSucces = 6,
        sessionExpired = 7
    }

    public class ResponseMessage
    {
        public string Title { get; set; }
        public string Message { get; set; }
    }
}