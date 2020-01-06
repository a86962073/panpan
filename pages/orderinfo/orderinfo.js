// pages/orderInfo/orderinfo.js
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
    var that=this
    call.requestServerData("/api/mall/order/detail", "POST",
      { order_id : options.id }
    ).then(function (data) {
      that.setData({
        indexdata:data.data.data,
        id: options.id
      })
    }
    )
  },
  btn_cancel:function(){
    var that=this
    wx.showModal({
      title: '取消订单',
      content: '确认要取消订单吗？',
      success: function (res) {
        if (res.confirm) {
          call.requestServerData("/api/mall/order/cancel", "POST",
            { order_id: that.data.id }
          ).then(function (data) {
            if (data.data.code == 0) {
              wx.navigateBack({
                delta: 1,  // 返回上一级页面。
                success: function () {
                  console.log('成功！')
                }
              })
            } else {

            }
          })
        } else {
          console.log('点击取消回调')
        }
      }
    })
  },
  btn_confirm_delivered: function () {
    var that = this
    wx.showModal({
      title: '确认收货',
      content: '确认要确认收货吗？',
      success: function (res) {
        if (res.confirm) {
          call.requestServerData("/api/mall/order/confirm-delivered", "POST",
            { order_id: that.data.id }
          ).then(function (data) {
            if (data.data.code == 0) {
              wx.navigateBack({
                delta: 1,  // 返回上一级页面。
                success: function () {
                  console.log('成功！')
                }
              })
            } else {

            }
          })
        } else {
          console.log('点击取消回调')
        }
      }
    })
  },
  btn_delete: function () {
    var that = this
    wx.showModal({
      title: '删除订单',
      content: '确认要删除订单吗？',
      success: function (res) {
        if (res.confirm) {
          call.requestServerData("/api/mall/order/delete", "POST",
            { order_id: that.data.id }
          ).then(function (data) {
            if (data.data.code == 0) {
              wx.navigateBack({
                delta: 1,  // 返回上一级页面。
                success: function () {
                  console.log('成功！')
                }
              })
            } else {

            }
          })
        } else {
          console.log('点击取消回调')
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  btn_pay:function(){
    var that = this
    wx.requestSubscribeMessage({
      tmplIds: ['8VW6aNivKbcJoBF1Z5iPdk5pr95-OhT3aAavthdURMQ'],
      complete(res) {
        call.requestServerData("/api/mall/order/pay", "POST",
          { order_id: that.data.id, pay_method: 3 }
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