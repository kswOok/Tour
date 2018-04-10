
Page({ 
  data: { 
    brandList1: "", 
    noMissList: "",
    knowItem1: [{ Q: "新西兰罗托鲁瓦的购物不具有机场退税等服务。所有商品与服务的标价中均含15%的货物与服务税(GST)。旅行者不可要求退税，但如果商家将高额货品邮寄到购买者所在国,则可以免税(GST)。旅行者想要退税就要到专门的免税店去购买。购买免税品时要记得携带护照。"}], 
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
        action: 'coupon_query_coupon',
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        wx.hideToast();
        that.setData({
          couponList: res.data.couponList
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
  },
  onAddCard: function (res) {

    wx.showToast({
      icon: "loading",
      title: "正在加载...",
      duration: 2000000,
    })

    wx.request({
      method: 'POST',
      url: getApp().globalData.apiUrl, //仅为示例，并非真实的接口地址
      data: {
        action: 'getAppCard',
        card_id: res.currentTarget.dataset.id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        wx.hideToast();
        wx.addCard({
          cardList: [
            {
              cardId: res.data.card_id,
              cardExt: '{"timestamp":"' + res.data.timestamp + '","signature":"' + res.data.signature + '"}'
            }
          ],
          success: res => {
            console.log(res) // 卡券添加结果
            wx.showToast({
              title: '领取成功',
            })
          },
          fail: res => {
            console.log(res) // 卡券添加结果
          }
        })
      },

    })
  },
});