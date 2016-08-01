using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Routing;

namespace InventoryManagement
{
    public class Global : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            GlobalConfiguration.Configuration.Routes.MapHttpRoute(
            name: "AppControllerAPI_WithAction",
            routeTemplate: "{Controller}/{action}/{id}",
            defaults: new { controller = "AppController", id = RouteParameter.Optional }
            );
            GlobalConfiguration.Configuration.Routes.MapHttpRoute(
            name: "AppControllerAPI_WithoutAction",
            routeTemplate: "{Controller}/{action}/",
            defaults: new { controller = "AppController", action = RouteParameter.Optional }
            );
        }
    }
}
