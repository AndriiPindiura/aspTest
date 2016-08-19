using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Web;
using System.Web.Mvc;
using UDSasp.Models;

namespace UDSasp.Controllers
{
    [AllowAnonymous]
    public class AuthController : Controller
    {
        // GET: Auth
        [HttpGet]
        public ActionResult LogIn(string returnUrl)
        {
            LogInModel model = new LogInModel
            {
                ReturnUrl = returnUrl
            };
            //string json = System.IO.File.ReadAllText(Server.MapPath(@"~/App_Data/accounts.json"));
            ////Debug.WriteLine(json);
            //Accounts accounts = JsonConvert.DeserializeObject<Accounts>(json);
            //Debug.WriteLine(accounts);

            return View(model);
        }

        [HttpPost]
        public ActionResult LogIn(LogInModel model)
        {
            if (!ModelState.IsValid)
            {
                return View();
            }
            Debug.Write(model.Password);
            Accounts accounts =  JsonConvert.DeserializeObject<Accounts>(System.IO.File.ReadAllText(Server.MapPath(@"~/App_Data/accounts.json")));
            foreach (AccountModel user in accounts.users)
            {
                if (model.Username == user.login && model.Password == user.password)
                {
                    ClaimsIdentity identity = new ClaimsIdentity(new[] { new Claim(ClaimTypes.Name, user.name) }, "ApplicationCookie");
                    var ctx = Request.GetOwinContext();
                    var authManager = ctx.Authentication;
                    authManager.SignIn(identity);
                    return Redirect(GetRedirectUrl(model.ReturnUrl));
                }
            }
            //Debug.WriteLine(accounts);
            return View();
            //if (model.login == )
        }

        private string GetRedirectUrl(string returnUrl)
        {
            if (string.IsNullOrEmpty(returnUrl) || !Url.IsLocalUrl(returnUrl))
            {
                return Url.Action("index", "home");
            }

            return returnUrl;
        }

        public ActionResult LogOut()
        {
            var ctx = Request.GetOwinContext();
            var authManager = ctx.Authentication;

            authManager.SignOut("ApplicationCookie");
            return RedirectToAction("index", "home");
        }


    }
}