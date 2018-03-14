// pages/academy/academy.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    countryList: '',
    _num: '',
    schoolId: '',
    schoolList: '',
    isSearch: 100,
    chooseType:'',

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (query) {
    this.setData({
      chooseType: query.chooseType
    })
    

  },
  search: function (e) {
    if (e.detail.value == '') {
      this.setData({
        isSearch: 100,
        schoolList: []
      })
    } else {
      this.setData({
        isSearch: 0
      })
      var that = this
      wx.request({
        method: 'POST',
        url: getApp().globalData.baseUrl + "tools/school_api.ashx", //仅为示例，并非真实的接口地址
        data: {
          action:'schoolSearch',
          name: e.detail.value,
          english: e.detail.value,
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        success: function (res) {
          if (res.data.result == 1) {
            wx.hideToast()
          }
          that.setData({
            // countryList: res.data.data,
            schoolList: res.data.schoolList,
          })

        }
      })
    }

  },
  chooseSchool: function (e) {
    var schoolName = e.currentTarget.dataset.id
    console.log(schoolName)
    if(this.data.chooseType==1){//硕士入口
      wx.setStorageSync('mschoolName', schoolName)
    } else if (this.data.chooseType == 2){//本科入口
      wx.setStorageSync('bschoolName', schoolName)
    }
    wx.navigateBack({
      delta:1
    })
  },
  school: function (e) {
    this.setData({
      _num: e.target.dataset.num,
      schoolId: e.target.dataset.id,
    })
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
        action:'getSchoolById',
        schoolId: e.target.dataset.id

      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        if (res.data.result == 1) {
          wx.hideToast()
        }


        that.setData({

          schoolList: res.data.schoolList,
          linSchoolList: res.data.schoolList
        })

      }
    })
  },
  schoolDetail: function (e) {
    wx.navigateTo({
      url: '../info/info?schoolId=' + e.target.dataset.id,
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