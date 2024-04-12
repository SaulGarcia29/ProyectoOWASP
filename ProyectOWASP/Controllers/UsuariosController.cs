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
    public class UsuariosController : Controller
    {
        LoginService loginService;
        ProyectOWASPContext _DB;
        UsuariosService usuariosService;
        Usuarios UserLogin;
        public HttpResponseData ResponseData { get; set; }

        public UsuariosController()
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

        public JsonResult GetList(int Page, string SearchName)
        {
            try
            {
                var query = _DB.Usuarios.ToList();
                foreach (var item in query)
                {
                    item.Password = loginService.DecodeFrom64(item.Password);
                }
                //int Count = query.Count();
                //int Take = 20;
                //int skip = (Page - 1) * Take;
                //decimal CantPages = Math.Ceiling((Count / (decimal)Take));
                //var result = query.Skip(skip).Take(Take).ToList();
                //var response = new { result, CantPages };
                ResponseData = HttpResponseData.SuccessDataSend(query);
                return Json(ResponseData, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                ResponseData = HttpResponseData.Error(ex);
                return Json(ResponseData, JsonRequestBehavior.DenyGet);
            }
        }

        public JsonResult Create(Usuarios data)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    data.Password = LoginService.EncodePasswordToBase64(data.Password);
                    usuariosService.AddUsuario(data, UserLogin.UsuarioId);
                }
                ResponseData = HttpResponseData.SuccessAdded();
                return Json(ResponseData, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                ResponseData = HttpResponseData.Error(ex);
                return Json(ResponseData, JsonRequestBehavior.DenyGet);
            }
        }

        public JsonResult Update(Usuarios data)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    data.Password = LoginService.EncodePasswordToBase64(data.Password);
                    usuariosService.UpdateUsuario(data, UserLogin.UsuarioId);
                    ResponseData = HttpResponseData.SuccessUpdate();
                    return Json(ResponseData, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    ResponseData = HttpResponseData.AccessDenied();
                    return Json(ResponseData, JsonRequestBehavior.AllowGet);
                }
            }
            catch (Exception ex)
            {
                ResponseData = HttpResponseData.Error(ex);
                return Json(ResponseData, JsonRequestBehavior.DenyGet);
            }
        }

        public JsonResult Activacion_Desactivacion(int? id)
        {
            try
            {
                var data = _DB.Usuarios.SingleOrDefault(x => x.UsuarioId == id);
                data.Estado = data.Estado == true ? false : true;

                if (ModelState.IsValid)
                {
                    _DB.Entry(data).Property(x => x.Estado).IsModified = true;
                    _DB.SaveChanges();
                }
                ResponseData = HttpResponseData.SuccessDataSend(data);
                return Json(ResponseData, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                ResponseData = HttpResponseData.Error(ex);
                return Json(ResponseData, JsonRequestBehavior.AllowGet);

            }
        }

        //public JsonResult GetById(int? Id)
        //{
        //    try
        //    {
        //        var data = _DB.Usuarios.Find(Id);
        //        data.fecha_nacimiento_string = data.fecha_nacimiento.ToString("yyyy-MM-dd  hh:mm:ss");
        //        ResponseData = HttpResponseData.SuccessAdded(data);
        //        return Json(ResponseData, JsonRequestBehavior.AllowGet);
        //    }
        //    catch (Exception ex)
        //    {
        //        ResponseData = HttpResponseData.Error(ex);
        //        return Json(ResponseData, JsonRequestBehavior.DenyGet);
        //    }
        //}
    }
}