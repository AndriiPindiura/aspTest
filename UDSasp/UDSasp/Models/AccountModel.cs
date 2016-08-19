using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace UDSasp.Models
{
    public class AccountModel
    {
        public string login { get; set; }
        public string password { get; set; }
        public string name { get; set; }
    }

    public class Accounts
    {
        public AccountModel[] users { get; set; }
    }
}