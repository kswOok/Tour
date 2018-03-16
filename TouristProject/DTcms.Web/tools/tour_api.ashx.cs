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
    /// tour_api 的摘要说明
    /// </summary>
    public class tour_api : IHttpHandler
    {
        public void ProcessRequest(HttpContext context)
        {
            string action = DTRequest.GetFormString("action");
            switch (action)
            {
                case "get_holidays":
                    OutPut(context, TourAPI.get_holidays());
                    break;
                case "get_channel_article_news":
                    OutPut(context, TourAPI.get_channel_article_news());
                    break;
                case "get_channel_article_news_detail":
                    OutPut(context, TourAPI.get_channel_article_news_detail(
                        DTRequest.GetFormIntValue("id")));
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