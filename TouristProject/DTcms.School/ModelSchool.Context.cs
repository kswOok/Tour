﻿//------------------------------------------------------------------------------
// <auto-generated>
//     此代码已从模板生成。
//
//     手动更改此文件可能导致应用程序出现意外的行为。
//     如果重新生成代码，将覆盖对此文件的手动更改。
// </auto-generated>
//------------------------------------------------------------------------------

namespace DTcms.School
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class AIUniversityEntities : DbContext
    {
        public AIUniversityEntities()
            : base("name=AIUniversityEntities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<Country> Country { get; set; }
        public virtual DbSet<University> University { get; set; }
        public virtual DbSet<University_Enroll_Status> University_Enroll_Status { get; set; }
        public virtual DbSet<User> User { get; set; }
        public virtual DbSet<User_Result_Log> User_Result_Log { get; set; }
        public virtual DbSet<University_Master_CN> University_Master_CN { get; set; }
        public virtual DbSet<MajorGroup> MajorGroup { get; set; }
        public virtual DbSet<Period> Period { get; set; }
        public virtual DbSet<User_Bachelor_Log> User_Bachelor_Log { get; set; }
        public virtual DbSet<User_Master_Log> User_Master_Log { get; set; }
    }
}
