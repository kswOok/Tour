// pages/record/record.js
var time = require('../../utils/util.js') 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
        action:'getRecord',
        userId: wx.getStorageSync('userId')

      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        console.log(res)
        if (res.data.result == 1) {
          wx.hideToast()
        }
        var list = res.data.recordList
        for (var i = 0; i < list.length; i++) {
          list[i].Insert_Date = time.formatTime(new Date(list[i].Insert_Date))
        }
        that.setData({
          list: list
        })

      }
    })
  },
  queryRecord: function(e) {
    wx.navigateTo({
      url: '../result/result?recordId=' + e.target.dataset.id,
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