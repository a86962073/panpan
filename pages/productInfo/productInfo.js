// pages/productInfo/productInfo.js
var call = require("../../utils/request.js")
var wxParse = require('../../wxParse/wxParse.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    num: 1,
    minusStatus: 'disabled',
    active:true,
    active1:0,
  },
  look:function(){
    this.setData({
      active: false,
      active1:1
    })
  },
  radioChange:function(e){
    this.setData({
      gift_attribute_map_id: e.detail.value
    })
  },
  spec: function () {
    this.setData({
      active: false,
      active1:2
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  bindMinus: function () {
    var num = this.data.num; 
    if (num > 1) {
      num--;
    }
    var minusStatus = num <= 1 ? 'disabled' : 'normal';

    this.setData({
      num: num,
      minusStatus: minusStatus
    });
  },
  bindPlus: function () {
    var num = this.data.num;
    num++;

    var minusStatus = num < 1 ? 'disabled' : 'normal';
    this.setData({
      num: num,
      minusStatus: minusStatus
      
    });
  },
  mark:function(){
    this.setData({
      active:true,
    });
  },
  buy_btn:function(){
    var that=this
    var gift_attribute_map_id=''
    if(that.data.product==false){
      wx.showToast({
        title: '请选择规格',
        icon: 'none',
        duration: 2000,
      });
      return false
    }
    if (this.data.indexdata.gift_list[0]){
      gift_attribute_map_id=that.data.gift_attribute_map_id
    }
    var that = this
    var data = { attribute_map_id: this.data.indexdata.attribute_map_list[this.data.indexflex].attribute_map_id, number: this.data.num, gift_attribute_map_id: gift_attribute_map_id}
    call.requestServerData("/api/mall/order/preview-by-goods", "POST",
      data
    ).then(function (data) {
      if (data.data.code == 0) {
        wx.navigateTo({
          url: '../orderpay/orderpay?attribute_map_id=' + that.data.indexdata.attribute_map_list[that.data.indexflex].attribute_map_id + '&number=' + that.data.num + '&gift_attribute_map_id=' + gift_attribute_map_id
        })
      }
    })
   
  },
  change:function(e){
      console.log(e)
      var that=this
    if (e.currentTarget.dataset.type){
      that.data.indexdata.attribute_list.forEach(function (item2, index2) {
        item2.data.forEach(function (item, index) {
          if (item.id == e.currentTarget.dataset.id) {
            console.log(index2)
            if (e.currentTarget.dataset.type == "active") {
              item.active = 'active2'
              that.setData({
                indexdata: that.data.indexdata
              })
            } else {
              item2.data.forEach(function (item3, index3) {
                item3.active = 'active2'
              })
              item.active = 'active'
              that.setData({
                indexdata: that.data.indexdata
              })
            }

          }

        })

      })
    }
    that.checkGoods()
  },
  checkGoods:function(){
    var that=this
    var array=[]
    var arrayList=[]
    that.data.indexdata.attribute_list.forEach(function (item2, index2) {
      item2.data.forEach(function (item, index) {
            if(item.active=='active'){
              array.push(item.id)
            }
          })
    })
    var check=false
    that.data.indexdata.attribute_map_list.forEach(function (item, index) {
      arrayList.push(item.attribute_id_set.split(","))
      if(that.ArrayIsEqual(array, item.attribute_id_set.split(","))){
        check=true
        that.setData({
          product: item.attribute_map_id,
          indexflex:index
        })
      }else{
        if (check==false){
        that.setData({
          product: false
        })
        }
      }
    })
    that.setData({
      array: array,
      arrayList: arrayList
    })
    that.ArrayIsEqual2(array, arrayList)
  },
  ArrayIsEqual2: function (arr1, arr2){
    var that=this
    var newarr=[]
      for (let n in arr2) {
        var check = 0 //相同个数
        for(let m in arr2[n]){
          for (let i in arr1) {
          if (arr2[n][m] == arr1[i]){
            check++
          }
          }
        }
        if (check +1 == arr1.length || check == arr1.length){
          newarr = that.concat_(arr2[n], newarr)
        }
      }
    var indexdata = that.data.indexdata
    console.log(newarr)
      for (var n = 0; indexdata.attribute_list.length > n; n++) {
        for (var j = 0; indexdata.attribute_list[n].data.length > j; j++) {
          var p=0
          for (let i in newarr) {
          if (indexdata.attribute_list[n].data[j].active=='active'){
            p++
          }else{
            if (newarr[i] == indexdata.attribute_list[n].data[j].id) {
              indexdata.attribute_list[n].data[j].active='active2'
              p++
            } else {
              
            }
          }

        }
          if(p==0){
            indexdata.attribute_list[n].data[j].active = ''
          }
        }
      }
 
    that.setData({
      indexdata: indexdata
    })
  },
  concat_ :function (arr1, arr2) {
    //不要直接使用var arr = arr1，这样arr只是arr1的一个引用，两者的修改会互相影响
    var arr = arr1.concat();
    //或者使用slice()复制，var arr = arr1.slice(0)
    for (var i = 0; i < arr2.length; i++) {
      arr.indexOf(arr2[i]) === -1 ? arr.push(arr2[i]) : 0;
    }
    return arr;
  },
  ArrayIsEqual: function(arr1, arr2){
    if(arr1=== arr2){
      return true;
    }else {
  if (arr1.length != arr2.length) {
    return false;
  } else {//长度相同
    for (let i in arr1) {
      if (arr1[i] != arr2[i]) {
        return false;
      }
    }
    return true;
  }
}
},

  /* 输入框事件 */
  bindManual: function (e) {
    var num = e.detail.value;
    // 将数值与状态写回  
    this.setData({
      num: num
    });
  },
  onLoad: function (options) {
    var that=this
    var id = options.id
    that.setData({
      id: options.id
    })
    call.requestServerData("/api/mall/goods/detail", "POST",
      { goods_id : id } 
    ).then(function (data) {
      var indexdata = data.data.data
      var arrar=[]
      console.log(indexdata.attribute_map_list)
      for (var i=0; indexdata.attribute_map_list.length>i;i++){
        console.log(indexdata.attribute_map_list[i].is_bind)
        if (indexdata.attribute_map_list[i].is_bind==1){
          that.setData({
            indexflex:i,
          })
          arrar=indexdata.attribute_map_list[i].attribute_id_set_asc.split(",");
          console.log(arrar)
        }
      }
      wxParse.wxParse('article', 'html', indexdata.detail, that, 5); 
      if (indexdata.gift_list[0]){
      indexdata.gift_list[0].checked=true
        that.setData({
          gift_attribute_map_id: indexdata.gift_list[0].gift_attribute_map_id
        })
      }
      console.log(arrar)
      for (var i = 0; i<arrar.length;i++){
        for (var n = 0; indexdata.attribute_list.length > n; n++) {
          for (var j = 0; indexdata.attribute_list[i].data.length > j; j++) {
            if (arrar[i] == indexdata.attribute_list[i].data[j].id){
              indexdata.attribute_list[i].data[j].active='active'
              
            }else{
              indexdata.attribute_list[i].data[j].active = ''
            }
          }
        }
      }
      that.setData({
        indexdata: indexdata,
      })
      that.checkGoods()
    });
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