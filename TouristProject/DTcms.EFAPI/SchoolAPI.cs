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
    public class SchoolAPI
    {
        public static string getSchool()
        {
            using (var db = new AIUniversityEntities())
            {
                var countrys = db.Country.OrderBy(s => s.Country_ID).ToList();
                var country_first = countrys[0];

                var query1 = from u in db.University
                             where u.Country_ID == country_first.Country_ID
                             select new
                             {
                                 University_ID_INT = u.University_ID,
                                 University_ID_STR = u.University_ID.ToString(),
                                 u.Country_ID,
                                 u.UniversityName_CN,
                                 u.UniversityName_EN,
                                 u.Rank_World,
                                 u.CountryName,
                                 u.DistrictName,
                                 u.Picture
                             };
                var query2 = from univer in query1
                             join enroll in db.University_Enroll_Status
                             on univer.University_ID_STR equals enroll.University_ID into temp
                             from tt in temp.DefaultIfEmpty()
                             orderby tt.QS_排名
                             select new
                             {
                                 University_ID = univer.University_ID_INT,
                                 univer.Country_ID,
                                 univer.UniversityName_CN,
                                 univer.UniversityName_EN,
                                 univer.Rank_World,
                                 univer.CountryName,
                                 univer.DistrictName,
                                 Picture = univer.Picture.Replace("www.", ""),
                                 US_NEWS_Rank = univer.Rank_World,
                                 zhouwaiMoney = tt.总体花费_州外,
                                 weizhi = univer.DistrictName
                             };
                var list = query2.Take(50).ToList();
                var ret = new
                {
                    schoolList = list,
                    result = 1,
                    data = countrys
                };
                return Obj2Json(ret);
            }
        }

        public static string getSchoolById(string schoolId)
        {
            using (var db = new AIUniversityEntities())
            {
                var query1 = from univer in db.University
                             where univer.Country_ID.ToString() == schoolId
                             join enroll in db.University_Enroll_Status
                             on univer.University_ID.ToString() equals enroll.University_ID
                             into temp
                             from tt in temp.DefaultIfEmpty()
                             orderby tt.QS_排名
                             select new
                             {
                                 univer.University_ID,
                                 univer.Country_ID,
                                 univer.UniversityName_CN,
                                 univer.UniversityName_EN,
                                 univer.Rank_World,
                                 univer.CountryName,
                                 univer.DistrictName,
                                 Picture = univer.Picture.Replace("www.", ""),
                                 US_NEWS_Rank = tt.QS_排名,
                                 zhouwaiMoney = tt.总体花费_州外,
                                 weizhi = tt.地理位置
                             };
                return Obj2Json(new
                {
                    schoolList = query1.Take(100).ToList(),
                    result = 1
                });
            }
        }

        public static string insertBachelorData(
            string userId,
            string targetCountry, 
            float GPA, 
            string GPAType, 
            int language, 
            string languageType, 
            int standardization, 
            string standardizationType, 
            string toSchool, 
            string inclination,
            string graduation, 
            string rank, 
            string recommend, 
            string prize, 
            string summer,
            string volunteer)
        {
            float GPA_Four = 0.0f;
            float GPA_Hundred = 0.0f;
            int TOEFL = 0;
            int IELTS = 0;
            int GRE_Score = 0;
            int CMAT_Score = 0;

            if (GPAType == "四分制")
            {
                GPA_Four = GPA;
                GPA_Hundred = 0.0f;
            }
            else
            {
                GPA_Four = 0.0f;
                GPA_Hundred = GPA;
            }
            if (languageType == "托福")
            {
                TOEFL = language;
                IELTS = 0;
            }
            else
            {
                TOEFL = 0;
                IELTS = language;
            }
            if (standardizationType == "SAT")
            {
                GRE_Score = standardization;
                CMAT_Score = 0;
            }
            else if (standardizationType == "ACT")
            {
                GRE_Score = 0;
                CMAT_Score = standardization;
            }
            else
            {
                GRE_Score = 0;
                CMAT_Score = 0;
            }
            string id = Guid.NewGuid().ToString().Replace("-", "").ToLower();
            DateTime dt_now = DateTime.Now;
            using (var db = new AIUniversityEntities())
            {
                db.User_Bachelor_Log.Add(
                    new User_Bachelor_Log
                    {
                        ID = id,
                        User_ID = userId,
                        Target_Country = targetCountry,
                        GPA_Four = GPA_Four,
                        GPA_Hundred = GPA_Hundred,
                        TOEFL = TOEFL,
                        IELTS = IELTS,
                        SAT = GRE_Score,
                        ACT = CMAT_Score,
                        Target_JoinTime = toSchool,
                        Prefed_SchoolType = inclination,
                        MiddleSchool_Type = graduation,
                        MiddleSchool_GradeLevel = rank,
                        Recommendation = recommend,
                        Award = prize,
                        Summer_Program = summer,
                        Volunteer_Experience = volunteer,
                        Insert_Date = dt_now
                    });
                var query = from univer in db.University
                            where univer.CountryName == targetCountry
                            join enroll in db.University_Enroll_Status
                            on univer.University_ID.ToString() equals enroll.University_ID
                            into temp
                            from tt in temp.DefaultIfEmpty()
                            orderby tt.录取难度
                            orderby tt.录取率
                            select new
                            {
                                univer.University_ID
                            };
                var resultList = query.ToList();
                int type = 0;
                for(int i = 0;i < resultList.Count;i++)
                {
                    if (i < 2)
                        type = 1;
                    else if (i <= 3)
                        type = 2;
                    else
                        type = 3;
                    db.User_Result_Log.Add(
                        new User_Result_Log
                        {
                            User_ID = userId,
                            UserLog_ID = id,
                            University_ResultId = resultList[i].University_ID.ToString(),
                            Insert_Date = dt_now,
                            type = type,
                            sort = i + 1
                        });
                }
                db.SaveChanges();
                return Obj2Json(new
                {
                    data = id,
                    result = 1
                });
            }
        }

        public static string insertMasterData(
            string userId,
            string targetCountry,
            string school,
            string major1,
            string major2,
            float GPA,
            string GPAType,
            int language,
            string languageType,
            int standardization,
            string standardizationType,
            string toSchool,
            string experience, 
            string paper, 
            string recommendation,
            string overseas,
            string practice)
        {
            DateTime createTime = DateTime.Now;
            float GPA_Four = 0.0f;
            float GPA_Hundred = 0.0f;
            int TOEFL = 0;
            int IELTS = 0;
            int GRE_Score = 0;
            int CMAT_Score = 0;
            string id = Guid.NewGuid().ToString().Replace("-", "").ToLower();
            if (GPAType == "四分制")
            {
                GPA_Four = GPA;
                GPA_Hundred = 0.0f;
            }
            else
            {
                GPA_Four = 0.0f;
                GPA_Hundred = GPA;
            }
            if (languageType == "托福")
            {
                TOEFL = language;
                IELTS = 0;
            }
            else
            {
                TOEFL = 0;
                IELTS = language;
            }
            if (standardizationType == "GRE")
            {
                GRE_Score = standardization;
                CMAT_Score = 0;
            }
            else if (standardizationType == "GMAT")
            {
                GRE_Score = 0;
                CMAT_Score = standardization;
            }
            else
            {
                GRE_Score = 0;
                CMAT_Score = 0;
            }
            using (var db = new AIUniversityEntities())
            {
                db.User_Master_Log.Add(new User_Master_Log
                {
                    ID = id,
                    User_ID = userId,
                    Target_Country = targetCountry,
                    Current_University = school,
                    Current_Major = major1,
                    Target_Major = major2,
                    GPA_Four = GPA_Four,
                    GPA_Hundred = GPA_Hundred,
                    TOEFL = TOEFL,
                    IELTS = IELTS,
                    GRE_Score = GRE_Score,
                    CMAT_Score = CMAT_Score,
                    Target_JoinTime = toSchool,
                    Research_Experience = experience,
                    Paper_Publish = paper,
                    Recommendation = recommendation,
                    Abroad_Experience = overseas,
                    Working_Experience = practice,
                    Insert_Date = createTime
                });
                var query = from univer in db.University
                            where univer.CountryName == targetCountry
                            join enroll in db.University_Enroll_Status
                            on univer.University_ID.ToString() equals enroll.University_ID
                            into temp
                            from tt in temp.DefaultIfEmpty()
                            orderby tt.录取难度 descending
                            select new
                            {
                                univer.University_ID
                            };
                var resultList = query.ToList();
                int type = 0;
                for (int i = 0; i < resultList.Count; i++)
                {
                    if (i < 2)
                        type = 1;
                    else if (i <= 3)
                        type = 2;
                    else
                        type = 3;
                    db.User_Result_Log.Add(
                        new User_Result_Log
                        {
                            User_ID = userId,
                            UserLog_ID = id,
                            University_ResultId = resultList[i].University_ID.ToString(),
                            Insert_Date = createTime,
                            type = type,
                            sort = i + 1
                        });
                }
                db.SaveChanges();
            }
            throw new NotImplementedException();
        }

        public static string getPicker()
        {
            using (var db = new AIUniversityEntities())
            {
                return Obj2Json(new
                {
                    schoolDetail = (from u in db.University select u.UniversityName_CN).ToList(),
                    majorList = (from u in db.MajorGroup select u.MajorGroup_Name).ToList(),
                    countryList = (from u in db.Country select u.Country_Name).ToList(),
                    periodList = (from u in db.Period select u.Period_Time).ToList(),
                    result = 1
            });
            }
        }

        public static string getSchoolDetail(string schoolId)
        {
            using (var db = new AIUniversityEntities())
            {
                var obj = db.University_Enroll_Status.FirstOrDefault(s => s.University_ID == schoolId);
                if (obj != null)
                    return Obj2Json(new
                    {
                        schoolDetail = new
                        {
                            obj.University_ID,
                            yuanxiaojianjie = obj.院校简介,
                            xuexiaoleixing = obj.公立_私立,
                            xiaoyuanweizhi = obj.校园位置,
                            fanzuilv = obj.犯罪率_犯罪数量_学生数量_,
                            diliweizhi = obj.地理位置,
                            xiaoyuan = obj.校园,
                            sushe = obj.宿舍,
                            US_NEWS_Rank = obj.US_NEWS_排名,
                            TIMES_Rank = obj.TIMES_排名,
                            QS_Rank = obj.QS_排名,
                            ARWU_Rank = obj.ARWU_排名,
                            luqunandu = obj.录取难度,
                            luqulv = obj.录取率,
                            luqushuliang = obj.录取数量,
                            luquhouruxuebili = obj.录取后入学比例,
                            qianwushibili = obj.申请者高中成绩前50_比例 ,
                            qianshibili = obj.申请者高中成绩前10_比例,
                            satyuyangao = obj.SAT语言_GAO,
                            satyuyandi = obj.SAT语言_DI,
                            stashuxuegao = obj.SAT数学_GAO,
                            satshuxuedi = obj.SAT数学_DI,
                            satxiezuogao = obj.SAT写作_GAO,
                            satxiezuodi = obj.SAT写作_DI,
                            actzonghegao = obj.ACT综合_GAO,
                            actzonghedi = obj.ACT综合_DI,
                            zhouwaixueshengbili = obj.州外学生比例,
                            benkeshengshuliang = obj.本科生数量,
                            yanjiushengshuliang = obj.研究生数量,
                            xueshengzuzhishuliang = obj.学生组织数量 ,
                            xiongdihuishuliang = obj.兄弟会数量,
                            jiemeihuishuliang = obj.姐妹会数量,
                            xueshuzuyifenbubai = obj.学术族裔分布_白,
                            xueshuzuyifenbuyazhou = obj.学术族裔分布_亚洲,
                            xueshuzuyifenbuhei = obj.学术族裔分布_黑,
                            xuezafeizhounei = obj.学杂费_州内_,
                            zongtihuafeizhounei = obj.总体花费_州内_,
                            xuezafeizhouwai = obj.学杂费_州外_,
                            zongtihuafeizhouwai = obj.总体花费_州外,
                            shishi = obj.事实,
                            zhimingxiaoyou = obj.知名校友,
                            yiyu = obj.体育,
                            tupian = obj.图片,
                            obj.update_date
                        },
                        result = 1
                    });
                else
                    return Obj2Json(new
                    {
                        result = 0
                    });
            }
        }

        public static string getResult(string recordId)
        {
            using (var db = new AIUniversityEntities())
            {
                var query1 = from url in db.User_Result_Log
                             where url.UserLog_ID == recordId
                             orderby url.sort
                             join univer in db.University 
                             on url.University_ResultId equals univer.University_ID.ToString()
                             join enroll in db.University_Enroll_Status
                             on univer.University_ID.ToString() equals enroll.University_ID
                             into temp
                             from tt in temp.DefaultIfEmpty()
                             select new
                             {
                                 univer.University_ID,
                                 univer.Country_ID,
                                 univer.UniversityName_CN,
                                 univer.UniversityName_EN,
                                 univer.Rank_World,
                                 univer.CountryName,
                                 univer.DistrictName,
                                 Picture = univer.Picture.Replace("www.", ""),
                                 US_NEWS_Rank = tt.US_NEWS_排名,
                                 zhouwaiMoney = tt.总体花费_州外,
                                 weizhi = tt.地理位置,
                                 url.type
                             };
                return Obj2Json(new
                {
                    schoolList = query1.ToList(),
                    result = 1
                });
            }
        }

        public static string schoolSearch(string name, string english)
        {
            using (var db = new AIUniversityEntities())
            {
                return Obj2Json(new
                {
                    schoolList = db.University_Master_CN
                        .Where(s => s.UniversityName_CN.Contains(name) || s.UniversityName_EN.Contains(english))
                        .ToList(),
                    result = 1
                });
            }
        }

        public static string getRecord(string userId)
        {
            using (var db = new AIUniversityEntities())
            {
                var query1 = from u in db.User_Result_Log
                             where u.User_ID == userId
                             group u by new
                             {
                                 u.UserLog_ID,
                                 u.Insert_Date
                             }
                             into g
                             orderby g.Key.Insert_Date descending
                             select new
                             {
                                 count = g.Count(),
                                 g.Key.UserLog_ID,
                                 g.Key.Insert_Date

                             };
                var ret = new
                {
                    result = 1,
                    recordList = query1.ToList()
                };
                return Obj2Json(ret);
            }
        }

        public static string search(string name, string english)
        {
            using (var db = new AIUniversityEntities())
            {
                var query1 = from c in db.Country
                             orderby c.Country_ID
                             select new
                             {
                                 c.Country_ID,
                                 c.Country_Name,
                                 c.Region_Name
                             };
                var query2 = from u in db.University
                             where u.UniversityName_CN.Contains(name) || u.UniversityName_EN.Contains(english)
                             select u;
                var query3 = from univer in query2
                             join enroll in db.University_Enroll_Status
                             on univer.University_ID.ToString() equals enroll.University_ID into temp
                             from tt in temp.DefaultIfEmpty()
                             orderby tt.US_NEWS_排名
                             select new
                             {
                                 University_ID = univer.University_ID.ToString(),
                                 univer.Country_ID,
                                 univer.UniversityName_CN,
                                 univer.UniversityName_EN,
                                 univer.Rank_World,
                                 univer.CountryName,
                                 univer.DistrictName,
                                 Picture = univer.Picture.Replace("www.", ""),
                                 US_NEWS_Rank = univer.Rank_World,
                                 zhouwaiMoney = tt.总体花费_州外,
                                 weizhi = tt.地理位置
                             };
                var ret = new
                {
                    result = 1,
                    schoolList = query3.ToList(),
                    data = query1.ToList()
                };
                return Obj2Json(ret);
            }
        }

        public static string register(string openId, string nickName, string avatarUrl, string sex)
        {
            try
            {
                using (var db = new AIUniversityEntities())
                {
                    var user = db.User.FirstOrDefault(s => s.OpenID == openId);
                    if(user == null)
                    {
                        user = new User();
                        user.ID = Guid.NewGuid().ToString().Replace("-", "").ToLower();
                        user.Name = nickName;
                        user.Picture = avatarUrl;
                        user.OpenID = openId;
                        user.CreateTime = DateTime.Now;
                        user.Sex = sex;
                        db.User.Add(user);
                        db.SaveChanges();
                    }
                    var ret = new
                    {
                        data = user,
                        result = 1
                    };
                    return Obj2Json(ret);
                }
            }
            catch (Exception e)
            {
                LogHelper.WriteException(e);
                return Obj2Json(new
                {
                    result = -1,
                    errmsg = e.Message
                });
            }
        }

        private static string Obj2Json(object ret)
        {
            IsoDateTimeConverter iso = new IsoDateTimeConverter();
            iso.DateTimeFormat = "yyyy-MM-dd HH:mm:ss";
            return JsonConvert.SerializeObject(ret, iso);
        }

        public static string getOpenId(string code)
        {
            try
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
                        result = 1
                    };
                    return Obj2Json(ret);
                }
            }
            catch(Exception e)
            {
                LogHelper.WriteException(e);
                return Obj2Json(new
                {
                    result = -1,
                    errmsg = e.Message
                });
            }
        }

        public static string updateUser(string userId, string nickName, string mobile, string xueli, string zhuanye, string age)
        {
            using (var db = new AIUniversityEntities())
            {
                var user = db.User.SingleOrDefault(s => s.ID == userId);
                if(user != null)
                {
                    if (nickName != null && nickName != "") user.Name = nickName;
                    if (mobile != null && mobile != "") user.Phone = mobile;
                    if (xueli != null && xueli != "") user.Xueli = xueli;
                    if (zhuanye != null && zhuanye != "") user.Zhuanye = zhuanye;
                    if (age != null && age != "") user.Age = age;
                }
                var ret = new
                {
                    user,
                    result = db.SaveChanges()
            };
                return Obj2Json(ret);
            }
        }
    }
}
