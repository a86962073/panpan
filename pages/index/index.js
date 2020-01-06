//index.js
//获取应用实例
const app = getApp()
var call = require("../../utils/request.js")
Page({
  data: {
    slide: [{
      image_url: '../images/banner.png'
    }],
    page:1
  },
  //事件处理函数
  bindViewTap: function() {
  
  },
  towebview:function(e){
    if (e.currentTarget.dataset.id){
    wx.navigateTo({
      url: '../webview/webview?src=' + encodeURIComponent(e.currentTarget.dataset.id)
    })
    }
  },
  onLoad: function () {
    var that = this
    call.requestServerData("/api/foundation/website/banner/list", "POST",
      { page_name:'index'}
    ).then(function (data) {
      if (data.data.code == 0) {
        that.setData({
          banner: data.data.data
        })
      }
    }); //ajax
    call.requestServerData("/api/mall/goods/list", "POST",
      { page: that.data.page, page_size: 5 }
    ).then(function (data) {
      if (data.data.code == 0) {
        that.setData({
          indexdata: data.data.data
        })
      }
    }); //ajax
  },
  getUserInfo: function(e) {
  
  },
  onReachBottom: function () {
    var that = this
    that.setData({
      page:that.data.page+1
    })
    call.requestServerData("/api/mall/goods/list", "POST",
      { page: that.data.page, page_size: 5 }
    ).then(function (data) {
      if (data.data.code == 0) {
        console.log(that.data.indexdata.concat(data.data.data))
        that.setData({
          indexdata: that.data.indexdata.concat(data.data.data)
        })
      }
    }); //ajax
  },
  toProductInfo:function(e){
    wx.navigateTo({
      url: '../productInfo/productInfo?id='+e.currentTarget.dataset.id
    })
  },
})
