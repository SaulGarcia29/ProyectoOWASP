using Dapper;
using ProyectOWASP.DataLayer.Access;
using ProyectOWASP.DataLayer.Context;
using ProyectOWASP.DataLayer.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace ProyectOWASP.BusinessLayer
{
    public class RolService
    {
        private readonly SqlConnection _connection;
        LogTableService LogService;

        public RolService()
        {
            LogService = new LogTableService();
            string Conexion = ConfigurationManager.ConnectionStrings["ConnectionString"].ConnectionString;
            this._connection = new SqlConnection(Conexion);
        }

        public void AddRol(Roles data, int UserLoginId)
        {
            #region Variables iniciales
            string Modulo = "AddRol()";
            string Pagina = "Roles";
            #endregion

            try
            {
                var query = "INSERT INTO Roles VALUES (@Nombre)";
                var parameters = new { Nombre = data.Nombre };
                _connection.Execute(query, parameters);
            }
            catch (Exception ex)
            {
                LogService.InsertLog(UserLoginId, Modulo, Pagina, ex.Message);
                return;
            }
        }

        public void UpdateRol(Roles data, int UserLoginId)
        {
            #region Variables iniciales
            string Modulo = "UpdateRol()";
            string Pagina = "Roles";
            #endregion

            try
            {
                var query = "UPDATE Roles SET (Nombre = @Nombre) WHERE RolId = @RolId";
                var parameters = new { RolId = data.RolId, Nombre = data.Nombre };
                _connection.Execute(query, parameters);
            }
            catch (Exception ex)
            {
                LogService.InsertLog(UserLoginId, Modulo, Pagina, ex.Message);
                return;
            }
        }

        public void DeleteRol(Roles data, int UserLoginId)
        {
            #region Variables iniciales
            string Modulo = "DeleteRol()";
            string Pagina = "Roles";
            #endregion

            try
            {
                var query = "DELETE Roles WHERE RolId = @RolId";
                var parameters = new { RolId = data.RolId };
                _connection.Execute(query, parameters);
            }
            catch (Exception ex)
            {
                LogService.InsertLog(UserLoginId, Modulo, Pagina, ex.Message);
                return;
            }
        }
    }
}