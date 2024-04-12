using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ProyectOWASP.DataLayer.Access
{
    public class BaseRepository :  IDisposable
    {
        private readonly SqlConnection _connection;

        public BaseRepository(SqlConnection connection)
        {
            string Conexion = ConfigurationManager.ConnectionStrings["ConnectionString"].ConnectionString;
            this._connection = new SqlConnection(Conexion);
        }

        public void Dispose()
        {
            this._connection?.Dispose();
        }

        public SqlConnection GetConnection()
        {
            return _connection;
        }
        public bool executeDml(SqlCommand query)
        {
            try
            {
                query.ExecuteNonQuery();
                return true;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }


        }

        public DataSet Get(string query)
        {
            try
            {
                _connection.Open();

                DataSet ds = new DataSet();
                SqlDataAdapter adapter = new SqlDataAdapter(query, _connection);
                adapter.Fill(ds);
                _connection.Close();

                return ds;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

        public DataTable LoadData(SqlDataAdapter query)
        {
            try
            {
                DataTable data = new DataTable();
                _connection.Open();

                query.Fill(data);
                //JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
                //List<Dictionary<string, object>> parentRow = new List<Dictionary<string, object>>();
                //Dictionary<string, object> childRow;
                //foreach (DataRow row in data.Rows)
                //{
                //    childRow = new Dictionary<string, object>();
                //    foreach (DataColumn col in data.Columns)
                //    {
                //        childRow.Add(col.ColumnName, row[col]);
                //    }
                //    parentRow.Add(childRow);
                //}

                _connection.Close();

                return data;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }

        }

        internal static T GetValueManageNull<T>(object value)
        {
            if (value == null || value == DBNull.Value || value.ToString() == "")
            {
                return default(T);
            }
            else
            {
                if (value.GetType() == typeof(int) && typeof(T) == typeof(string))
                {
                    object hola = value.ToString();
                    return (T)hola;
                }
                var s = value.GetType();
                return (T)value;
            }
        }

        public string ConvertNullToString(string data)
        {
            if (data == null)
            {
                data = "";
                return data;
            }
            else
            {
                return data;
            }
        }
    }
}