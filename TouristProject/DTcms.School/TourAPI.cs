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

        public static string get_channel_article_news_detail(int id)
        {
            using (var db = new TouristDBEntities())
            {
                var obj = (from t in db.dt_channel_article_news
                           where t.id == id
                           select new
                           {
                               t.id,
                               t.title,
                               t.img_url,
                               t.zhaiyao,
                               t.content,
                               t.update_time
                           }).FirstOrDefault();
                return Obj2Json(new
                {
                    data = new
                    {
                        obj.id,
                        obj.title,
                        obj.img_url,
                        obj.zhaiyao,
                        obj.update_time,
                        content = obj.content.Replace("src=\"/upload", "src=\"http://guomengtech.com/upload")
                    },
                    result = 1
                });
            }
        }

        public static string get_channel_article_goods()
        {
            using (var db = new TouristDBEntities())
            {
                return Obj2Json(new
                {
                    data = (from t in db.dt_channel_article_goods
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

        public static string get_channel_article_goods_detail(int id)
        {
            using (var db = new TouristDBEntities())
            {
                var obj = (from t in db.dt_channel_article_goods
                           where t.id == id
                           select new
                           {
                               t.id,
                               t.title,
                               t.img_url,
                               t.zhaiyao,
                               t.content,
                               t.update_time
                           }).FirstOrDefault();
                return Obj2Json(new
                {
                    data = new
                    {
                        obj.id,
                        obj.title,
                        obj.img_url,
                        obj.zhaiyao,
                        obj.update_time,
                        content = obj.content.Replace("src=\"/upload", "src=\"http://guomengtech.com/upload")
                    },
                    result = 1
                });
            }
        }

        public static string get_holidays()
        {
            var list = new List<HolidayItem>();
            return Obj2Json(list);
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

        public static string get_brand_detail(int id)
        {
            using (var db = new TouristDBEntities())
            {
                return Obj2Json(new
                {
                    data = (from t in db.dt_article_category
                            where t.id == id
                            select new
                            {
                                t.id,
                                t.title,
                                t.img_url,
                                t.content
                            }).FirstOrDefault(),
                    result = 1
                }).Replace("/upload/", "https://guomengtech.com/upload/");
            }
        }

        public static string get_brand_list()
        {
            using (var db = new TouristDBEntities())
            {
                return Obj2Json(new
                {
                    data = (from t in db.dt_article_category
                            where t.channel_id == 2
                            select new
                            {
                                t.id,
                                t.title,
                                t.img_url
                            }).ToList(),
                    result = 1
                }).Replace("/upload/", "https://guomengtech.com/upload/");
            }
        }

        public static string add_or_update_user(string openid, string photo, int sex, string nickname, 
            int age, string phone, string interest, float latitude, float longitude, float accuracy)
        {
            using (var db = new TouristDBEntities())
            {
                dt_users user = null;
                if (openid != null && openid != "")
                {
                    user = db.dt_users.FirstOrDefault(s => s.openid == openid);
                    if(user == null)
                    {
                        user = new dt_users();
                        user.openid = openid;
                        user.user_name = nickname;
                        user.password = "123";
                        user.avatar = photo;
                        user.sex = sex.ToString();
                        user.age = age;
                        user.mobile = phone;
                        user.interest = interest;
                        user.latitude = latitude;
                        user.longitude = longitude;
                        user.accuracy = accuracy;
                        user.GetAddress();
                        db.dt_users.Add(user);
                    }
                    else
                    {
                        if (photo != null && photo != "") user.avatar = photo;
                        if (sex != -1) user.sex = sex.ToString();
                        if (nickname != null && nickname != "") user.user_name = nickname;
                        if (age != -1) user.age = age;
                        if (phone != null && phone != "") user.mobile = phone;
                        if (interest != null && interest != "") user.interest = interest;
                        if(latitude != -1) user.latitude = latitude;
                        if(longitude != -1) user.longitude = longitude;
                        if(accuracy != -1) user.accuracy = accuracy;
                        user.GetAddress();
                    }
                    db.SaveChanges();
                }
                
                return Obj2Json(new
                {
                    user,
                    result = 1
                });
            }
        }

        public static string getOpenId(string code)
        {
            var request = (HttpWebRequest)WebRequest.Create("https://api.weixin.qq.com/sns/jscode2session" +
                "?appid=wxc39f5007a3ffb70c&secret=22d1b5f04ab1f5ce33c087a33fa7e33b" +
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
                var obj = (from t in db.dt_channel_article_food
                           where t.id == id
                           select new
                           {
                               t.id,
                               t.title,
                               t.img_url,
                               t.zhaiyao,
                               t.content,
                               t.update_time
                           }).FirstOrDefault();
                return Obj2Json(new
                {
                    data = new
                    {
                        obj.id,
                        obj.title,
                        obj.img_url,
                        obj.zhaiyao,
                        obj.update_time,
                        content = obj.content.Replace("src=\"/upload", "src=\"http://guomengtech.com/upload")
                    },
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
                var obj = (from t in db.dt_channel_article_guidance
                           where t.id == id
                           select new
                           {
                               t.id,
                               t.title,
                               t.img_url,
                               t.zhaiyao,
                               t.content,
                               t.update_time
                           }).FirstOrDefault();
                return Obj2Json(new
                {
                    data = new
                    {
                        obj.id,
                        obj.title,
                        obj.img_url,
                        obj.zhaiyao,
                        obj.update_time,
                        content = obj.content.Replace("src=\"/upload", "src=\"http://guomengtech.com/upload")
                    },
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

    public partial class dt_users
    {
        public void GetAddress()
        {
            var request = (HttpWebRequest)WebRequest.Create("http://apis.map.qq.com/ws/geocoder/v1/?location=" +
                latitude.ToString() + "," + longitude.ToString() + "&coord_type=1&key=I7WBZ-Z4DWJ-EYCFX-K6XIC-R65E3-HJFQD");
            var response = (HttpWebResponse)request.GetResponse();
            using (var sr = new StreamReader(response.GetResponseStream()))
            {
                string responseString = sr.ReadToEnd();
                var obj = JsonConvert.DeserializeObject<dynamic>(responseString);
                int status = obj.status;
                if (status == 0)
                {
                    address = obj.result.address;
                    address_component = obj.result.address_component.ToString();
                }
            }
        }
    }

}
