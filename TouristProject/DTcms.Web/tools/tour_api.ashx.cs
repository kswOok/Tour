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
            LogHelper.WriteInfo("LINE19:" + action);
            switch (action)
            {
                case "get_holidays":
                    OutPut(context, TourAPI.get_holidays());
                    break;
                case "get_channel_article_news":
                    OutPut(context, TourAPI.get_channel_article_news(1000));
                    break;
                case "get_channel_article_news_top5":
                    OutPut(context, TourAPI.get_channel_article_news(5));
                    break;
                case "get_channel_article_news_detail":
                    OutPut(context, TourAPI.get_channel_article_news_detail(
                        DTRequest.GetFormIntValue("id")));
                    break;
                case "get_channel_article_goods":
                    OutPut(context, TourAPI.get_channel_article_goods());
                    break;
                case "get_channel_article_goods_detail":
                    OutPut(context, TourAPI.get_channel_article_goods_detail(DTRequest.GetFormIntValue("id")));
                    break;
                case "get_channel_article_content":
                    OutPut(context, TourAPI.get_channel_article_content());
                    break;
                case "get_channel_article_content_detail":
                    OutPut(context, TourAPI.get_channel_article_content_detail(DTRequest.GetFormIntValue("id")));
                    break;
                case "get_channel_article_food":
                    OutPut(context, TourAPI.get_channel_article_food());
                    break;
                case "get_channel_article_food_detail":
                    OutPut(context, TourAPI.get_channel_article_food_detail( DTRequest.GetFormIntValue("id")));
                    break;
                case "get_channel_article_guidance":
                    OutPut(context, TourAPI.get_channel_article_guidance());
                    break;
                case "get_channel_article_guidance_detail":
                    OutPut(context, TourAPI.get_channel_article_guidance_detail(
                        DTRequest.GetFormIntValue("id")));
                    break;
                case "getOpenId":
                    OutPut(context, TourAPI.getOpenId(
                        DTRequest.GetFormString("code")));
                    break;
                case "add_or_update_user":
                    OutPut(context, TourAPI.add_or_update_user(
                        DTRequest.GetFormString("openid"),
                        DTRequest.GetFormString("unionid"),
                        DTRequest.GetFormString("photo"),
                        DTRequest.GetFormIntValue("sex"),
                        DTRequest.GetFormString("nickname"),
                        DTRequest.GetFormIntValue("age"),
                        DTRequest.GetFormString("phone"),
                        DTRequest.GetFormString("interest"),
                        DTRequest.GetFormFloat("latitude", -1),
                        DTRequest.GetFormFloat("longitude", -1),
                        DTRequest.GetFormFloat("accuracy", -1)));
                    break;
                case "get_brand_list":
                    OutPut(context, TourAPI.get_brand_list());
                    break;
                case "get_brand_detail":
                    OutPut(context, TourAPI.get_brand_detail(
                        DTRequest.GetFormIntValue("id")));
                    break;
                case "getAppCard":
                    OutPut(context, TourAPI.getAppCard(
                        DTRequest.GetFormString("card_id")));
                    break;
                case "coupon_query_store":
                    OutPut(context, TourAPI.coupon_query_store());
                    break;
                case "coupon_query_coupon":
                    OutPut(context, TourAPI.coupon_query_coupon(
                        DTRequest.GetFormString("poi_id")));
                    break;
                case "coupon_query_user":
                    OutPut(context, TourAPI.coupon_query_user(
                        DTRequest.GetFormString("unionid")));
                    break;
                case "getUnionId":
                    OutPut(context, TourAPI.getUnionId(
                        DTRequest.GetFormString("session_key"),
                        DTRequest.GetFormString("iv"),
                        DTRequest.GetFormString("encryptedData")));
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