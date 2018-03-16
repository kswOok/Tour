var t;
//require("../../utils/util.js"), 
getApp(), 
//require("../../utils/auth.js"); 
Page({ 
  data: { 
    nation: "", 
    jwd: "", 
    com: "", 
    showLayout: 0, 
    showLayCon: 0,
    transformLeft: 0, 
    indexImg: "http://p.qpic.cn/automall_pic/0/20180208201640_72095/640" 
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