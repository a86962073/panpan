// pages/addAddress/addAddress.js
var call = require("../../utils/request.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: ['浙江省', '杭州市', '上城区'],
    switch1Checked:true,
    city_code:[330000,330100,330102]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value,
      city_code: e.detail.code
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  bindKeyInput1: function (e) {
    console.log(e.detail.value)
    this.setData({
      name: e.detail.value
    })
  },
  bindKeyInput2: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  bindKeyInput3: function (e) {
    this.setData({
      address: e.detail.value
    })
  },
  save_btn:function(){
    var that=this
    var is_default
    if (that.data.switch1Checked==true){
      is_default=1
    }else{
      is_default = 0
    }
    call.requestServerData("/api/mall/delivery-address/add", "POST",
      { metadata_province_id: that.data.city_code[0], metadata_city_id: that.data.city_code[1], metadata_district_id: that.data.city_code[2], name: that.data.name, address: that.data.address, is_default: is_default, phone: that.data.phone, zip_code: 310000, area_code: 310000, mall_user_id:1}
    ).then(function (data) {
      wx.navigateBack({
        delta: 1,  // 返回上一级页面。
        success: function () {
          console.log('成功！')
        }
      })
    })
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