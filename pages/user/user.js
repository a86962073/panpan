// pages/user/user.js
var call = require("../../utils/request.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    login: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
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
    var that = this
    call.requestServerData("/api/foundation/user/user-info", "POST",
    '',true).then(function (data) {
      console.log(data)
      if (data.data.code == 0) {
        that.setData({
          indexdata: data.data.data,
          login: true
        })
      } else {

      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },
  edit:function(){
    var that = this
    call.requestServerData("/api/foundation/user/logout", "POST",
      '', true).then(function (data) {
        
        if (data.data.code == 0) {
          wx.showToast({
            title: '退出登录成功',
            icon: 'none',
            duration: 2000,
          });
          that.setData({
            login:false
          })
        } else {

        }
      })
  },
  tologin:function(){
    wx.navigateTo({
      url: '../login/login'
    })
  },
  topassword: function () {
    wx.navigateTo({
      url: '../password/password'
    })
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