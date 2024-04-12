using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace ProyectOWASP.BusinessLayer
{
    public class Writer
    {
        public string Path { private get; set; }

        public Writer(string path)
        {
            this.Path = path;
        }

        public void Write(string text)
        {

            using (StreamWriter writer = File.AppendText(this.Path))
            {
                writer.WriteLine(text);
            }
        }

    }

    public class LogService
    {
        public string DirectoryPath { get; set; }
        public string FileExtencion { get; set; }
        private string FileName { get; set; }
        private string FullPath { get; set; }


        public LogService()
        {
            this.DirectoryPath = System.IO.Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "Log");
            this.FileExtencion = ".log";
            this.FileName = "Log_" + DateTime.Today.ToString("dd-MM-yyyy") + FileExtencion;
            this.FullPath = System.IO.Path.Combine(DirectoryPath, FileName);
        }

        public LogService(string directoryPath)
        {
            this.DirectoryPath = directoryPath;
            this.FileExtencion = ".log";
            this.FileName = "Log_" + DateTime.Today.ToString("dd-MM-yyyy") + FileExtencion;
            this.FullPath = System.IO.Path.Combine(DirectoryPath, FileName);
        }


        private void Initializer()
        {
            if (!Directory.Exists(this.DirectoryPath))
            {
                Directory.CreateDirectory(this.DirectoryPath);
            }

            this.FileName = "Log_" + DateTime.Today.ToString("dd-MM-yyyy") + this.FileExtencion;
            this.FullPath = System.IO.Path.Combine(this.DirectoryPath, this.FileName);
        }


        public void Write(Exception ex)
        {
            Initializer();
            Writer writer = new Writer(this.FullPath);
            writer.Write("--------------------------------------------------------------------------------------------");
            writer.Write("Error " + DateTime.Now.ToString() + " -----------------------------------------------------------------");
            writer.Write(ex.ToString());
            writer.Write("--------------------------------------------------------------------------------------------");
        }

        public void Write(string text)
        {
            Initializer();
            Writer writer = new Writer(this.FullPath);
            writer.Write(text);
        }

    }
}