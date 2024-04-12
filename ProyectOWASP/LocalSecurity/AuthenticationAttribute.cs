using System;
using ProyectOWASP.Models;
using System.Collections.Generic;
using ProyectOWASP.HtmlHelpers;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ProyectOWASP.LocalSecurity
{
    [AttributeUsage(AttributeTargets.Method | AttributeTargets.Class)]
    public class AuthenticationAttribute : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            base.OnActionExecuting(filterContext);

            if (!filterContext.HttpContext.Session.IsLogOn())
            {
                if (filterContext.IsReturnJson())
                {
                    JsonResult jsonResult = new JsonResult();

                    HttpResponseData response = new HttpResponseData();

                    jsonResult.Data = response;
                    jsonResult.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
                    filterContext.Result = jsonResult;
                    return;
                }
                else
                {
                    filterContext.Result = new RedirectResult("~/Login/LogOut");
                }
            }
        }
    }
}