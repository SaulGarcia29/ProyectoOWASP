using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace ProyectOWASP.BusinessLayer
{
    // Clase Writer: Se encarga de escribir texto en un archivo
    public class Writer
    {
        // Propiedad para almacenar la ruta del archivo
        public string Path { private get; set; }

        // Constructor que recibe la ruta del archivo
        public Writer(string path)
        {
            this.Path = path;
        }

        // Método para escribir texto en el archivo
        public void Write(string text)
        {
            // Utiliza un bloque using para asegurar que el StreamWriter se cierre correctamente
            using (StreamWriter writer = File.AppendText(this.Path))
            {
                // Escribe el texto en el archivo y agrega un salto de línea
                writer.WriteLine(text);
            }
        }
    }

    // Clase LogService: Se encarga de gestionar el registro de eventos en un archivo de registro
    public class LogService
    {
        // Propiedades para almacenar la ruta del directorio, la extensión del archivo y el nombre del archivo
        public string DirectoryPath { get; set; }
        public string FileExtencion { get; set; }
        private string FileName { get; set; }
        private string FullPath { get; set; }

        // Constructor por defecto que inicializa las propiedades con valores predeterminados
        public LogService()
        {
            this.DirectoryPath = System.IO.Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "Log");
            this.FileExtencion = ".log";
            this.FileName = "Log_" + DateTime.Today.ToString("dd-MM-yyyy") + FileExtencion;
            this.FullPath = System.IO.Path.Combine(DirectoryPath, FileName);
        }

        // Constructor que recibe la ruta del directorio personalizada
        public LogService(string directoryPath)
        {
            this.DirectoryPath = directoryPath;
            this.FileExtencion = ".log";
            this.FileName = "Log_" + DateTime.Today.ToString("dd-MM-yyyy") + FileExtencion;
            this.FullPath = System.IO.Path.Combine(DirectoryPath, FileName);
        }

        // Método privado para inicializar el archivo de registro
        private void Initializer()
        {
            // Verifica si el directorio no existe y lo crea
            if (!Directory.Exists(this.DirectoryPath))
            {
                Directory.CreateDirectory(this.DirectoryPath);
            }

            // Asigna el nombre del archivo y la ruta completa
            this.FileName = "Log_" + DateTime.Today.ToString("dd-MM-yyyy") + this.FileExtencion;
            this.FullPath = System.IO.Path.Combine(this.DirectoryPath, this.FileName);
        }

        // Método para escribir un mensaje de error y la información de la excepción en el archivo de registro
        public void Write(Exception ex)
        {
            // Inicializa el archivo de registro
            Initializer();
            // Crea una instancia de Writer y escribe el mensaje de error y la excepción en el archivo
            Writer writer = new Writer(this.FullPath);
            writer.Write("--------------------------------------------------------------------------------------------");
            writer.Write("Error " + DateTime.Now.ToString() + " -----------------------------------------------------------------");
            writer.Write(ex.ToString());
            writer.Write("--------------------------------------------------------------------------------------------");
        }

        // Método para escribir un texto en el archivo de registro
        public void Write(string text)
        {
            // Inicializa el archivo de registro
            Initializer();
            // Crea una instancia de Writer y escribe el texto en el archivo
            Writer writer = new Writer(this.FullPath);
            writer.Write(text);
        }
    }

}