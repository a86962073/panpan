// pages/register/register.js
var call = require("../../utils/request.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [
      { name: '1  ', value: '男士', checked: true },
      { name: '2', value: '女士'},
    ],
    seleted: "",
    region: ['浙江省', '杭州市', '上城区'],
    city_code: [330000, 330100, 330102]
  },
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value,
      city_code: e.detail.code
    })
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
  bindKeyInput1: function (e) {
    console.log(e.detail.value)
    this.setData({
      real_name: e.detail.value
    })
  },
  bindKeyInput2: function (e) {
    this.setData({
      id_number: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  submit:function(){
    var that = this
    if (!that.data.real_name){
      wx.showToast({
        title: '请输入您的真实姓名',
        icon: 'none',
        duration: 2000,
      });
      return false
    }
    
    if (!(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(that.data.id_number))){
      wx.showToast({
        title: '请输入您的真实身份证',
        icon: 'none',
        duration: 2000,
      });
      return false
    }

    var sex=''
    for (var i=0;i<that.data.items.length;i++){
      if (that.data.items[i].checked == true){
        sex = that.data.items[i].name
      }
    }
    call.requestServerData("/api/foundation/user/real-name-auth", "POST",
      { real_name: that.data.real_name, id_number: that.data.id_number, sex: sex, metadata_province_id: that.data.city_code[0], metadata_city_id: that.data.city_code[1], metadata_district_id: that.data.city_code[2]}
    ).then(function (data) {
      if (data.data.code == 0) {
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