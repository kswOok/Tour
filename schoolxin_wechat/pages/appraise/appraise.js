// pages/appraise/appraise.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this;
    var globalData = app.globalData;
    //globalData.openId = wx.getStorageSync('openId')

    if (wx.getStorageSync('openId') == null || wx.getStorageSync('openId') == '') { //没有openId就登录
      // 登录
      wx.login({
        success: function (res) {
          //console.log(res.code);

          wx.setStorageSync('code', res.code);//存储code
          wx.getUserInfo({
            success: function (res) {
              globalData.userInfo = res.userInfo
              if (globalData.userInfoReadyCallback) {
                globalData.userInfoReadyCallback(res)
              }

              var l = 'https://api.weixin.qq.com/sns/jscode2session?appid=wx1bb751d7d8712af4&secret=c0efc039a5d26c7e7d402a6c80f3834b&js_code=' + wx.getStorageSync('code') + '&grant_type=authorization_code';
              console.log(res.userInfo);
              var nickName = res.userInfo.nickName
              var avatarUrl = res.userInfo.avatarUrl
              var sex = res.userInfo.gender
              //console.log(nickName);
              //console.log(avatarUrl);
              var thats = that;
              wx.request({
                method: 'POST',
                url: getApp().globalData.baseUrl + "tools/school_api.ashx", //仅为示例，并非真实的接口地址
                data: {
                  action:'getOpenId',
                  code: wx.getStorageSync('code')
                },
                header: {
                  'content-type': 'application/x-www-form-urlencoded' // 默认值
                },
                success: function (res) {
                  wx.showToast({
                    icon: "loading",
                    title: "正在授权",
                    duration: 2000000,
                  })
                  var obj = {};
                  obj.openid = res.data.openId;
                  //obj.expires_in = Date.now() + res.data.expires_in;
                  console.log(obj.openid);
                  wx.setStorageSync('openId', obj.openid);//存储openid
                  var open = wx.getStorageSync('openId')
                  console.log(open);
                  var thatss = thats;
                  wx.request({
                    method: 'POST',
                    url: getApp().globalData.baseUrl + "tools/school_api.ashx", //仅为示例，并非真实的接口地址
                    data: {
                      action:'register',
                      openId: open,
                      nickName: nickName,
                      avatarUrl: avatarUrl,
                      sex:sex
                    },
                    header: {
                      'content-type': 'application/x-www-form-urlencoded' // 默认值
                    },
                    success: function (res) {
                      wx.hideToast()
                      wx.setStorageSync('userId', res.data.data.ID);//存储userId
                      wx.setStorageSync('photo', res.data.data.Picture);//存储头像
                      wx.setStorageSync('nickName', res.data.data.Name);//存储昵称
                      wx.setStorageSync('sex', res.data.data.Sex);
                      res.data.data.Age == null ? wx.setStorageSync('age', ''):wx.setStorageSync('age', res.data.data.Age);
                      res.data.data.Phone == null ? wx.setStorageSync('mobile', '') :wx.setStorageSync('mobile', res.data.data.Phone);
                      res.data.data.Xueli == null ? wx.setStorageSync('xueli', '') :wx.setStorageSync('xueli', res.data.data.Xueli);
                      res.data.data.Zhuanye == null ? wx.setStorageSync('zhuanye', '') :wx.setStorageSync('zhuanye', res.data.data.Zhuanye);
                    }
                  })
                }
              });

              //注册用户


              //typeof cb == "function" && cb(that.globalData.userInfo)
            },
            fail: function () {
              wx.showModal({
                title: '用户未授权',
                content: '如需正常使用小程序功能，请点击页面中任一图标重新授权。',
                showCancel: false,
                success: function (res) {
                  if (res.confirm) {
                    that.againLogin()
                
                  }
                }
              })
            }
          })
        }
      })
    } else {
      //缓存存在时直接从缓存中取
    }

  },
  academy: function (e) {
    wx.navigateTo({
      url: '../form/form',
    })
  },
  jump: function (e) {
    wx.navigateTo({
      url: '../record/record',
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
  againLogin: function () {
    var globalData = app.globalData;
    var that = this;
    wx.login({
      success: function (res) {
        //console.log(res.code);
        wx.setStorageSync('code', res.code);//存储code
        wx.openSetting({
          success: function (res) {

            if (!res.authSetting["scope.userInfo"] || !res.authSetting["scope.userLocation"]) {

              wx.getUserInfo({
                success: function (res) {
                  
                  globalData.userInfo = res.userInfo
                  if (globalData.userInfoReadyCallback) {
                    globalData.userInfoReadyCallback(res)
                  }

                  var l = 'https://api.weixin.qq.com/sns/jscode2session?appid=wx248d2f924d55ed20&secret=b38102277348d31879ab728cf670b76e&js_code=' + wx.getStorageSync('code') + '&grant_type=authorization_code';
                  console.log(res.userInfo);
                  var nickName = res.userInfo.nickName
                  var avatarUrl = res.userInfo.avatarUrl
                  //console.log(nickName);
                  //console.log(avatarUrl);
                  var thats = that;
                  wx.request({
                    method: 'POST',
                    url: getApp().globalData.baseUrl + "data/user/getOpenId.do?", //仅为示例，并非真实的接口地址
                    data: {
                      code: wx.getStorageSync('code')
                    },
                    header: {
                      'content-type': 'application/x-www-form-urlencoded' // 默认值
                    },
                    success: function (res) {
                      wx.showToast({
                        icon: "loading",
                        title: "正在授权",
                        duration: 2000000,
                      })
                      var obj = {};
                      obj.openid = res.data.openId;
                      //obj.expires_in = Date.now() + res.data.expires_in;
                      console.log(obj.openid);
                      wx.setStorageSync('openId', obj.openid);//存储openid
                      var open = wx.getStorageSync('openId')
                      console.log(open);
                      var thatss = thats;
                      wx.request({
                        method: 'POST',
                        url: getApp().globalData.baseUrl + "data/user/register.do?", //仅为示例，并非真实的接口地址
                        data: {
                          openId: open,
                          nickName: nickName,
                          avatarUrl: avatarUrl,
                          pId: thatss.data.pId
                        },
                        header: {
                          'content-type': 'application/x-www-form-urlencoded' // 默认值
                        },
                        success: function (res) {
                          wx.hideToast()
                          wx.setStorageSync('userId', res.data.data.ID);//存储userId
                          wx.setStorageSync('photo', res.data.data.Picture);//存储头像
                          wx.setStorageSync('nickName', res.data.data.Name);//存储昵称
                          wx.setStorageSync('sex', res.data.data.Sex);
                          res.data.data.Age == null ? wx.setStorageSync('age', '') : wx.setStorageSync('age', res.data.data.Age);
                          res.data.data.Phone == null ? wx.setStorageSync('mobile', '') : wx.setStorageSync('mobile', res.data.data.Phone);
                          res.data.data.Xueli == null ? wx.setStorageSync('xueli', '') : wx.setStorageSync('xueli', res.data.data.Xueli);
                          res.data.data.Zhuanye == null ? wx.setStorageSync('zhuanye', '') : wx.setStorageSync('zhuanye', res.data.data.Zhuanye);
                        }
                      })
                    }
                  });
                }, fail: function () {
                  that.againLogin()
                }
              })
            }

          }
        })
      }
    })
  }
})