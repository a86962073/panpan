// pages/orderInfo/orderinfo.js
var call = require("../../utils/request.js")
var option={}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    customer_mobile:''
  },
  bindKeyInput1: function (e) {
    console.log(e.detail.value)
    this.setData({
      customer_mobile: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    option = options
    console.log(option.delivery_address_id)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {
    var that = this
    var data = { attribute_map_id: option.attribute_map_id, number: option.number, gift_attribute_map_id: option.gift_attribute_map_id}
    if (option.delivery_address_id){
      data.delivery_address_id = option.delivery_address_id
    }
    console.log(option.delivery_address_id)
    call.requestServerData("/api/mall/order/preview-by-goods", "POST",
      data
    ).then(function (data) {
      if (data.data.code == 0) {
        that.setData({
          indexdata: data.data.data
        })
      }
    })
  },
  toaddress:function(){
    wx.navigateTo({
      url: '../address/address?attribute_map_id=' + option.attribute_map_id + '&number=' + option.number + '&gift_attribute_map_id=' + option.gift_attribute_map_id
    })
  },
  btn_pay:function(){
    var that=this
    if (that.data.indexdata.delivery_address.has_delivery_address == 0){
      wx.showToast({
        title: '请填写收货地址',
        icon: 'none',
        duration: 2000,
      });
      return false
    }
    if (!that.data.customer_mobile) {
      wx.showToast({
        title: '请输入顾客手机号码',
        icon: 'none',
        duration: 2000,
      });
      return false
    }
    wx.requestSubscribeMessage({
      tmplIds: ['8VW6aNivKbcJoBF1Z5iPdk5pr95-OhT3aAavthdURMQ'],
      complete(res) {
        call.requestServerData("/api/mall/order/place-order-by-goods", "POST",
          { attribute_map_id: option.attribute_map_id, number: option.number, gift_attribute_map_id: option.gift_attribute_map_id, point: 0, attribute_map_id: option.attribute_map_id, delivery_address_id: that.data.indexdata.delivery_address.id, pay_method: that.data.indexdata.pay_method_list[0].method, customer_mobile: that.data.customer_mobile }
        ).then(function (data) {
          if (data.data.code == 0) {
            var options = data.data.data
            wx.requestPayment({
              timeStamp: options.pay_info.pay_data.timeStamp.toString(),
              nonceStr: options.pay_info.pay_data.nonceStr,
              package: options.pay_info.pay_data.package,
              signType: options.pay_info.pay_data.signType,
              paySign: options.pay_info.pay_data.sign,
              total_fee: options.pay_info.pay_info.total_fee,
              success: function (res) {
                console.log(res)
                wx.navigateTo({
                  url: '../paysuccess/paysuccess'
                })//跳转
              }
            })
          }
        })
      },

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