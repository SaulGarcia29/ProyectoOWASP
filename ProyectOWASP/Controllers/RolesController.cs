using ProyectOWASP.BusinessLayer;
using ProyectOWASP.DataLayer.Context;
using ProyectOWASP.Models;
using ProyectOWASP.DataLayer.Models;
using System;
using System.Data.Entity;
using System.Linq;
using System.Web.Mvc;
using ProyectOWASP.LocalSecurity;

namespace ProyectOWASP.Controllers
{
    [Authentication]
    public class RolesController : Controller
    {
        LoginService loginService;
        ProyectOWASPContext _DB;
        UsuariosService usuariosService;
        Usuarios UserLogin;
        public HttpResponseData ResponseData { get; set; }

        public RolesController()
        {
            _DB = new ProyectOWASPContext();
            usuariosService = new UsuariosService();
            loginService = new LoginService();
            UserLogin = (Usuarios)Session["Usuario"];
        }

        public ActionResult Index()
        {
            return View();
        }
    }
}