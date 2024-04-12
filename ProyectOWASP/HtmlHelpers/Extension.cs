using System;
using ProyectOWASP.Models;
using System.Collections.Generic;
using System.Reflection;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ProyectOWASP.DataLayer.Models;

namespace ProyectOWASP.HtmlHelpers
{
    // Clase que contiene métodos de extensión para diferentes funcionalidades relacionadas con la autenticación y la sesión del usuario
    public static class Extension
    {
        // Campo estático que define el nombre de la clave para almacenar el usuario en la sesión
        public static string UserLog = "UserLog";
        // Campo estático que define el nombre de la clave para almacenar la llave de registro en la sesión
        public static string KeyLog = "KeyLog";

        // Método de extensión que determina si la acción debe devolver una respuesta JSON
        public static bool IsReturnJson(this ActionExecutingContext context)
        {
            // Obtiene el nombre de la acción y del controlador
            string actionName = context.ActionDescriptor.ActionName;
            string controllerName = context.ActionDescriptor.ControllerDescriptor.ControllerName;
            // Obtiene el tipo del controlador
            Type controllerType = context.Controller.GetType();

            try
            {
                // Obtiene el tipo de retorno del método de la acción
                Type returnType = controllerType.GetMethod(actionName).ReturnType;
                // Verifica si el tipo de retorno es JsonResult
                return (returnType.Name == "JsonResult");
            }
            catch (AmbiguousMatchException)
            {
                // Si hay coincidencias ambiguas, itera sobre los métodos del controlador para determinar el tipo de retorno
                MethodInfo[] methodInfoCollection = controllerType.GetMethods(BindingFlags.Public | BindingFlags.Instance);
                foreach (MethodInfo methodInfo in methodInfoCollection)
                {
                    if (methodInfo.ReturnType != null)
                    {
                        // Si el tipo de retorno es ActionResult, la acción no debe devolver JSON
                        if (methodInfo.ReturnType == typeof(ActionResult))
                        {
                            return false;
                        }
                        // Si el tipo de retorno es JsonResult, la acción debe devolver JSON
                        if (methodInfo.ReturnType == typeof(JsonResult))
                        {
                            return true;
                        }
                    }
                }
            }
            // Si no se encuentra un tipo de retorno adecuado, se devuelve false
            return false;
        }

        // Método de extensión para iniciar sesión de usuario
        public static void LoginUser(this HttpSessionStateBase session, Usuarios usuario)
        {
            // Almacena el usuario en la sesión utilizando la clave definida
            session[UserLog] = usuario;
        }

        // Método de extensión para verificar si el usuario ha iniciado sesión
        public static bool IsLogOn(this HttpSessionStateBase session)
        {
            // Verifica si el usuario está almacenado en la sesión
            if (session[UserLog] != null)
            {
                return true;
            }
            return false;
        }

        // Método de extensión para obtener el usuario que ha iniciado sesión
        public static Usuarios getLoggedUser(this HttpSessionStateBase session)
        {
            // Verifica si el usuario ha iniciado sesión y lo devuelve
            if (session.IsLogOn())
            {
                var result = (Usuarios)session[UserLog];
                return result;
            }
            else
            {
                return null;
            }
        }


        public static string IsSelected(this HtmlHelper html, string controller = null, string action = null)
        {
            string cssClass = "active";
            string currentAction = (string)html.ViewContext.RouteData.Values["action"];
            string currentController = (string)html.ViewContext.RouteData.Values["controller"];

            if (String.IsNullOrEmpty(controller))
                controller = currentController;

            if (String.IsNullOrEmpty(action))
                action = currentAction;

            return controller == currentController && action == currentAction ?
                cssClass : String.Empty;
        }

        public static string IsSelected2(this HtmlHelper html, string controller = null, string action = null)
        {
            string cssClass = "active show-sub";
            string currentAction = (string)html.ViewContext.RouteData.Values["action"];
            string currentController = (string)html.ViewContext.RouteData.Values["controller"];

            if (String.IsNullOrEmpty(controller))
                controller = currentController;

            if (String.IsNullOrEmpty(action))
                action = currentAction;

            return controller == currentController && action == currentAction ? cssClass : String.Empty;
        }

    }
}