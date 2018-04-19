const { Tab, extend } = require('../../dist/index');
var t;
//require("../../utils/util.js"), 
getApp(), 
//require("../../utils/auth.js"); 
Page({ 

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

  data: { 
    imgUrls: [
      '../../images/aa1.jpg',
      '../../images/ltlw2.jpg'
    ],
    indicatorDots: false,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    nation: "", 
    jwd: "", 
    com: "", 
    showLayout: 0, 
    showLayCon: 0,
    transformLeft: 0, 
    indexImg: "http://p.qpic.cn/automall_pic/0/20180208201640_72095/640" ,
    list: [
      {
        id: 1,
        img_url: '../../images/hot.png',
        title: '地狱之门地热公园',
        title: '罗托鲁瓦最活跃的地热保护区',
        youhui:'门票9.6折优惠',
        juli:'3.5km'
        
      },
      {
        id: 2,
        img_url: '../../images/coffee.jpg',
        title: 'Capers Epicurean咖啡简餐厅',
        title: '当地最有名气的咖啡简餐厅',
        youhui: '8折优惠券',
        juli: '6.5km'
      }
    ]
  }, 
  onLoad: function(options) {
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

    /*wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        wx.openLocation({
          latitude: latitude,
          longitude: longitude,
          scale: 28
        })
      }
    })*/

    var that = this;
    this.setData({
      sort_method: {
        list: [{
          id: 'meishi',
          title: '美食'
        }, {
          id: 'gouwu',
          title: '购物'
        }, {
          id: 'jingdian',
          title: '景点'
        }],
        selectedId: ''
      }
    })

    /*wx.showToast({
      icon: "loading",
      title: "正在加载...",
      duration: 2000000,
    })*/
    /*wx.request({
      method: 'POST',
      url: getApp().globalData.apiUrl,
      data: {
        action: 'get_channel_article_news_top5'
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
    })*/

    /*wx.request({
      method: 'POST',
      url: getApp().globalData.apiUrl,
      data: {
        action: 'coupon_query_coupon',
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        wx.hideToast();
        that.setData({
          list: res.data.couponList
        })
      }
    })*/

    /*wx.request({
      method: 'POST',
      url: getApp().globalData.apiUrl, //仅为示例，并非真实的接口地址
      data: {
        action: 'getAppCard',
        card_id: 'p8GQ5wpytA4-7ecutqatO850mFiI'
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        wx.addCard({
          cardList: [
            {
              cardId: res.data.card_id,
              cardExt: '{"timestamp":"' + res.data.timestamp + '","signature":"' + res.data.signature + '"}'
            }
          ],
          success: function (res) {
            console.log(res.cardList) // 卡券添加结果
            wx.showToast({
              title: res.cardList,
            })
          },
          fail: res => {
            console.log(res) // 卡券添加结果
          }
        })
      }
    })*/
  },
  onShow: function () { 
    var a = (t = this).data.transformLeft; 
    t.data.transformY; 
    wx.onAccelerometerChange(function (n) { 
      n.x > 0 ? a += 2 : n.x < 0 && (a -= 2), 
      a > 12 ? a -= 2 : a < -12 && (a += 2), 
      t.setData({ 
        transformLeft: a 
      })
    }) 
  }, 
  autoTel: function () { 
    this.setData({ 
      showLayout: 1, 
      showLayCon: 1 
    }) 
  }, 
  hideLayout: function () { 
    this.setData({ 
      showLayout: 0, 
      showLayCon: 0 
    }) 
  }, 
  emergencyCalls: function () { 
    wx.makePhoneCall({ 
      phoneNumber: "112" 
    }) 
  }, 
  ploliceCalls: function () { 
    wx.makePhoneCall({ 
      phoneNumber: "+358408677838" 
    }) 
  }, 
  cancleCalls: function () { 
    this.setData({ 
      showLayout: 0, 
      showLayCon: 0 
    }) 
  }, 
  onShareAppMessage: function (t) { 
    return { 
      title: "罗托鲁瓦最in攻略、最hot推荐、最全指南，尽在“发现罗托鲁瓦", 
      path: "/pages/index2/index2", 
      success: function (t) { }, 
      fail: function (t) { } 
    } 
  },
  showDetail: function(t) {
    wx.navigateTo({
      url: '/pages/detail/detail',
    })
  },
  onBtnMeishi: function() {
    var that = this
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
        console.log(res.data.data)
        that.setData({
          list: res.data.data,
        })
      }
    })
  },
  onBtnGouwu: function () {
    var that = this
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
    })
  },
  onBtnJingdian: function () {
    var that = this
    wx.showToast({
      icon: "loading",
      title: "正在加载...",
      duration: 2000000,
    })
    wx.request({
      method: 'POST',
      url: getApp().globalData.apiUrl,
      data: {
        action: 'get_channel_article_guidance'
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
    })
  },
  _handleZanTabChange(e) {
    //var componentId = e.componentId;
    var id = e.currentTarget.dataset.itemId;
    if(id === "meishi") {
      var that = this
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
          console.log(res.data.data)
          that.setData({
            list: res.data.data,
          })
        }
      })
    }
    if (id === "gouwu") {
      var that = this
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
      })
    }
    if (id === "jingdian") {
      var that = this
      wx.showToast({
        icon: "loading",
        title: "正在加载...",
        duration: 2000000,
      })
      wx.request({
        method: 'POST',
        url: getApp().globalData.apiUrl,
        data: {
          action: 'get_channel_article_guidance'
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
      })
    }
    
  }
})