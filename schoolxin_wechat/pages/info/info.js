// pages/info/info.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Type:'',
    Rank_Country: '',
    FoundationDate: '',
    DistrictName: '',
    Website: '',
    University_Code: '',
    Address: '',
    Tuition: '',
    Picture:'',
    yuanxiaojianjie:'',
    US_NEWS_Rank: '',
    TIMES_Rank: '',
    QS_Rank: '',
    ARWU_Rank: '',


    University_ID:'',
    actzonghedi: '',
    actzonghegao: '',
    benkeshengshuliang: '',
    diliweizhi: '',
    fanzuilv: '',
    jiemeihuishuliang: '',
    luquhouruxuebili: '',
    luqulv: '',
    luqunandu: '',
    luqushuliang: '',
    qianshibili: '',
    qianwushibili: '',
    satshuxuedi: '',
    satxiezuogao: '',
    satyuyandi: '',
    satyuyangao: '',
    shishi: '',
    stashuxuegao: '',
    sushe: '',
    xiaoyuan: '',
    xiaoyuanweizhi: '',
    xiongdihuishuliang: '',
    xueshengzuzhishuliang: '',
    xueshuzuyifenbubai: '',
    xueshuzuyifenbuhei: '',
    xueshuzuyifenbuyazhou: '',
    xuexiaoleixing: '',
    xuezafeizhounei: '',
    xuezafeizhouwai: '',
    yanjiushengshuliang: '',
    yiyu: '',
    yuanxiaojianjie: '',
    zhimingxiaoyou: '',
    zhouwaixueshengbili: '',
    zongtihuafeizhounei: '',
    zongtihuafeizhouwai: '',
    satxiezuodi: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (query) {
    // this.setData({
    //   _num: e.target.dataset.num,
    //   schoolId: e.target.dataset.id,
    // })
    var that = this

    wx.showToast({
      icon: "loading",
      title: "正在加载...",
      duration: 2000000,
    })
    wx.request({
      method: 'POST',
      url: getApp().globalData.baseUrl + "tools/school_api.ashx", //仅为示例，并非真实的接口地址
      data: {
        action:'getSchoolDetail',
        schoolId: query.schoolId

      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        if (res.data.result == 1) {
          wx.hideToast()
        }

      console.log(res)
        that.setData({
          Type: res.data.schoolDetail.xuexiaoleixing,
          Rank_Country: res.data.schoolDetail.US_NEWS_Rank,
          FoundationDate: res.data.schoolDetail.FoundationDate,
          DistrictName: res.data.schoolDetail.DistrictName,
          Website: res.data.schoolDetail.Website,
          University_Code: res.data.schoolDetail.University_Code,

          Picture: res.data.schoolDetail.tupian,
          yuanxiaojianjie: res.data.schoolDetail.yuanxiaojianjie,
          US_NEWS_Rank: res.data.schoolDetail.US_NEWS_Rank,
          TIMES_Rank: res.data.schoolDetail.TIMES_Rank,
          QS_Rank: res.data.schoolDetail.QS_Rank,
          ARWU_Rank: res.data.schoolDetail.ARWU_Rank,

          University_ID: res.data.schoolDetail.University_ID,
          actzonghedi: res.data.schoolDetail.actzonghedi,
          actzonghegao: res.data.schoolDetail.actzonghegao,
          benkeshengshuliang: res.data.schoolDetail.benkeshengshuliang,
          diliweizhi: res.data.schoolDetail.diliweizhi,
          fanzuilv: res.data.schoolDetail.fanzuilv,
          jiemeihuishuliang: res.data.schoolDetail.jiemeihuishuliang,
          luquhouruxuebili: res.data.schoolDetail.luquhouruxuebili,
          luqulv: res.data.schoolDetail.luqulv,
          luqunandu: res.data.schoolDetail.luqunandu,
          luqushuliang: res.data.schoolDetail.luqushuliang,
          qianshibili: res.data.schoolDetail.qianshibili,
          qianwushibili: res.data.schoolDetail.qianwushibili,
          satshuxuedi: res.data.schoolDetail.satshuxuedi,
          satxiezuogao: res.data.schoolDetail.satxiezuogao,
          satxiezuodi: res.data.schoolDetail.satxiezuodi,
          satyuyandi: res.data.schoolDetail.satyuyandi,
          satyuyangao: res.data.schoolDetail.satyuyangao,
          shishi: res.data.schoolDetail.shishi.replace('\n', ''),
          stashuxuegao: res.data.schoolDetail.stashuxuegao,
          xiaoyuanweizhi: res.data.schoolDetail.xiaoyuanweizhi,
          xiongdihuishuliang: res.data.schoolDetail.xiongdihuishuliang,
          xueshengzuzhishuliang: res.data.schoolDetail.xueshengzuzhishuliang,
          xueshuzuyifenbubai: res.data.schoolDetail.xueshuzuyifenbubai,
          xueshuzuyifenbuhei: res.data.schoolDetail.xueshuzuyifenbuhei,
          xueshuzuyifenbuyazhou: res.data.schoolDetail.xueshuzuyifenbuyazhou,
          xuexiaoleixing: res.data.schoolDetail.xuexiaoleixing,
          xuezafeizhounei: res.data.schoolDetail.xuezafeizhounei,
          xuezafeizhouwai: res.data.schoolDetail.xuezafeizhouwai,
          yanjiushengshuliang: res.data.schoolDetail.yanjiushengshuliang,
          yiyu: res.data.schoolDetail.yiyu.replace('\n', ''),
          yuanxiaojianjie: res.data.schoolDetail.yuanxiaojianjie,
          zhimingxiaoyou: res.data.schoolDetail.zhimingxiaoyou.replace('\n', ''),
          zhouwaixueshengbili: res.data.schoolDetail.zhouwaixueshengbili,
          zongtihuafeizhounei: res.data.schoolDetail.zongtihuafeizhounei,
          zongtihuafeizhouwai: res.data.schoolDetail.zongtihuafeizhouwai,




        })

      }
    })
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