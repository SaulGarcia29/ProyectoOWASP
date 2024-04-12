using ProyectOWASP.LocalSecurity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;

namespace ProyectOWASP.Controllers
{
    [Authentication]
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        [HttpPost]
        public ActionResult FetchUrl(string url)
        {
            if (IsUrlSafe(url))
            {
                // La URL es segura, procedemos a hacer la solicitud
                WebClient client = new WebClient();
                string content = client.DownloadString(url);
                ViewBag.Content = content;
            }
            else
            {
                // La URL no es segura, mostramos un mensaje de error
                ViewBag.ErrorMessage = "La URL proporcionada no es segura.";
            }

            return View("Result");
        }

        private bool IsUrlSafe(string url)
        {
            // Implementamos una lógica simple para verificar si la URL comienza con "http://" o "https://"
            return url.StartsWith("http://") || url.StartsWith("https://");
        }
    }
}