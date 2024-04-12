using ProyectOWASP.DataLayer.Context;
using ProyectOWASP.HtmlHelpers;
using ProyectOWASP.Models;
using ProyectOWASP.BusinessLayer;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ProyectOWASP.Controllers
{
    public class LoginController : Controller
    {
        ProyectOWASPContext _DB;
        public HttpResponseData ResponseData { get; set; }
        LoginService LoginService;

        public LoginController()
        {
            _DB = new ProyectOWASPContext();
            LoginService = new LoginService();
        }

        public ActionResult LogIn()
        {
            return View();
        }

        [HttpPost]
        public ActionResult LogIn(string UserName, string Password)
        {
            try
            {
                using (ProyectOWASPContext db = new ProyectOWASPContext())
                {
                    //var AdminId = _LoginService.GetIdAdmin();
                    //var login = LoginService.ValidarUsuario(Nombre, Password);
                    Password = LoginService.EncodePasswordToBase64(Password);
                    var login = db.Usuarios.Where(x => x.UserName == UserName && x.Password == Password).FirstOrDefault();
                    if (login != null)
                    {
                        Session.LoginUser(login);
                        Session["Usuario"] = login;
                        return RedirectToAction("Index", "Home");
                    }
                    else
                    {
                        ViewBag.error = "Usuario y/o contraseña invalida";
                        return View();
                    }
                }
            }
            catch (Exception ex)
            {
                return View(ex);
            }
        }

        public ActionResult LogOut()
        {
            Session.Abandon();
            return RedirectToAction("LogIn");
        }
    }
}