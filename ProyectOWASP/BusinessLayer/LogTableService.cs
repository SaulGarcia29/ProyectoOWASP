using Dapper;
using ProyectOWASP.DataLayer.Access;
using ProyectOWASP.DataLayer.Context;
using ProyectOWASP.DataLayer.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Web;

namespace ProyectOWASP.BusinessLayer
{
    public class LogTableService
    {
        private readonly SqlConnection _connection;
        ProyectOWASPContext _DB;

        public LogTableService()
        {
            _DB = new ProyectOWASPContext();
            string Conexion = ConfigurationManager.ConnectionStrings["ConnectionString"].ConnectionString;
            this._connection = new SqlConnection(Conexion);
        }

        public void InsertLog(int UsuarioId, string Modulo, string Pagina, string Descripcion)
        {
            string hostName = Dns.GetHostName();
            IPAddress[] ipAddresses = Dns.GetHostAddresses(hostName);

            foreach (IPAddress ipAddress in ipAddresses)
            {
                Console.WriteLine(ipAddress.ToString());
            }
            var query = "INSERT INTO LogTable VALUES (@LogDate, @UsuarioId, @Modulo, @Pagina, @Descripcion)";
            var parameters = new { LogDate = DateTime.Now, UsuarioId = UsuarioId, Modulo = Modulo, Pagina = Pagina, Descripcion = Descripcion };
            _connection.Execute(query, parameters);
        }
    }
}