using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace UDSasp.Models
{
    public class UserModel
    {
        public string username { get; set; }
        public UserInfo[] users { get; set; }
    }

    public class UserInfo
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

    public class UserDetails
    {
        public string username { get; set; }
        public UserInfo user { get; set; }
    }
}