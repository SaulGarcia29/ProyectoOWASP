using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace ProyectOWASP.DataLayer.Models
{
    public class Roles
    {
        [Key]
        public int RolId { get; set; }
        public string Nombre { get; set; }
    }
}