using Dapper;
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
    public class LoginService
    {

        private readonly SqlConnection _connection;
        LogTableService LogService;
        ProyectOWASPContext _DB;

        public LoginService()
        {
            LogService = new LogTableService();
            string Conexion = ConfigurationManager.ConnectionStrings["ConnectionString"].ConnectionString;
            this._connection = new SqlConnection(Conexion);
            _DB = new ProyectOWASPContext();
        }
        public Usuarios ValidarUsuario(string UserName, string Password)
        {
            Password = LoginService.EncodePasswordToBase64(Password);
            return _DB.Usuarios.Where(x => x.UserName == UserName && x.Password == Password).FirstOrDefault();
        }

        public static string EncodePasswordToBase64(string password)
        {
            try
            {
                // Convierte la cadena de texto en un arreglo de bytes utilizando la codificación UTF-8
                byte[] encData_byte = new byte[password.Length];
                encData_byte = System.Text.Encoding.UTF8.GetBytes(password);

                // Convierte los bytes en una cadena Base64
                string encodedData = Convert.ToBase64String(encData_byte);
                return encodedData; // Devuelve la cadena Base64 resultante
            }
            catch (Exception ex)
            {
                throw new Exception("Error in base64Encode" + ex.Message); // Manejo de excepciones
            }
        }

        public string DecodeFrom64(string encodedData)
        {
            // Crea un decodificador UTF-8 y un decodificador de caracteres
            System.Text.UTF8Encoding encoder = new System.Text.UTF8Encoding();
            System.Text.Decoder utf8Decode = encoder.GetDecoder();

            // Convierte la cadena Base64 en un arreglo de bytes
            byte[] todecode_byte = Convert.FromBase64String(encodedData);

            // Calcula la cantidad de caracteres resultantes
            int charCount = utf8Decode.GetCharCount(todecode_byte, 0, todecode_byte.Length);

            // Crea un arreglo de caracteres para almacenar los caracteres decodificados
            char[] decoded_char = new char[charCount];

            // Decodifica los bytes en caracteres
            utf8Decode.GetChars(todecode_byte, 0, todecode_byte.Length, decoded_char, 0);

            // Crea una cadena a partir de los caracteres decodificados y la devuelve
            string result = new String(decoded_char);
            return result;
        }
        public Usuarios GetLoginUsuario(string UserName, string Password)
        {
            Usuarios user = new Usuarios();
            string Modulo = "GetLoginUsuario()";
            string Pagina = "Login";

            try
            {
                var query = "SELECT * FROM Usuarios WHERE UserName = @UserName AND Password = @Password";

                var parameters = new { UsuarioId = UserName, Password = Password };

                user = _connection.QueryFirstOrDefault<Usuarios>(query, parameters);

                return user;
            }
            catch (Exception ex)
            {
                LogService.InsertLog(-1, Modulo, Pagina, ex.Message);
                return user;
            }
        }

    }
}