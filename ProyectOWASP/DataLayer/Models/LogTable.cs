using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace ProyectOWASP.DataLayer.Models
{
    public class LogTable
    {
        [Key]
        public int LogId { get; set; }
        public DateTime LogDate { get; set; }
        public int UsuarioId { get; set; }
        public string Modulo { get; set; }
        public string Pagina { get; set; }
        public string Descripcion { get; set; }
    }
}