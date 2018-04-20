// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    attractiondetail: {
      Address: "400 Broad St, Seattle, WA 98109",
      Audio: "https://miniapp.blob.core.chinacloudapi.cn/ceseattle/audio/2363e183-4d9f-46ed-bd8b-fb5306d85ee7.mp3",
      ChieneseAddress:  "Hells Gate",
      ChieneseAudio  :  "https://miniapp.blob.core.chinacloudapi.cn/ceseattle/audio/6d2895c1-baf5-4a55-a30f-fdd74cfe060d.mp3",
      ChieneseDescription:  "地狱之门地热公园是Rotorua罗托鲁瓦最活跃的地热保护区。占地超过20公顷，具有2.5公里的天然地热景观步道，保护区内拥有丰富的地热景观，热气腾腾的喷气孔和热浪翻滚的泥浆池。这里仿佛是《魔戒》电影中生产兽人的地方，喷气孔、热水湖、硫磺晶体和沉淀物随处可见。游客还可以沿着古代毛利战士走过的步道漫步于保护区内，欣赏到南半球最大的热水瀑布——卡卡西瀑布（Kakahi Falls），这里曾经是毛利战士从战场上归来之后沐浴疗养的地方，含有硫磺的热水可使其伤口愈合，并洗尽战争带来的“创伤”。Hells Gate“地狱之门”还拥有新西兰独特的地热泥浆浴池，任何一个人都不会错过罗托鲁瓦最出名的泥浆浴。将温热的泥浆敷满全身，渐渐感觉到皮肤的紧绷，根本不用等到泥浆完全干燥，就可以洗去泥浆，再跳进直接采自地热温泉的硫磺池。紧绷的皮肤在温热的泉水中变得湿润光滑，全身每个毛孔都舒畅起来。",
      descriptionshortchinese: "地狱之门地热公园是Rotorua罗托鲁瓦最活跃的地热保护区。占地超过20公顷，具有2.5公里的天然地热景观步道，保护区内拥有丰富的地热景观，热气腾腾的喷气孔和热浪翻滚的泥浆池。",
      descriptionshortenglish: "景区讲解自由行客人：每天上午9: 30 & 午1:30 英文讲解（免费） 常规散拼团：提供中文讲解，需地接社提前预定（免费） 地狱之门网站: http://www.hellsgate.co.nz/  官方微博： http://e.weibo.com/waioraspa 地址：351 State Highway 30, Tikitere, Rotorua 景区电话Ph: +64 7 345 3151",
      ChieneseName      :      "地狱之门地热保护区",
      ChieneseVisitDuration      :      "1小时",
      ChieneseVisitTimings      :      "星期日 - 星期四 上午10点 – 晚上8点 星期五- 星期六 上午9点- 晚上9点",
      ContactPhone      :      "(206) 905-2111",
      Description: "景区讲解自由行客人：每天上午9: 30 & 午1:30 英文讲解（免费） 常规散拼团：提供中文讲解，需地接社提前预定（免费） 地狱之门网站: http://www.hellsgate.co.nz/  官方微博： http://e.weibo.com/waioraspa 地址：351 State Highway 30, Tikitere, Rotorua 景区电话Ph: +64 7 345 3151",
      Id      :      "fdc4f6e6-0c3f-4b93-8ed4-85e09d4f3d71",
      Image:      "../../images/hellsgate.jpg",
      Latitude      :      "47.62049",
      Longitude      :      "-122.34923",
      Name      :      "Hells Gate",
      VisitDuration      :      "3hrs",
      VisitTimings      :      "Sun - Thu 10AM - 8PM  Fri - Sat 9AM- 9PM",
      category      :      "Food",
      categoryChinese      :      "景点",
    },

    shortchinese: true,
    shortenglish: true,
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.type == 0) {
      this.setData({
        category: '景点'
      })
      this.showDetail("get_channel_article_news_detail", options.id);
    }
    if (options.type == 1) {
      this.setData({
        category: '美食'
      })
      this.showDetail("get_channel_article_food_detail", options.id);
    }
    if (options.type == 2) {
      this.setData({
        category: '购物'
      })
      this.showDetail("get_channel_article_goods_detail", options.id);
    }
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
  showmore: function (t) {
    "english" == t.currentTarget.dataset.language ? this.setData({
      shortenglish: false
    }) : this.setData({
      shortchinese: false
    });
  },
  showless: function (t) {
    "english" == t.currentTarget.dataset.language ? this.setData({
      shortenglish: true
    }) : this.setData({
      shortchinese: true
    });
  },

  showDetail: function (api, id) {
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
        action: api,
        id: id
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
          //list: res.data.data,
          attractiondetail: {
            ChieneseName: res.data.data.title,
            Image: "http://guomengtech.com/" + res.data.data.img_url,
            ChieneseVisitDuration: "1小时",
          }
        })
      }
    });
  },
})