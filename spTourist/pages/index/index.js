var util = require('../../utils/util.js')
// pages/form/form.js
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
    // var year = util.formatTime(new Date).substr(0, 4)
    // var month = util.formatTime(new Date).substr(5, 2)
    // var day = util.formatTime(new Date).substr(8, 2)
    this.setData({
      _num: 1
    })
    var that = this
  
  },
  mMore: function (e) {
    console.log(this.data.mDisplay)
    if (this.data.mDisplay == false) {
      this.setData({
        mDisplay: true
      })
    } else {
      this.setData({
        mDisplay: false
      })
    }

  },
  bMore: function (e) {
    if (this.data.bDisplay == false) {
      this.setData({
        bDisplay: true
      })
    } else {
      this.setData({
        bDisplay: false
      })
    }

  },
  master: function (e) {
    this.setData({
      _num: 1
    })
  },
  bachelor: function (e) {
    this.setData({
      _num: 2
    })
  },
  mSchool: function (e) {
    // this.setData({
    //   schoolNum: e.detail.value,
    //   mSchoolListStr: this.data.mSchoolList[e.detail.value]
    // })
    wx.navigateTo({
      url: '../schoolSearch/schoolSearch?chooseType=1',
    })
  },
  mMajor: function (e) {
    this.setData({
      majorNum: e.detail.value,
      mMajorListMajorStr: this.data.mMajorList[e.detail.value]
    })
  },
  mTargetCountry: function (e) {
    this.setData({
      mTargetCountryNum: e.detail.value,
      mTargetCountryListStr: this.data.mTargetCountryList[e.detail.value]
    })
  },
  mTarget: function (e) {
    this.setData({
      targetNum: e.detail.value,
      mMajorListTargetStr: this.data.mMajorList[e.detail.value]
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