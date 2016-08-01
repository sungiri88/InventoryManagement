using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Configuration;
using MySql.Data.MySqlClient;
using MySql.Data.Types;
using System.Data;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json.Converters;
using Newtonsoft.Json;

namespace InventoryManagement
{
    public class DBManager
    {
        public string GetProjectData()
        {
            string commandText = string.Format("SELECT * FROM project_details");
            DataSet ds = MySqlHelper.GetDataSet(MySqlHelper.ConnectionStringManager, commandText);
            string json = JsonConvert.SerializeObject(ds.Tables[0], Formatting.Indented);
            return json;
        }
        public string GetGroupData()
        {
            string commandText = string.Format("SELECT pg.group_id,pd.project_name,pg.group_name,pg.group_variables,pg.is_enabled from project_groups pg join project_details pd on pg.project_id = pd.project_id");
            DataSet ds = MySqlHelper.GetDataSet(MySqlHelper.ConnectionStringManager, commandText);
            string json = JsonConvert.SerializeObject(ds.Tables[0], Formatting.Indented);
            return json;
        }
        public string GetHostData()
        {
            string commandText = string.Format(" select ph.host_id,em.env_name,pd.project_name,pg.group_name,ph.host_name,ph.ip_address,ph.host_variables,ph.is_enabled from "+
                "project_hosts ph join env_master em on ph.env_id = em.env_id join project_groups pg on ph.project_group_id = pg.group_id "+
                "join project_details pd on pd.project_id = pg.project_id");
            DataSet ds = MySqlHelper.GetDataSet(MySqlHelper.ConnectionStringManager, commandText);
            string json = JsonConvert.SerializeObject(ds.Tables[0], Formatting.Indented);
            return json;
        }
    }
}