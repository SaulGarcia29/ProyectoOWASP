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
    public static class Extension
    {
        public static string UserLog = "UserLog";
        public static string KeyLog = "KeyLog";

        public static bool IsReturnJson(this ActionExecutingContext context)
        {
            string actionName = context.ActionDescriptor.ActionName;
            string controllerName = context.ActionDescriptor.ControllerDescriptor.ControllerName;
            Type controllerType = context.Controller.GetType();

            try
            {
                Type returnType = controllerType.GetMethod(actionName).ReturnType;
                return (returnType.Name == "JsonResult");

            }
            catch (AmbiguousMatchException)
            {
                MethodInfo[] methodInfoCollection = controllerType.GetMethods(BindingFlags.Public | BindingFlags.Instance);
                foreach (MethodInfo methodInfo in methodInfoCollection)
                {
                    if (methodInfo.ReturnType != null)
                    {
                        if (methodInfo.ReturnType == typeof(ActionResult))
                        {
                            return false;
                        }
                        if (methodInfo.ReturnType == typeof(JsonResult))
                        {
                            return true;
                        }
                    }
                }
            }
            return false;
        }

        public static void LoginUser(this HttpSessionStateBase session, Usuarios usuario)
        {
            session[UserLog] = usuario;
        }

        public static bool IsLogOn(this HttpSessionStateBase session)
        {
            if (session[UserLog] != null)
            {
                return true;
            }

            return false;
        }

        public static Usuarios getLoggedUser(this HttpSessionStateBase session)
        {
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