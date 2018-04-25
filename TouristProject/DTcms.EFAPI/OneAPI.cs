using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTcms.EFAPI
{
    public class OneAPI
    {
        public static string test()
        {
            using (var db = new OneOnOneDBEntities())
            {
                var list = db.tb_role.ToList();
                return Obj2Json(new
                {
                    data = new
                    {
                        list
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
}
