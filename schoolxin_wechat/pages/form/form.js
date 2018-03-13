var util = require('../../utils/util.js') 
// pages/form/form.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wait:'none',//等待动画
    _num:'',
    //大学
    mSchoolList:[],//就读学校
    schoolNum: 0 , //就读学校
    mSchoolListStr:'请选择',
    mMajorList: [],//就读专业
    mMajorListMajorStr:'请选择',
    majorNum: 0,//就读专业
    targetNum: 0,//目标专业
    mMajorListTargetStr: '请选择',
    mTargetCountryList: [],//目标国家
    mTargetCountryListStr:'请选择',
    mTargetCountryNum: 0,//目标国家
    mGPAList: ['四分制','百分制'],
    mGPANum:0,
    GPAPlaceholder:'0-4.0',//GPA输入框默认值
    GPAValue:0,
    GPAType:'四分制',
    mLanguageList: ['托福', '雅思'],//语言成绩
    mLanguageNum: 0,//语言成绩
    languagePlaceholder: '0-120',//语言成绩输入框默认值
    languageValue: 0,//语言成绩
    mLanguageType: '托福',//语言成绩
    mStandardizationList: ['GRE', 'GMAT','无'],//标准化考试
    mStandardizationNum: 0,//标准化考试
    mStandardizationType: 'GRE',//标准化考试
    mStandardizationDisabled: false,//标准化考试
    standardizationPlaceholder: '260-340',//标准化考试输入框默认值
    standardizationValue: 0,//标准化考试输入值
    mToSchoolList: [],//入学时间
    mToSchoolNum: 0,//入学时间
    ers: '请选择',////入学时间输入框默认值
    mExperienceList: ['超过三个月海外研究经历', ' 一到三个月海外研究经历', '初步的科研经历','无研究经历'],//研究经历
    mExperiencePlaceholder: '请选择',//研究经历
    mExperienceNum: 0,//研究经历
    mPaperList: ['知名期刊论文', '水论文', '已审核', '已投待审', '已起草', '无论文'],//论文发表经历
    mPaperNum: 0,//论文发表经历
    mPaperPlaceholder: '请选择',//论文发表输入框默认值
    mRecommendationList: ['海外牛推', '国内牛推', '海外普通推', '国内普通推'],//推荐信
    mRecommendationNum: 0,//推荐信
    mRecommendationPlaceholder: '请选择',//推荐信输入框默认值
    mOverseasList: ['海本或海外研究经历', '无海外研究经历'],//海外经历
    mOverseasNum: 0,//海外经历
    mOverseasPlaceholder: '请选择',//海外经历输入框默认值
    mPracticeList: ['互联网，咨询硬件，投行，券商', '生物制药，律所，会计事务所，医院', '国企，央行，商业银行', '非政府机构，志愿者，福利', '无工作和实习经历'],//实习工作经历
    mPracticeNum: 0,//实习工作经历
    mPracticePlaceholder: ['请选择'],//实习工作经历输入框默认值
    mDisplay:false,


    //高中
    bTargetCountryList: [],//高中目标国家
    bTargetCountryListStr:'请选择',
    bTargetCountryNum: 0,//高中目标国家
    bGPAList: ['四分制', '百分制'],//高中GPA
    bGPANum: 0,//高中GPA
    bGPAPlaceholder: '0-4.0',//高中GPA输入框默认值
    bGPAType: '四分制',//高中GPA类型
    bGPAValue: 0,//高中GPA值
    bLanguageList: ['托福', '雅思'],//高中语言成绩
    bLanguageNum: 0,//高中语言成绩
    bLanguagePlaceholder: '0-120',//高中语言成绩输入框默认值
    bLanguageValue: 0,//高中语言成绩
    bLanguageType: '托福',//高中语言成绩
    bStandardizationList: ['SAT', 'ACT','无'],//高中标准化考试
    standardizationValues: 0,//高中标准化考试输入值
    bStandardizationNum: 0,//高中标准化考试
    bStandardizationType:'SAT',//高中标准化考试
    bStandardizationPlaceholder: ['400-1600'],//高中标准化考试输入框默认值
    bStandardizationDisabled: false,//高中标准化考试
    bToSchoolList: [],//高中何时入校
    bToSchoolNum: 0,//高中何时入校
    bToSchoolPlaceholder: '请选择',//高中何时入校
    bInclinationList: ['普通大学', '文理学院'],//高中倾向的学校
    bInclinationNum: 0,//高中倾向的学校
    bInclinationPlaceholder: '请选择',//高中倾向的学校
    bGraduationList: ['美国顶级寄宿高中', '美国其他高中', '中国知名高中', '中国普通高中','其他国家高中'],//高中毕业高中类型
    bGraduationNum: 0,//高中毕业高中类型
    bGraduationPlaceholder: '请选择',//高中毕业高中类型
    bRankList: ['Top 5%', 'Top 10%', 'Top 15%', 'Top 20%', '低于Top 20%'],//高中在校排名
    bRankNum: 0,//高中在校排名
    bRankPlaceholder: '请选择',//高中在校排名
    bRecommendList: ['国外大学教授', '国外高中老师', '国内大学教授', '国内知名高中老师', '国内普通高中老师'],//高中推荐信
    bRecommendNum: 0,//高中推荐信
    bRecommendPlaceholder: '请选择',//高中推荐信
    bPrizeList: ['世界级竞赛奖项', '中国国家级竞赛奖项', '国外省（州）级竞赛奖项', '国内地方级竞赛奖项', '国内校级竞赛奖项', '未参加过竞赛未获得过奖项'],//高中最高奖项
    bPrizeNum: 0,//高中最高奖项
    bPrizePlaceholder: '请选择',//高中最高奖项
    bSummerList: ['有一定申请难度的海外名校暑期项目', '仅需报名即可参加的海外名校暑期项目', '海外名校在中国国内组织的暑期项目', '未参加过任何海外院校组织的暑期项目'],//高中暑期项目
    bSummerNum: 0,//高中暑期项目
    bSummerPlaceholder: '请选择',//高中暑期项目
    bVolunteerList: ['世界顶级志愿者经历', '国家级志愿者经历', '地方性志愿者经历', '校级志愿者经历', '没有参加过志愿者活动'],//高中志愿者经历
    bVolunteerNum: 0,//高中志愿者经历
    bVolunteerPlaceholder: '请选择',//高中志愿者经历
    bDisplay: false,

    animationData1: {},
    animationData2: {},
    animationData3: {},
    animationData4: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // var year = util.formatTime(new Date).substr(0, 4)
    // var month = util.formatTime(new Date).substr(5, 2)
    // var day = util.formatTime(new Date).substr(8, 2)
   this.setData({
     _num:1
   })
   var that = this

   wx.showToast({
     icon: "loading",
     title: "正在加载...",
     duration: 2500000,
   })
   wx.request({
     method: 'POST',
     url: getApp().globalData.baseUrl + "tools/school_api.ashx?", //仅为示例，并非真实的接口地址
     data: {
      action:'getPicker'
     },
     header: {
       'content-type': 'application/x-www-form-urlencoded' // 默认值
     },
     success: function (res) {
       if (res.data.result == 1) {
         wx.hideToast()
       }

       console.log(res)
    
       const a=[]
       const b = []
       const c = []
       const d = []
       for (var i = 0; i < res.data.schoolDetail.length;i++){
         a.push(res.data.schoolDetail[i].UniversityName_CN);
       }
       for (var i = 0; i < res.data.majorList.length; i++) {
         b.push(res.data.majorList[i].MajorGroup_Name);
       }
       for (var i = 0; i < res.data.periodList.length; i++) {
         c.push(res.data.periodList[i].Period_Time);
       }
       for (var i = 0; i < res.data.countryList.length; i++) {
         if (res.data.countryList[i].Country_Name!='中国'){
           d.push(res.data.countryList[i].Country_Name);
         }
         
       }
       
       that.setData({
         mSchoolList: a,
         mMajorList:b,
         mToSchoolList:c,
         bToSchoolList:c,
         mTargetCountryList:d,
         bTargetCountryList: d,


       })

     }
   })
  },
  mMore: function(e) {
    console.log(this.data.mDisplay)
    if (this.data.mDisplay==false){
      this.setData({
        mDisplay: true
      })
    }else{
      this.setData({
        mDisplay: false
      })
    }
    
  },
  bMore: function (e) {
    if (this.data.bDisplay == false) {
      this.setData({
        bDisplay: true
      })
    } else {
      this.setData({
        bDisplay: false
      })
    }

  },
  master: function (e) {
    this.setData({
      _num: 1
    })
  },
  bachelor: function (e) {
    this.setData({
      _num: 2
    })
  },
  mSchool: function(e) {
    // this.setData({
    //   schoolNum: e.detail.value,
    //   mSchoolListStr: this.data.mSchoolList[e.detail.value]
    // })
    wx.navigateTo({
      url: '../schoolSearch/schoolSearch?chooseType=1',
    })
  },
  mMajor: function (e) {
    this.setData({
      majorNum: e.detail.value,
      mMajorListMajorStr: this.data.mMajorList[e.detail.value]
    })
  },
  mTargetCountry: function (e) {
    this.setData({
      mTargetCountryNum: e.detail.value,
      mTargetCountryListStr: this.data.mTargetCountryList[e.detail.value]
    })
  },
  mTarget: function (e) {
    this.setData({
      targetNum: e.detail.value,
      mMajorListTargetStr: this.data.mMajorList[e.detail.value]
    })
  },
  mGPA: function (e) {
    if (e.detail.value==0){
      this.setData({
        mGPANum: e.detail.value,
        GPAPlaceholder: '0-4.0',
        GPAType:'四分制',
      })
    }else{
      this.setData({
        mGPANum: e.detail.value,
        GPAPlaceholder: '0-100',
        GPAType: '百分制'
      })
    }
    
  },
  bGPA: function (e) {
    if (e.detail.value == 0) {
      this.setData({
        bGPANum: e.detail.value,
        bGPAPlaceholder: '0-4.0',
        bGPAType: '四分制'
      })
    } else {
      this.setData({
        bmGPANum: e.detail.value,
        bGPAPlaceholder: '0-100',
        bGPAType: '百分制'
      })
    }

  },
  mLanguage: function (e) {
    if (e.detail.value == 0) {
      this.setData({
        mLanguageNum: e.detail.value,
        languagePlaceholder: '0-120',
        mLanguageType:'托福'
      })
    } else {
      this.setData({
        mLanguageNum: e.detail.value,
        languagePlaceholder: '1-9',
        mLanguageType: '雅思'
      })
    }

  },
  bLanguage: function (e) {
    if (e.detail.value == 0) {
      this.setData({
        bLanguageNum: e.detail.value,
        bLanguagePlaceholder: '0-120',
        bLanguageType: '托福'
      })
    } else {
      this.setData({
        bLanguageNum: e.detail.value,
        bLanguagePlaceholder: '1-9',
        bLanguageType: '雅思'
      })
    }

  },
  mStandardization: function (e) {
    if (e.detail.value == 0) {
      this.setData({
        mStandardizationNum: e.detail.value,
        standardizationPlaceholder: '260-340',
        mStandardizationDisabled: false,
        mStandardizationType:'GRE',
      })
    } else if (e.detail.value == 1){
      this.setData({
        mStandardizationNum: e.detail.value,
        standardizationPlaceholder: '200-800',
        mStandardizationDisabled: false,
        mStandardizationType: 'GMAT',
      })
    }else{
      this.setData({
        mStandardizationNum: e.detail.value,
        standardizationPlaceholder: '0',
        mStandardizationDisabled:true,
        standardizationValue:'0',
        mStandardizationType: '无',
      })
    }

  },
  mToSchool: function(e) {
    this.setData({
      ers: this.data.mToSchoolList[e.detail.value]
    })
  },
  mExperience: function (e) {
    this.setData({
      mExperiencePlaceholder: this.data.mExperienceList[e.detail.value]
    })
  },
  mPaper: function (e) {
    this.setData({
      mPaperPlaceholder: this.data.mPaperList[e.detail.value]
    })
  },
  mRecommendation :function (e) {
    this.setData({
      mRecommendationPlaceholder: this.data.mRecommendationList[e.detail.value]
    })
  },
  mOverseas: function (e) {
    this.setData({
      mOverseasPlaceholder: this.data.mOverseasList[e.detail.value]
    })
  },
  mPractice: function (e) {
    this.setData({
      mPracticePlaceholder: this.data.mPracticeList[e.detail.value]
    })
  },
  bTargetCountry: function (e) {
    this.setData({
      bTargetCountryNum: e.detail.value,
      bTargetCountryListStr: this.data.bTargetCountryList[e.detail.value]
    })
  },
  bStandardization: function (e) {
    if (e.detail.value == 0) {
      this.setData({
        bStandardizationNum: e.detail.value,
        bStandardizationPlaceholder: '400-1600',
        bStandardizationDisabled:false,
        bStandardizationType:'SAT'
      })
    } else if (e.detail.value == 1) {
      this.setData({
        bStandardizationNum: e.detail.value,
        bStandardizationPlaceholder: '11-36',
        bStandardizationDisabled: false,
        bStandardizationType: 'ACT'
      })
    }else{
      this.setData({
        bStandardizationNum: e.detail.value,
        bStandardizationPlaceholder: '0',
        standardizationValues:'0',
        bStandardizationDisabled: true,
        bStandardizationType: '无'
      })
    }

  },
  bToSchool: function (e) {
    this.setData({
      bToSchoolPlaceholder: this.data.bToSchoolList[e.detail.value]
    })
  },
  bInclination: function (e) {
    this.setData({
      bInclinationPlaceholder: this.data.bInclinationList[e.detail.value]
    })
  },
  bGraduation: function (e) {
    this.setData({
      bGraduationPlaceholder: this.data.bGraduationList[e.detail.value]
    })
  },
  bRank: function (e) {
    this.setData({
      bRankPlaceholder: this.data.bRankList[e.detail.value]
    })
  },
  bRecommend: function (e) {
    this.setData({
      bRecommendPlaceholder: this.data.bRecommendList[e.detail.value]
    })
  },
  bPrize: function (e) {
    this.setData({
      bPrizePlaceholder: this.data.bPrizeList[e.detail.value]
    })
  },
  bSummer: function (e) {
    this.setData({
      bSummerPlaceholder: this.data.bSummerList[e.detail.value]
    })
  },
  bVolunteer: function (e) {
    this.setData({
      bVolunteerPlaceholder: this.data.bVolunteerList[e.detail.value]
    })
  },
  inputGPA: function(e) {
    
    this.setData({
      GPAValue: e.detail.value
    })
  },
  bInputGPA: function (e) {

    this.setData({
      bGPAValue: e.detail.value,
    })
  },
  inputLanguage: function (e) {

    this.setData({
      languageValue: e.detail.value
    })
  },
  bInputLanguage: function (e) {

    this.setData({
      bLanguageValue: e.detail.value
    })
  },
  inputStandardization: function (e) {

    this.setData({
      standardizationValue: e.detail.value
    })
  },
  inputStandardizations: function (e) {

    this.setData({
      standardizationValues: e.detail.value
    })
  },
  submit: function (e) {
    if (this.data._num==1){ //添加硕士数据
      var that = this
      if (that.data.mTargetCountryListStr=='请选择'){
        wx.showModal({
          title: '评估失败',
          content: '请选择目标国家',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
            }
          }
        })
        return
      }
      if (that.data.mSchoolListStr == '请选择') {
        wx.showModal({
          title: '评估失败',
          content: '请选择就读学校',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
            }
          }
        })
        return
      }
      if (that.data.mMajorListMajorStr == '请选择') {
        wx.showModal({
          title: '评估失败',
          content: '请选择就读专业',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
            }
          }
        })
        return
      } 
      if (that.data.mMajorListTargetStr == '请选择') {
        wx.showModal({
          title: '评估失败',
          content: '请选择目标专业',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
            }
          }
        })
        return
      }
      //GPA
      if (that.data.mGPAList[that.data.mGPANum]=='四分制'){
        if (that.data.GPAValue > 4 || that.data.GPAValue < 0) {
          wx.showModal({
            title: '评估失败',
            content: 'GPA分数范围为0-4.0',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              }
            }
          })
          return
        }
      }else{
        if (that.data.GPAValue > 100 || that.data.GPAValue < 0) {
          wx.showModal({
            title: '评估失败',
            content: 'GPA分数范围为0-100',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              }
            }
          })
          return
        }
      }
      //语言
      if (that.data.mLanguageList[that.data.mLanguageNum] == '托福') {
        if (that.data.languageValue > 120 || that.data.languageValue < 0) {
          wx.showModal({
            title: '评估失败',
            content: '语言成绩范围为0-120',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              }
            }
          })
          return
        }
      } else {
        if (that.data.languageValue > 9 || that.data.languageValue < 1) {
          wx.showModal({
            title: '评估失败',
            content: '语言成绩范围为1-9',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              }
            }
          })
          return
        }
      }
      //标准化考试
      if (that.data.mStandardizationList[that.data.mStandardizationNum] == 'GRE') {
        if (that.data.standardizationValue > 340 || (that.data.standardizationValue < 260 && that.data.standardizationValue >0) ) {
          wx.showModal({
            title: '评估失败',
            content: '标准化考试分数范围为260-340',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              }
            }
          })
          return
        }
      } else if (that.data.mStandardizationList[that.data.mStandardizationNum] == 'GMAT'){
        if (that.data.standardizationValue > 800 || (that.data.standardizationValue < 200 && that.data.standardizationValue >0) ) {
          wx.showModal({
            title: '评估失败',
            content: '标准化考试分数范围为200-800',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              }
            }
          })
          return
        }
      }
      //入学时间
      if (that.data.mToSchoolPlaceholders == '请选择') {
          wx.showModal({
            title: '评估失败',
            content: '请选择入学时间',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              }
            }
          })
          return
      }
      // wx.showToast({
      //   icon: "loading",
      //   title: "正在加载...",
      //   duration: 2000000,
      // })

      wx.request({
        method: 'POST',
        url: getApp().globalData.baseUrl + "tools/school_api.ashx", //仅为示例，并非真实的接口地址
        data: {
          action:'insertMasterData',
          userId: wx.getStorageSync("userId"),//用户Id
          targetCountry: that.data.mTargetCountryListStr,//目标国家
          school: that.data.mSchoolListStr,//就读学校
          major1: that.data.mMajorListMajorStr,//就读专业
          major2: that.data.mMajorListTargetStr,//目标专业
          GPA:that.data.GPAValue,//GPA输入值
          GPAType:that.data.mGPAList[that.data.mGPANum],//GPA类型
          language:that.data.languageValue,//语言输入值
          languageType: that.data.mLanguageList[that.data.mLanguageNum],//语言类型
          standardization: that.data.standardizationValue,//标准化考试输入值
          standardizationType:that.data.mStandardizationList[that.data.mStandardizationNum],//标准化考试类型
          toSchool: that.data.ers,//入学时间
          experience: that.data.mExperiencePlaceholder,//研究经历
          paper: that.data.mPaperPlaceholder,//论文发表经历
          recommendation: that.data.mRecommendationPlaceholder,//推荐信
          overseas: that.data.mOverseasPlaceholder,//海外经历
          practice: that.data.mPracticePlaceholder,//工作或实习经历
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        success: function (res) {
          that.setData({
            wait: 'block'
          })
          var animation1 = wx.createAnimation({
            duration: 10000,
            timingFunction: 'linear',
          })
          animation1.rotate(4500).step()
          that.setData({
            animationData1: animation1.export()
          })

          var animation2 = wx.createAnimation({
            duration: 10000,
            timingFunction: 'linear',
          })
          animation2.rotate(-4000).step()
          that.setData({
            animationData2: animation2.export()
          })

          var animation3 = wx.createAnimation({
            duration: 10000,
            timingFunction: 'linear',
          })
          animation3.rotate(3500).step()
          that.setData({
            animationData3: animation3.export()
          })

          var animation4 = wx.createAnimation({
            duration: 10000,
            timingFunction: 'linear',
          })
          animation4.rotate(-4250).step()
          that.setData({
            animationData4: animation4.export()
          })

          setTimeout(function () {
            that.setData({
              wait: 'none'
            })
            wx.redirectTo({
              url: '../result/result?recordId=' + res.data.data,
            })
          }, 1500)
        }
      })
    } else {//添加本科数据
      var that = this

      // wx.showToast({
      //   icon: "loading",
      //   title: "正在加载...",
      //   duration: 2000000,
      // })
      if (that.data.bTargetCountryListStr == '请选择') {
        wx.showModal({
          title: '评估失败',
          content: '请选择目标国家',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
            }
          }
        })
        return
      }
      
      //GPA
      if (that.data.bGPAList[that.data.bGPANum] == '四分制') {
        if (that.data.bGPAValue > 4 || that.data.bGPAValue < 0) {
          wx.showModal({
            title: '评估失败',
            content: 'GPA分数范围为0-4.0',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              }
            }
          })
          return
        }
      } else {
        if (that.data.bGPAValue > 100 || that.data.bGPAValue < 0 ) {
          wx.showModal({
            title: '评估失败',
            content: 'GPA分数范围为0-100',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              }
            }
          })
          return
        }
      }
      //语言
      if (that.data.bLanguageList[that.data.bLanguageNum] == '托福') {
        if (that.data.bLanguageValue > 120 || that.data.bLanguageValue < 0) {
          wx.showModal({
            title: '评估失败',
            content: '语言成绩范围为0-120',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              }
            }
          })
          return
        }
      } else {
        if (that.data.bLanguageValue > 9 || that.data.bLanguageValue < 1) {
          wx.showModal({
            title: '评估失败',
            content: '语言成绩范围为1-9',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              }
            }
          })
          return
        }
      }
      //标准化考试
      if (that.data.bStandardizationList[that.data.bStandardizationNum] == 'SAT') {
        if (that.data.standardizationValues > 1600 || (that.data.standardizationValues < 400 && that.data.standardizationValues >0) ) {
          wx.showModal({
            title: '评估失败',
            content: '标准化考试分数范围为400-1600',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              }
            }
          })
          return
        }
      } else if (that.data.bStandardizationList[that.data.bStandardizationNum] == 'ACT') {
        if (that.data.standardizationValues > 36 || (that.data.standardizationValues < 11 && that.data.standardizationValues > 0)) {
          wx.showModal({
            title: '评估失败',
            content: '标准化考试分数范围为11-36',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              }
            }
          })
          return
        }
      }
      //何时入校
      if (that.data.bToSchoolPlaceholder == '请选择') {
        wx.showModal({
          title: '评估失败',
          content: '请选择入学时间',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
            }
          }
        })
        return
      }
      wx.request({
        method: 'POST',
        url: getApp().globalData.baseUrl + "tools/school_api.ashx", //仅为示例，并非真实的接口地址
        data: {
          action:'insertBachelorData',
          userId: wx.getStorageSync("userId"),//用户Id
          targetCountry: that.data.bTargetCountryListStr,//目标国家
          GPA: that.data.bGPAValue,//GPA输入值
          GPAType: that.data.bGPAList[that.data.bGPANum],//GPA类型
          language: that.data.bLanguageValue,//语言输入值
          languageType: that.data.bLanguageList[that.data.bLanguageNum],//语言类型
          standardization: that.data.standardizationValues,//本科标准化考试输入值
          standardizationType: that.data.bStandardizationList[that.data.bStandardizationNum],//本科标准化考试输入值类型
          toSchool: that.data.bToSchoolPlaceholder,//本科希望何时入校
          inclination: that.data.bInclinationPlaceholder,//本科倾向的学校类型
          graduation: that.data.bGraduationPlaceholder,//本科毕业的高中类型
          rank: that.data.bRankPlaceholder,//本科在校排名
          recommend: that.data.bRecommendPlaceholder,//本科推荐信
          prize: that.data.bPrizePlaceholder,//本科最高奖项
          summer: that.data.bSummerPlaceholder,//本科暑期项目类型
          volunteer: that.data.bVolunteerPlaceholder,//本科志愿者经历

        },
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        success: function (res) {
          that.setData({
            wait: 'block'
          })
          var animation1 = wx.createAnimation({
            duration: 10000,
            timingFunction: 'linear',
          })
          animation1.rotate(4500).step()
          that.setData({
            animationData1: animation1.export()
          })

          var animation2 = wx.createAnimation({
            duration: 10000,
            timingFunction: 'linear',
          })
          animation2.rotate(-4000).step()
          that.setData({
            animationData2: animation2.export()
          })

          var animation3 = wx.createAnimation({
            duration: 10000,
            timingFunction: 'linear',
          })
          animation3.rotate(3500).step()
          that.setData({
            animationData3: animation3.export()
          })

          var animation4 = wx.createAnimation({
            duration: 10000,
            timingFunction: 'linear',
          })
          animation4.rotate(-4250).step()
          that.setData({
            animationData4: animation4.export()
          })
          
          setTimeout(function () {
            that.setData({
              wait: 'none'
            })
            wx.redirectTo({
              url: '../result/result?recordId=' + res.data.data,
            })
          }, 1500)
          
        }
      })
    }
    
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
    if (wx.getStorageSync('mschoolName')!=''){
        this.setData({
          mSchoolListStr: wx.getStorageSync('mschoolName')
        })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})