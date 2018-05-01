var app = getApp()

Page(
  {

  data: {
    map_width: 380, 
    map_height: 380,
    markers: [
      {
        id: 0
        , iconPath: "../../images/location.png"
        , latitude: 39.0571
        , longitude: 117.06020
        , width: 30
        , height: 30
      }]
  }, 

  //show current position
  onLoad: function (options) {
    console.log(options.schedule_id);

    
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
        for (var index in res.data.data)
        {
          obj.id=index.id;
          obj.iconPath = "../../images/location.png";
          obj.latitude=index.latitude;
          obj.longtitude = index.longitude;
          obj.width=30;
          obj.height=30;
          
          that.data.markers=obj.concat(that.data.markers);
          that.setData({
            markers: that.data.markers
          });
        }
      }
    });


    // 获取定位，并把位置标示出来
    that.setData({
      latitude: wx.getStorageSync('latitude'),
      longitude: wx.getStorageSync('longitude'),
      
      markers: [
        {
          id: 0
          , iconPath: "../../images/location.png"
          , latitude: wx.getStorageSync('latitude')
          , longitude: wx.getStorageSync('longitude')
          , width: 30
          , height: 30
        }
      ]
    
    })

  
  }, 
  
  markertap(e) {
    console.log(e)
  },


 // 切换导航栏
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
  },


})