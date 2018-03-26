var t;
//require("../../utils/util.js"), 
getApp(), 
//require("../../utils/auth.js"); 
Page({ 
  data: { 
    imgUrls: [
      '../../images/ltlw.jpg',
      '../../images/ltlw2.jpg',
      '../../images/ltlw3.jpg'
    ],
    indicatorDots: false,
    autoplay: true,
    interval: 5000,
    duration: 2000,
    nation: "", 
    jwd: "", 
    com: "", 
    showLayout: 0, 
    showLayCon: 0,
    transformLeft: 0, 
    indexImg: "http://p.qpic.cn/automall_pic/0/20180208201640_72095/640" 
  }, 
  onLoad: function(options) {
    var that = this;
    var globalData = getApp().globalData;
    if (wx.getStorageSync('openId') == null || wx.getStorageSync('openId') == '') { //没有openId就登录
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
              console.log(res.userInfo);
              wx.setStorageSync('photo', res.userInfo.avatarUrl);//存储头像
              wx.setStorageSync('nickName', res.userInfo.nickName);//存储昵称
              wx.setStorageSync('sex', res.userInfo.gender);
            }
          });
        }
      });
    }

    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy
        console.log(latitude + "," + longitude + "," + speed + "," + accuracy);
        wx.setStorageSync('latitude', res.latitude);//纬度
        wx.setStorageSync('longitude', res.longitude);//精度
        wx.setStorageSync('accuracy', res.accuracy);//位置的精确度
      }
    })

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
        photo: wx.getStorageSync('photo'),
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
        wx.hideToast()
        console.log(res)
      }
    })

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
        action: 'get_channel_article_news_top5'
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        console.log(res)
        if (res.data.result == 1) {
          wx.hideToast()
        }
        that.setData({
          list: res.data.data,
        })
      }
    })

    wx.addCard({
      cardList: [
        {
          cardId: 'p8GQ5wpytA4-7ecutqatO850mFiI',
          cardExt: '{"code": "", "openid": "", "timestamp": "", "signature":""}'
        }
      ],
      success: function (res) {
        console.log("wx.addCard" + res.cardList) // 卡券添加结果
      },
      fail: res => {
        console.log(res) // 卡券添加结果
      }
    })
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
  }
})