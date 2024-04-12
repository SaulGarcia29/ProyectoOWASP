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
    public class UsuariosService
    {

        private readonly SqlConnection _connection;
        LogTableService LogService;

        public UsuariosService()
        {
            LogService = new LogTableService();
            string Conexion = ConfigurationManager.ConnectionStrings["ConnectionString"].ConnectionString;
            this._connection = new SqlConnection(Conexion);
        }

        public void AddUsuario(Usuarios data, int UserLoginId)
        {
            #region Variables iniciales
            string Modulo = "AddUsuario()";
            string Pagina = "Usuarios";
            #endregion

            try
            {
                var query = "INSERT INTO Usuarios VALUES (@Nombre, @Email, @UserName, @Password, @RolId, @Estado, @FechaCreacion)";
                var parameters = new {Nombre = data.Nombre, Email = data.Email, UserName = data.UserName, Password = data.Password, RolId = data.RolId, Estado = true, FechaCreacion = DateTime.Now };
                _connection.Execute(query, parameters);
            }
            catch (Exception ex)
            {
                LogService.InsertLog(UserLoginId, Modulo, Pagina, ex.Message);
                return;
            }
        }

        public void UpdateUsuario(Usuarios data, int UserLoginId)
        {
            #region Variables iniciales
            string Modulo = "UpdateUsuario()";
            string Pagina = "Usuarios";
            #endregion

            try
            {
                var query = "UPDATE Usuarios SET (Nombre = @Nombre, Email = @Email, UserName = @UserName, Password = @Password, RolId = @RolId, Estado = @Estado) WHERE UsuarioId = @UsuarioId";
                var parameters = new {UsuarioId = data.UsuarioId, Email = data.Email, UserName = data.UserName, Password = data.Password, RolId = data.RolId, Estado = data.Estado };
                _connection.Execute(query, parameters);
            }
            catch (Exception ex)
            {
                LogService.InsertLog(UserLoginId, Modulo, Pagina, ex.Message);
                return;
            }
        }

        public Usuarios GetUsuario(int UsuarioId, int UserLoginId)
        {
            #region Variables iniciales
            Usuarios user = new Usuarios();
            string Modulo = "GetUsuario()";
            string Pagina = "Usuarios";
            #endregion
            try
            {
                var query = "SELECT * FROM Usuarios WHERE UsuarioId = @UsuarioId";
                var parameters = new { UsuarioId = UsuarioId };
                user = _connection.QueryFirstOrDefault<Usuarios>(query, parameters);
                return user;
            }
            catch (Exception ex)
            {
                LogService.InsertLog(UserLoginId, Modulo, Pagina, ex.Message);
                return user;
            }
        }
    }
}