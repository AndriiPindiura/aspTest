using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using UDSasp.Models;

namespace UDSasp.Controllers
{
    public class ApiController : Controller
    {
        // GET: People
        public JsonResult Users(string id)
        {
            UserModel users = JsonConvert.DeserializeObject<UserModel>(System.IO.File.ReadAllText(Server.MapPath(@"~/App_Data/data.json")));
            if (id != null)
            {
                UserInfo user = users.users.First(x => x.guid == id);
                UserDetails result = new UserDetails();
                result.user = user;
                result.username = this.User.Identity.Name;
                return Json(JsonConvert.SerializeObject(result), JsonRequestBehavior.AllowGet);
            }
            
            return Json(JsonConvert.SerializeObject(users.users.Select(x => new {
                x.guid,
                x.name,
                x.company,
                x.email,
                x.phone,
                x.tags
            })), JsonRequestBehavior.AllowGet);
        }
    }
}