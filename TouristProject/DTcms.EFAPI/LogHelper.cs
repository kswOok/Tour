using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

[assembly: log4net.Config.XmlConfigurator(Watch = true)]
namespace DTcms.EFAPI
{
    public class LogHelper
    {
        public static void WriteException(Exception ex)
        {
            Type t = typeof(LogHelper);
            log4net.ILog log = log4net.LogManager.GetLogger(t);
            log.Error("Error", ex);
        }

        public static void WriteInfo(string msg)
        {
            Type t = typeof(LogHelper);
            log4net.ILog log = log4net.LogManager.GetLogger(t);
            log.Info(msg);
        }
    }
}
