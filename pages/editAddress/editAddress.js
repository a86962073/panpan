// pages/addAddress/addAddress.js
var call = require("../../utils/request.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: ['广东省', '广州市', '海珠区'],
    switch1Checked:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id:options.id
    })
    var that = this
    call.requestServerData("/api/metadata/region/all-child", "POST",
      
      ).then(function (data) {
        if (data.data.code == 0) {
          
          that.setData({
            address2:data.data.data
          })
        } else {

        }
      })
    call.requestServerData("/api/mall/delivery-address/info", "POST",
      { id: options.id}
      ).then(function (data) {
        if (data.data.code == 0) {
          if (data.data.data.is_default==0){
            that.setData({
              switch1Checked: false
            })
          }
          var city_name = data.data.data.city_name
          if (data.data.data.city_name=='市辖区'){
            city_name = data.data.data.province_name
          }
          that.setData({
            indexdata: data.data.data,
            name: data.data.data.name,
            phone: data.data.data.phone,
            address: data.data.data.address,
            region: [data.data.data.province_name, city_name, data.data.data.district_name],
            code: [data.data.data.metadata_province_id, data.data.data.metadata_city_id, data.data.data.metadata_district_id]
          })
        } else {

        }
      })
  },
  bindRegionChange: function (e) {
    var that=this

    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value,
      code: e.detail.code
    })

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  deleta_btn:function(){
    var that=this
    wx.showModal({
      title: '删除',
      content: '确认要删除该项吗？',
      success: function (res) {
        if (res.confirm) {
          call.requestServerData("/api/mall/delivery-address/delete", "POST",
            { id: that.data.id }
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
    call.requestServerData("/api/mall/delivery-address/edit", "POST",
      { metadata_province_id: that.data.code[0], metadata_city_id: that.data.code[1], metadata_district_id: that.data.code[2], name: that.data.name, address: that.data.address, is_default: is_default, phone: that.data.phone, zip_code: 310000, area_code: 310000, mall_user_id:1,id:that.data.id}
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