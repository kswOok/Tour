// pages/self/self.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    photo:'',
    nickName:'',
    sex:'',
    mobile:'',
    xueli:'',
    zhuanye:'',
    age:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (wx.getStorageSync('sex')==1){
      this.setData({
        photo: wx.getStorageSync('photo'),
        nickName: wx.getStorageSync('nickName'),
        sex: '男',
        mobile: wx.getStorageSync('mobile'),
        xueli: wx.getStorageSync('xueli'),
        zhuanye: wx.getStorageSync('zhuanye'),
        age: wx.getStorageSync('age'),
      })
    }else{
      this.setData({
        photo: wx.getStorageSync('photo'),
        nickName: wx.getStorageSync('nickName'),
        sex: '女',
        mobile: wx.getStorageSync('mobile'),
        xueli: wx.getStorageSync('xueli'),
        zhuanye: wx.getStorageSync('zhuanye'),
        age: wx.getStorageSync('age'),
      })
    }
    
   
  },
  updateName: function (e) {
    var that = this
    var updateType=1
    var param=e.detail.value
    that.update(param, updateType)
  },
  updateMobile: function (e) {
    var that = this
    var updateType = 2
    var param = e.detail.value
    that.update(param, updateType)
  },
  updateAge: function (e) {
    var that = this
    var updateType = 5
    var param = e.detail.value
    that.update(param, updateType)
  },
  updateXueli: function (e) {
    var that = this
    var updateType = 3
    var param = e.detail.value
    that.update(param, updateType)
  },
  updateZhuanye: function (e) {
    var that = this
    var updateType = 4
    var param = e.detail.value
    that.update(param, updateType)
  },
  update:function(param,updateType){
    var nickName='';
    var mobile = '';
    var xueli = '';
    var zhuanye = '';
    var age = '';
    updateType == 1 ? nickName = param : nickName =''
    updateType == 2 ? mobile = param : mobile = ''
    updateType == 3 ? xueli = param : xueli = ''
    updateType == 4 ? zhuanye = param : zhuanye = ''
    updateType == 5 ? age = param : age = ''
    wx.request({
      method: 'POST',
      url: getApp().globalData.baseUrl + "tools/school_api.ashx", //仅为示例，并非真实的接口地址
      data: {
        action:'updateUser',
        userId: wx.getStorageSync('userId'),
        nickName: nickName,
        mobile: mobile,
        xueli: xueli,
        zhuanye: zhuanye,
        age: age
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        console.log(res)
        updateType == 1 ? wx.setStorageSync('nickName', nickName) : ''
        updateType == 2 ? wx.setStorageSync('mobile', mobile) : ''
        updateType == 3 ? wx.setStorageSync('xueli', xueli) : ''
        updateType == 4 ? wx.setStorageSync('zhuanye', zhuanye) : ''
        updateType == 5 ? wx.setStorageSync('age', age) : ''
        
      }
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
  
  }
})