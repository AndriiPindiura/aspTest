using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace UDSasp.Models
{
    public class PeoplesModel
    {
        public People[] peoples { get; set; }
    }

    public class People
    {
        public string guid { get; set; }
        public string picture { get; set; }
        public string name { get; set; }
        public string gender { get; set; }
        public string company { get; set; }
        public string email { get; set; }
        public string phone { get; set; }
        public string address { get; set; }
        public string about { get; set; }
        public string registered { get; set; }
        public string[] tags { get; set; }
    }
}