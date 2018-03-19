using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace DTcms.EFAPI
{
    public class TourAPI
    {
        public static string get_channel_article_news()
        {
            using (var db = new TouristDBEntities())
            {
                return Obj2Json(new
                {
                    data = (from t in db.dt_channel_article_news
                            select new
                            {
                                t.id,
                                t.title,
                                t.img_url
                            }).ToList(),
                    result = 1
                });
            }
        }

        public static string get_holidays()
        {
            var list = new List<HolidayItem>();
            return Obj2Json(list);
        }

        public static string get_channel_article_news_detail(int id)
        {
            using (var db = new TouristDBEntities())
            {
                return Obj2Json(new
                {
                    data = (from t in db.dt_channel_article_news
                            where t.id == id
                            select new
                            {
                                t.id,
                                t.title,
                                t.img_url,
                                t.zhaiyao,
                                t.content,
                                t.update_time
                            }).FirstOrDefault(),
                    result = 1
                });
            }
        }

        public static string get_channel_article_food()
        {
            using (var db = new TouristDBEntities())
            {
                return Obj2Json(new
                {
                    data = (from t in db.dt_channel_article_food
                            select new
                            {
                                t.id,
                                t.title,
                                t.img_url
                            }).ToList(),
                    result = 1
                });
            }
        }

        public static string getOpenId(string code)
        {
            var request = (HttpWebRequest)WebRequest.Create("https://api.weixin.qq.com/sns/jscode2session" +
                "?appid=wx1bb751d7d8712af4&secret=c0efc039a5d26c7e7d402a6c80f3834b" +
                "&js_code=" + code + "&grant_type=authorization_code");
            var response = (HttpWebResponse)request.GetResponse();
            using (var sr = new StreamReader(response.GetResponseStream()))
            {
                string responseString = sr.ReadToEnd();
                var obj = JsonConvert.DeserializeObject<dynamic>(responseString);
                var ret = new
                {
                    obj.openid,
                    obj,
                    result = 1
                };
                return Obj2Json(ret);
            }
        }

        public static string get_channel_article_food_detail(int id)
        {
            using (var db = new TouristDBEntities())
            {
                return Obj2Json(new
                {
                    data = (from t in db.dt_channel_article_food
                            where t.id == id
                            select new
                            {
                                t.id,
                                t.title,
                                t.img_url,
                                t.zhaiyao,
                                t.content,
                                t.update_time
                            }).FirstOrDefault(),
                    result = 1
                });
            }
        }

        public static string get_channel_article_guidance()
        {
            using (var db = new TouristDBEntities())
            {
                return Obj2Json(new
                {
                    data = (from t in db.dt_channel_article_guidance
                            select new
                            {
                                t.id,
                                t.title,
                                t.img_url
                            }).ToList(),
                    result = 1
                });
            }
        }

        public static string get_channel_article_guidance_detail(int id)
        {
            using (var db = new TouristDBEntities())
            {
                return Obj2Json(new
                {
                    data = (from t in db.dt_channel_article_guidance
                            where t.id == id
                            select new
                            {
                                t.id,
                                t.title,
                                t.img_url,
                                t.zhaiyao,
                                t.content,
                                t.update_time
                            }).FirstOrDefault(),
                    result = 1
                });
            }
        }

        private static string Obj2Json(object ret)
        {
            IsoDateTimeConverter iso = new IsoDateTimeConverter();
            iso.DateTimeFormat = "yyyy-MM-dd HH:mm:ss";
            return JsonConvert.SerializeObject(ret, iso);
        }
    }

    public class HolidayItem
    {
        public int id { get; set; }
        public string date { get; set; }
        public string title { get; set; }
        public string brief { get; set; }
        public bool g { get; set; }
        private DateTime dt { get;set; }
    }
}
