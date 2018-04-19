// pages/my2/my2.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bcolor: "#ee903c",
    userInfo: {},
    couponList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

    if (wx.getStorageSync('nickName')) {
      this.setData({
        userInfo: {
          nickName: wx.getStorageSync('nickName'),
          avatarUrl: wx.getStorageSync('avatarUrl')
        }
      })
    }



    wx.showToast({
      icon: "loading",
      title: "正在加载...",
      duration: 2000000,
    })

    wx.request({
      method: 'POST',
      url: getApp().globalData.apiUrl,
      data: {
        action: 'coupon_query_user',
        unionid: wx.getStorageSync('unionId')
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        wx.hideToast();
        console.log(res.data);
        if (res.data.code != "0") {
          console.log(res.data.errmsg);
        } else {
          that.setData({
            list: res.data.couponList
          })
        }
        /**/
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

  },

  onOpenCard: function (res) {
    console.log(res.currentTarget.dataset.id);
    wx.openCard({
      cardList: [
        {
          cardId: res.currentTarget.dataset.id,
          code: res.currentTarget.dataset.code
        }
      ],
      success: function (res) {
      }
    })
  },

  onQueryCard: function () {

  },
})