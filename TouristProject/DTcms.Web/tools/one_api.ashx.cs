using DTcms.Common;
using DTcms.EFAPI;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;

namespace DTcms.Web.tools
{
    /// <summary>
    /// one_api 的摘要说明
    /// </summary>
    public class one_api : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            string action = DTRequest.GetFormString("action");
            LogHelper.WriteInfo("LINE19:" + action);
            switch (action)
            {
                case "test":
                    OutPut(context, OneAPI.test());
                    break;
                default:
                    OutPut(context, "not implement action : " + action);
                    break;
            }
        }

        private void OutPut(HttpContext context, string strContent)
        {
            context.Response.ContentEncoding = Encoding.UTF8;
            context.Response.ContentType = "application/json";
            context.Response.AddHeader("Access-Control-Allow-Origin", "*");
            context.Response.Write(strContent);
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}