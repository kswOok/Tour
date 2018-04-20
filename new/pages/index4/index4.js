// pages/index4/index4.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      '../../images/aa3.png',
      '../../images/aa2.png'
    ],
    indicatorDots: false,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    // tab切换  
    currentTab: 0,  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this; 

    wx.showToast({
      icon: "loading",
      title: "正在加载...",
      duration: 2000000,
    })
    

    wx.request({
      method: 'POST',
      url: getApp().globalData.apiUrl,
      data: {
        action: 'get_channel_article_news'
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        if (res.data.result == 1) {
          wx.hideToast()
        }
        that.setData({
          list: res.data.data,
        })
      }
    });
  },

  bindChange: function (e) {

    var that = this;
    that.setData({ currentTab: e.detail.current });

  },  

  swichNav: function (e) {

    var that = this;

    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      if (e.target.dataset.current == 0) {
        wx.showToast({
          icon: "loading",
          title: "正在加载...",
          duration: 2000000,
        })
        wx.request({
          method: 'POST',
          url: getApp().globalData.apiUrl,
          data: {
            action: 'get_channel_article_news'
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded' // 默认值
          },
          success: function (res) {
            if (res.data.result == 1) {
              wx.hideToast()
            }
            that.setData({
              list: res.data.data,
            })
          }
        });
      }
      if (e.target.dataset.current == 1) {
        wx.showToast({
          icon: "loading",
          title: "正在加载...",
          duration: 2000000,
        })
        wx.request({
          method: 'POST',
          url: getApp().globalData.apiUrl,
          data: {
            action: 'get_channel_article_food'
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded' // 默认值
          },
          success: function (res) {
            if (res.data.result == 1) {
              wx.hideToast()
            }
            that.setData({
              list: res.data.data,
            })
          }
        });
      }
      if (e.target.dataset.current == 2) {
        wx.showToast({
          icon: "loading",
          title: "正在加载...",
          duration: 2000000,
        })
        wx.request({
          method: 'POST',
          url: getApp().globalData.apiUrl,
          data: {
            action: 'get_channel_article_goods'
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded' // 默认值
          },
          success: function (res) {
            if (res.data.result == 1) {
              wx.hideToast()
            }
            console.log(res.data.data)
            that.setData({
              list: res.data.data,
            })
          }
        });
      }
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  }  ,

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

  showDetail: function(e) {
    wx.navigateTo({
      url: '/pages/detail2/detail2?type=' + this.data.currentTab + '&id=' + e.currentTarget.dataset.id,
    })
  }
})