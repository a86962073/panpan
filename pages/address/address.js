// pages/address/address.js
var call = require("../../utils/request.js")
var option={}
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
    option = options
  },
  toedit: function (e){
    console.log(e)
    wx.navigateTo({
      url: '../editAddress/editAddress?id=' + e.currentTarget.dataset.id
    })
  },
  toadd:function(){
    wx.navigateTo({
      url: '../addAddress/addAddress'
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
    var that=this
    call.requestServerData("/api/mall/delivery-address/list", "POST",
      {}
    ).then(function (data) {
      if (data.data.code == 0) {
        that.setData({
          indexdata: data.data.data
        })
      }
    }); //ajax
  },
  goback:function(e){
    wx.navigateTo({
      url: '../orderpay/orderpay?attribute_map_id=' + option.attribute_map_id + '&number=' + option.number + '&gift_attribute_map_id=' + option.gift_attribute_map_id +'&delivery_address_id='+e.currentTarget.dataset.id
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