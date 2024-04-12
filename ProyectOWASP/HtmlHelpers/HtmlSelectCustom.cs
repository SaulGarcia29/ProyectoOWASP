using ProyectOWASP.DataLayer.Context;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace ProyectOWASP.HtmlHelpers
{
    public class HtmlSelectCustom
    {

        public List<HtmlOption> ListOptions { get; set; }
        public bool HasDefaultOption { get; set; }
        public HtmlOption DefaultOption { get; set; }
        public HtmlOption DefaultOption2 { get; set; }
        public HtmlOption DefaultOption3 { get; set; }
        public HtmlOptionString DefaultOption4 { get; set; }

        public SqlConnection connection;
        private ProyectOWASPContext _DB;

        public HtmlSelectCustom()
        {

            connection = new SqlConnection();
            _DB = new ProyectOWASPContext();

            this.ListOptions = new List<HtmlOption>();
            this.HasDefaultOption = true;
            this.DefaultOption = new HtmlOption { Value = 0, Text = "Seleccione un elemento de la lista" };
            this.DefaultOption2 = new HtmlOption { Value = 0, Text = "Todos" };
            this.DefaultOption3 = new HtmlOption { Value = -1, Text = "Seleccione un elemento de la lista" };
            this.DefaultOption4 = new HtmlOptionString { Value = "", Text = "NINGUNO" };
        }

        public List<HtmlOption> HtmlSelectEstatus()
        {
            var estatus = new Dictionary<int, string>();
            estatus.Add(-1, "Todos");
            estatus.Add(1, "Activos");
            estatus.Add(0, "Inactivos");
            var List = estatus.Select(x => new HtmlOption
            {
                Selected = false,
                Text = x.Value,
                Value = x.Key
            }).ToList();
            return List;
        }


        //PARA MANTENIMIENTOS DE DATOS REGISTRADOS


        public List<HtmlOption> HtmlSelectTipoPoliza()
        {
            var List = _DB.Roles.Select(x => new HtmlOption
            {
                Selected = false,
                Text = x.Nombre,
                Value = x.RolId
            }).OrderBy(x => x.Text).ToList();
            return FillListOption(List, 1);
        }

        public List<HtmlOption> HtmlSelectTipoDocumento()
        {
            var estatus = new Dictionary<int, string>();
            estatus.Add(1, "Cedula");
            estatus.Add(2, "Pasaporte");
            estatus.Add(3, "RNC");
            var List = estatus.Select(x => new HtmlOption
            {
                Selected = false,
                Text = x.Value,
                Value = x.Key
            }).OrderBy(x => x.Text).ToList();
            return List;
        }

        public List<HtmlOptionString> HtmlSelectSexo()
        {
            var estatus = new Dictionary<string, string>();
            estatus.Add("Femenino", "Femenino");
            estatus.Add("Masculino", "Masculino");
            var List = estatus.Select(x => new HtmlOptionString
            {
                Selected = false,
                Text = x.Value,
                Value = x.Key
            }).OrderBy(x => x.Text).ToList();
            return List;
        }

        public List<HtmlOption> HtmlSelectTipoCliente()
        {
            var sexo = new Dictionary<int, string>();
            sexo.Add(1, "Fisico");
            sexo.Add(2, "Juridico");
            var List = sexo.Select(x => new HtmlOption
            {
                Selected = false,
                Text = x.Value,
                Value = x.Key
            }).OrderBy(x => x.Text).ToList();
            return List;
        }

        private List<HtmlOption> FillListOption(List<HtmlOption> data, int op)
        {
            List<HtmlOption> htmlOptions = new List<HtmlOption>();
            if (this.HasDefaultOption && op == 1)
            {
                htmlOptions.Add(this.DefaultOption);
            }
            else
            {
                htmlOptions.Add(this.DefaultOption2);
            }
            htmlOptions.AddRange(data);
            return htmlOptions;
        }

        private List<HtmlOptionString> FillListOptionString(List<HtmlOptionString> data)
        {
            List<HtmlOptionString> htmlOptions = new List<HtmlOptionString>();
            htmlOptions.Add(this.DefaultOption4);
            htmlOptions.AddRange(data);
            return htmlOptions;
        }

        public class HtmlOption
        {
            public decimal Value { get; set; }
            public string Text { get; set; }
            public bool Selected { get; set; }

            public HtmlOption()
            {
                this.Selected = false;
            }
        }

        public class HtmlOptionString
        {
            public string Value { get; set; }
            public string Text { get; set; }
            public bool Selected { get; set; }

            public HtmlOptionString()
            {
                this.Selected = false;
            }
        }

        public class HtmlOptionBool
        {
            public bool Value { get; set; }
            public string Text { get; set; }
            public bool Selected { get; set; }

            public HtmlOptionBool()
            {
                this.Selected = false;
            }
        }
    }
}