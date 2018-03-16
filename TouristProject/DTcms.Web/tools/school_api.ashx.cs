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
    /// school_api 的摘要说明
    /// </summary>
    public class school_api : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            string action = DTRequest.GetFormString("action");
            switch(action)
            {
                case "updateUser"://更新个人信息
                    OutPut(context, SchoolAPI.updateUser(
                        DTRequest.GetFormString("userId"), 
                        DTRequest.GetFormString("nickName"), 
                        DTRequest.GetFormString("mobile"), 
                        DTRequest.GetFormString("xueli"), 
                        DTRequest.GetFormString("zhuanye"), 
                        DTRequest.GetFormString("age")));
                    break;
                case "getOpenId":
                    OutPut(context, SchoolAPI.getOpenId(
                        DTRequest.GetFormString("code")));
                    break;
                case "register":
                    OutPut(context, SchoolAPI.register(
                        DTRequest.GetFormString("openId"),
                        DTRequest.GetFormString("nickName"),
                        DTRequest.GetFormString("avatarUrl"),
                        DTRequest.GetFormString("sex")));
                    break;
                case "search":
                    OutPut(context, SchoolAPI.search(
                        DTRequest.GetFormString("name"),
                        DTRequest.GetFormString("english")));
                    break;
                case "getSchool":
                    OutPut(context, SchoolAPI.getSchool());
                    break;
                case "getRecord":
                    OutPut(context, SchoolAPI.getRecord(
                        DTRequest.GetFormString("userId")));
                    break;
                case "schoolSearch":
                    OutPut(context, SchoolAPI.schoolSearch(
                        DTRequest.GetFormString("name"),
                        DTRequest.GetFormString("english")));
                    break;
                case "getResult":
                    OutPut(context, SchoolAPI.getResult(
                        DTRequest.GetFormString("recordId")));
                    break;
                case "getSchoolById":
                    OutPut(context, SchoolAPI.getSchoolById(
                        DTRequest.GetFormString("schoolId")));
                    break;
                case "getSchoolDetail":
                    OutPut(context, SchoolAPI.getSchoolDetail(
                        DTRequest.GetFormString("schoolId")));
                    break;
                case "getPicker":
                    OutPut(context, SchoolAPI.getPicker());
                    break;
                case "insertBachelorData"://高中
                    OutPut(context, SchoolAPI.insertBachelorData(
                        DTRequest.GetFormString("userId"), 
                        DTRequest.GetFormString("targetCountry"), 
                        DTRequest.GetFormFloat("GPA", 0), 
                        DTRequest.GetFormString("GPAType"), 
                        DTRequest.GetFormIntValue("language"), 
                        DTRequest.GetFormString("languageType"), 
                        DTRequest.GetFormIntValue("standardization"), 
                        DTRequest.GetFormString("standardizationType"), 
                        DTRequest.GetFormString("toSchool"), 
                        DTRequest.GetFormString("inclination"),
                        DTRequest.GetFormString("graduation"), 
                        DTRequest.GetFormString("rank"), 
                        DTRequest.GetFormString("recommend"), 
                        DTRequest.GetFormString("prize"), 
                        DTRequest.GetFormString("summer"), 
                        DTRequest.GetFormString("volunteer")));
                    break;
                case "insertMasterData"://大学
                    OutPut(context, SchoolAPI.insertMasterData(
                        DTRequest.GetFormString("userId"),
                        DTRequest.GetFormString("targetCountry"),
                        DTRequest.GetFormString("school"),
                        DTRequest.GetFormString("major1"),
                        DTRequest.GetFormString("major2"),
                        DTRequest.GetFormFloat("GPA", 0),
                        DTRequest.GetFormString("GPAType"),
                        DTRequest.GetFormIntValue("language"),
                        DTRequest.GetFormString("languageType"),
                        DTRequest.GetFormIntValue("standardization"),
                        DTRequest.GetFormString("standardizationType"),
                        DTRequest.GetFormString("toSchool"),
                        DTRequest.GetFormString("experience"),
                        DTRequest.GetFormString("paper"),
                        DTRequest.GetFormString("recommendation"),
                        DTRequest.GetFormString("overseas"),
                        DTRequest.GetFormString("practice")));
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