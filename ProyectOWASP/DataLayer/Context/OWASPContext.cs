using ProyectOWASP.BusinessLayer;
using ProyectOWASP.DataLayer.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Linq;
using System.Web;
using System.Web.Configuration;

namespace ProyectOWASP.DataLayer.Context
{
    public class ProyectOWASPContext : DbContext
    {
        public DbSet<Usuarios> Usuarios { get; set; }
        public DbSet<Roles> Roles { get; set; }
        public DbSet<LogTable> LogTable { get; set; }


        public ProyectOWASPContext()
        {
            LogService w = new LogService();
            try
            {
                string Conexion = WebConfigurationManager.AppSettings["ConnectionString"];
                Database.Connection.ConnectionString = Conexion;
                Database.CommandTimeout = 300;
                //w.Write(Conexion);
            }
            catch (Exception ex)
            {
                w.Write(ex.Message);
            }
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<DecimalPropertyConvention>();
            modelBuilder.Conventions.Add(new DecimalPropertyConvention(18, 5));
        }
    }
}