using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Net.Http.Formatting;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace InventoryManagement
{
    public class InventoryController : ApiController
    {
        #region Default API Methods
        // GET api/<controller>
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<controller>/5
        public string Get(int id)
        {
            return id.ToString();
        }
        #endregion
        [HttpGet]
        public HttpResponseMessage GetProjectData()
        {
            string JsonData = (new DBManager()).GetProjectData();
            var response = new HttpResponseMessage()
            {
                Content = new StringContent(JsonData, Encoding.UTF8, "application/json")
            };
            response.Headers.Add("Access-Control-Allow-Origin", "*");
            return response;

        }
        [HttpGet]
        public HttpResponseMessage GetGroupData()
        {
            string JsonData = (new DBManager()).GetGroupData();
            var response = new HttpResponseMessage()
            {
                Content = new StringContent(JsonData, Encoding.UTF8, "application/json")
            };
            response.Headers.Add("Access-Control-Allow-Origin", "*");
            return response;

        }
        [HttpGet]
        public HttpResponseMessage GetHostData()
        {
            string JsonData = (new DBManager()).GetHostData();
            var response = new HttpResponseMessage()
            {
                Content = new StringContent(JsonData, Encoding.UTF8, "application/json")
            };
            response.Headers.Add("Access-Control-Allow-Origin", "*");
            return response;

        }

    }
}
