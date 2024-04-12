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

        // Método para insertar un registro de log en la base de datos
        public void InsertLog(int UsuarioId, string Modulo, string Pagina, string Descripcion)
        {
            // Define la consulta SQL para insertar el registro de log en la tabla LogTable
            var query = "INSERT INTO LogTable VALUES (@LogDate, @UsuarioId, @Modulo, @Pagina, @Descripcion)";

            // Define los parámetros para la consulta SQL utilizando un objeto anónimo
            var parameters = new
            {
                LogDate = DateTime.Now, 
                UsuarioId = UsuarioId, 
                Modulo = Modulo, 
                Pagina = Pagina, 
                Descripcion = Descripcion
            };

            // Ejecuta la consulta SQL utilizando el objeto de conexión _connection y los parámetros definidos
            _connection.Execute(query, parameters);
        }

    }
}