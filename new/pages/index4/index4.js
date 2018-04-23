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

  updateUser: function () {
    wx.showToast({
      icon: "loading",
      title: "正在加载...",
      duration: 2000000,
    })
    wx.request({
      method: 'POST',
      url: getApp().globalData.apiUrl,
      data: {
        action: 'add_or_update_user',
        openid: wx.getStorageSync('openId'),
        unionid: wx.getStorageSync('unionId'),
        photo: wx.getStorageSync('avatarUrl'),
        sex: wx.getStorageSync('sex') == 1 ? "男" : "女",
        nickname: wx.getStorageSync('nickName'),
        age: -1,
        phone: "",
        interest: "",
        latitude: wx.getStorageSync('latitude'),
        longitude: wx.getStorageSync('longitude'),
        accuracy: wx.getStorageSync('accuracy'),
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        console.log("log011")
        wx.hideToast()
        console.log(res)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

    if (wx.getStorageSync('unionId') == null || wx.getStorageSync('unionId') == '') { //没有unionId就登录
      wx.login({
        success: res => {
          if (res.code) {
            wx.request({
              method: 'POST',
              url: getApp().globalData.apiUrl,
              data: {
                action: 'getOpenId',
                code: res.code
              },
              header: {
                'content-type': 'application/x-www-form-urlencoded' // 默认值
              },
              success: res2 => {
                console.log("log002")
                console.log(res2)
                if (res2.data.unionid) {
                  wx.setStorageSync('unionId', res2.data.unionid)
                  wx.setStorageSync('openId', res2.data.openid)
                  wx.getUserInfo({
                    success: res3 => {
                      console.log("log010")
                      console.log(res3.userInfo)
                      if (res3.userInfo) {
                        wx.setStorageSync('nickName', res3.userInfo.nickName)
                        wx.setStorageSync('avatarUrl', res3.userInfo.avatarUrl)
                        wx.setStorageSync('sex', res3.userInfo.gender)
                      }
                    }
                  })
                  //wx.setStorageSync('openId', res2.data.openid);//存储openid
                } else {
                  console.log("log004, unionid is null")
                  wx.getUserInfo({
                    success: res3 => {
                      console.log("log005")
                      console.log(res3)
                      console.log(res2.data.obj.session_key)
                      wx.request({
                        method: 'POST',
                        url: getApp().globalData.apiUrl,
                        data: {
                          action: 'getUnionId',
                          session_key: res2.data.obj.session_key,
                          iv: res3.iv,
                          encryptedData: res3.encryptedData
                        },
                        header: {
                          'content-type': 'application/x-www-form-urlencoded' // 默认值
                        },
                        success: res4 => {
                          console.log("log006")
                          console.log(res4)
                          if (res4.data.data.userinfo.unionId) {
                            wx.setStorageSync('unionId', res4.data.data.userinfo.unionId)
                            wx.setStorageSync('openId', res4.data.data.userinfo.openId)
                            wx.setStorageSync('nickName', res4.data.data.userinfo.nickName)
                            wx.setStorageSync('avatarUrl', res4.data.data.userinfo.avatarUrl)
                            wx.setStorageSync('sex', res4.data.data.userinfo.gender)
                          }
                        }
                      })
                    }
                  })
                }
              }
            })
          }
        }
      })
      that.updateUser();
    }

    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy
        wx.setStorageSync('latitude', res.latitude);//纬度
        wx.setStorageSync('longitude', res.longitude);//精度
        wx.setStorageSync('accuracy', res.accuracy);//位置的精确度
        that.updateUser();
      }
    })

    that.updateUser();
    
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