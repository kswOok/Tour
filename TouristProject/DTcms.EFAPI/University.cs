//------------------------------------------------------------------------------
// <auto-generated>
//     此代码已从模板生成。
//
//     手动更改此文件可能导致应用程序出现意外的行为。
//     如果重新生成代码，将覆盖对此文件的手动更改。
// </auto-generated>
//------------------------------------------------------------------------------

namespace DTcms.EFAPI
{
    using System;
    using System.Collections.Generic;
    
    public partial class University
    {
        public int University_ID { get; set; }
        public string University_Code { get; set; }
        public Nullable<int> Country_ID { get; set; }
        public string UniversityName_CN { get; set; }
        public string UniversityName_EN { get; set; }
        public Nullable<int> Rank_World { get; set; }
        public Nullable<int> Rank_Country { get; set; }
        public string CountryName { get; set; }
        public string DistrictName { get; set; }
        public string Tuition { get; set; }
        public string Type { get; set; }
        public string Website { get; set; }
        public string FoundationDate { get; set; }
        public string Address { get; set; }
        public string Picture { get; set; }
        public string City { get; set; }
    }
}
