using System;
using ProyectOWASP.Models;
using System.Collections.Generic;
using ProyectOWASP.HtmlHelpers;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ProyectOWASP.LocalSecurity
{
    // Definición de un atributo de autenticación personalizado que hereda de ActionFilterAttribute
    // Este atributo se puede aplicar a métodos o clases y se ejecutará antes de la ejecución de la acción del controlador
    [AttributeUsage(AttributeTargets.Method | AttributeTargets.Class)]
    public class AuthenticationAttribute : ActionFilterAttribute
    {
        // Sobrescribe el método OnActionExecuting para realizar acciones antes de la ejecución de la acción del controlador
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            base.OnActionExecuting(filterContext); // Llama al método base de la clase base

            // Verifica si el usuario no ha iniciado sesión (según la sesión)
            if (!filterContext.HttpContext.Session.IsLogOn())
            {
                // Si la solicitud es para devolver JSON
                if (filterContext.IsReturnJson())
                {
                    // Crea un objeto JsonResult para devolver una respuesta JSON
                    JsonResult jsonResult = new JsonResult();

                    // Crea un objeto HttpResponseData para la respuesta JSON
                    HttpResponseData response = new HttpResponseData();

                    // Asigna el objeto HttpResponseData como datos de la respuesta JSON
                    jsonResult.Data = response;

                    // Establece el comportamiento de solicitud JSON permitiendo obtener
                    jsonResult.JsonRequestBehavior = JsonRequestBehavior.AllowGet;

                    // Establece el resultado del contexto de filtro como el JsonResult y devuelve la acción
                    filterContext.Result = jsonResult;
                    return;
                }
                else // Si no es una solicitud JSON
                {
                    // Redirige al usuario a la página de inicio de sesión
                    filterContext.Result = new RedirectResult("~/Login/LogOut");
                }
            }
        }
    }

}