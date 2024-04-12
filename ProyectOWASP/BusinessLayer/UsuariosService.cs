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
        ProyectOWASPContext _DB;

        public UsuariosService()
        {
            LogService = new LogTableService();
            string Conexion = ConfigurationManager.ConnectionStrings["ConnectionString"].ConnectionString;
            this._connection = new SqlConnection(Conexion);
            _DB = new ProyectOWASPContext();
        }
        // Método para agregar un nuevo usuario a la base de datos
        public void AddUsuario(Usuarios data, int UserLoginId)
        {
            // Definición de las variables iniciales de módulo y página para el registro de log
            string Modulo = "AddUsuario()";
            string Pagina = "Usuarios";

            try
            {
                // Consulta SQL parametrizada para insertar un nuevo usuario en la tabla Usuarios
                var query = "INSERT INTO Usuarios VALUES (@Nombre, @Email, @UserName, @Password, @RolId, @Estado, @FechaCreacion)";

                // Parámetros para la consulta SQL con valores proporcionados por el objeto 'data' y valores predeterminados
                var parameters = new { Nombre = data.Nombre, Email = data.Email, UserName = data.UserName, Password = data.Password, RolId = data.RolId, Estado = true, FechaCreacion = DateTime.Now };

                // Ejecución de la consulta SQL utilizando Dapper para prevenir la inyección de código SQL
                _connection.Execute(query, parameters);
            }
            catch (Exception ex)
            {
                // Si ocurre una excepción, se registra el error en el log de la aplicación
                LogService.InsertLog(UserLoginId, Modulo, Pagina, ex.Message);
                return;
            }
        }

        // Método para actualizar un usuario existente en la base de datos
        public void UpdateUsuario(Usuarios data, int UserLoginId)
        {
            // Definición de las variables iniciales de módulo y página para el registro de log
            string Modulo = "UpdateUsuario()";
            string Pagina = "Usuarios";

            try
            {
                // Consulta SQL parametrizada para actualizar un usuario en la tabla Usuarios
                var query = "UPDATE Usuarios SET (Nombre = @Nombre, Email = @Email, UserName = @UserName, Password = @Password, RolId = @RolId, Estado = @Estado) WHERE UsuarioId = @UsuarioId";

                // Parámetros para la consulta SQL con valores proporcionados por el objeto 'data'
                var parameters = new { UsuarioId = data.UsuarioId, Email = data.Email, UserName = data.UserName, Password = data.Password, RolId = data.RolId, Estado = data.Estado };

                // Ejecución de la consulta SQL utilizando Dapper para prevenir la inyección de código SQL
                _connection.Execute(query, parameters);
            }
            catch (Exception ex)
            {
                // Si ocurre una excepción, se registra el error en el log de la aplicación
                LogService.InsertLog(UserLoginId, Modulo, Pagina, ex.Message);
                return;
            }
        }

        // Método para obtener un usuario de la base de datos por su ID
        public Usuarios GetUsuario(int UsuarioId, int UserLoginId)
        {
            // Definición de las variables iniciales de usuario, módulo y página para el registro de log
            Usuarios user = new Usuarios();
            string Modulo = "GetUsuario()";
            string Pagina = "Usuarios";

            try
            {
                // Consulta SQL parametrizada para seleccionar un usuario de la tabla Usuarios por su ID
                var query = "SELECT * FROM Usuarios WHERE UsuarioId = @UsuarioId";

                // Parámetros para la consulta SQL con el ID de usuario proporcionado
                var parameters = new { UsuarioId = UsuarioId };

                // Ejecución de la consulta SQL utilizando Dapper para prevenir la inyección de código SQL
                user = _connection.QueryFirstOrDefault<Usuarios>(query, parameters);

                // Devuelve el usuario encontrado
                return user;
            }
            catch (Exception ex)
            {
                // Si ocurre una excepción, se registra el error en el log de la aplicación y se devuelve un usuario vacío
                LogService.InsertLog(UserLoginId, Modulo, Pagina, ex.Message);
                return user;
            }
        }

    }
}