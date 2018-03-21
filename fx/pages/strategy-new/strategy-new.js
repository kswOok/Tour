
Page({ 
  data: { 
    brandList1: "", 
    noMissList: "",
    knowItem1: [{ Q: "谁可以享受退税购物？", A: [{ answer: "如果您是..." }, { answer: "如果您..." }] }, { Q: "我能退多少税？", A: [{ answer: "标准..."}]}], 
    showMore: !0, 
    slider: [], 
    loading: !1, 
    temp: "block" 
  }, 
  onLoad: function (n) { 
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
        action: 'get_brand_list'
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
          brandList1: res.data.data,
        })
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
        action: 'get_channel_article_goods'
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
          noMissList: res.data.data,
        })
      }
    })
  }, 
  onReady: function () { 

  }, 
  onShow: function () { 

  }, 
  onHide: function () { 

  }, 
  onUnload: function () { 

  }, 
  onPullDownRefresh: function () { 

  }, 
  onReachBottom: function () { 

  }, 
  onShareAppMessage: function () { 

  }, 
  checkMore: function (t) { 
    this.setData({ 
      showMore: !1 
    }) 
  }, 
  hide: function (t) { 
    this.setData({ 
      showMore: !0 
    }) 
  } 
});