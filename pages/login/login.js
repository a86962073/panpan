// pages/login/login.js
var call = require("../../utils/request.js")
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
    this.test()
  },
  test:function(){
    wx.login({
      success: function (res) {
        if (res.code) {
          console.log(res)
        }
      }
    })
  },
  bindGetUserInfo:function(e){
    wx.login({
      success: function (res) {
        if (res.code) {
          console.log(res)
          var data = e.detail.userInfo
          data.code = res.code
          call.requestServerData("/api/foundation/user/wx-mini-program-auth", "POST",
            data
          ).then(function (data) {
            if (data.data.code == 0) {
              var obj1 = JSON.parse(data.data.data)
              var token = obj1.token
              console.log(token)
              wx.setStorage({//存储到本地
                key: "token",
                data: obj1.token,
                 success: function (res) {
                   call.requestServerData("/api/foundation/user/user-info", "POST",
                   ).then(function (data) {
                     console.log(data)
                  
                   })
                 }
              })
             
            }else if(data.data.code==203004){
              wx.showToast({
                title: data.data.message,
                icon: 'none',
                duration: 2000,
              });
            }
          })
        }
      }
    })
   
  },
  topassword:function(){
    wx.navigateTo({
      url: '../password/password'
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
  bindKeyInput1: function (e) {
    console.log(e.detail.value)
    this.setData({
      phone: e.detail.value
    })
  },
  bindKeyInput2: function (e) {
    this.setData({
      password: e.detail.value
    })
  },
  login_btn:function(){

    var that=this
    call.requestServerData("/api/foundation/user/login", "POST",
      { phone: that.data.phone, password: that.data.password, }
    ).then(function (data) {
      if (data.data.code == 0) {
        wx.setStorage({//存储到本地
          key: "token",
          data: data.data.data
        })
        wx.switchTab({
          url: '../index/index'
        })
      }
    })
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