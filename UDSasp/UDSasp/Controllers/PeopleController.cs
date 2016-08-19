using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using UDSasp.Models;

namespace UDSasp.Controllers
{
    public class PeopleController : Controller
    {
        // GET: People
        public JsonResult Index(string id)
        {
            if (id != null)
            {
                return Json(id, JsonRequestBehavior.AllowGet);
            }
            PeoplesModel peoples = JsonConvert.DeserializeObject<PeoplesModel>(System.IO.File.ReadAllText(Server.MapPath(@"~/App_Data/data.json")));
            
            return Json(JsonConvert.SerializeObject(peoples), JsonRequestBehavior.AllowGet);
        }
    }
}