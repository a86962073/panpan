// pages/password/password.js
var call = require("../../utils/request.js")
var btn = true
Page({

  /**
   * 页面的初始数据
   */
  data: {
    seleted: "",
    countDownNum: '60',//倒计时初始值,
    code: true,
    phone: ''
  },
  code: function () {
    var that = this
    if (btn == true) {
      btn = false
      setTimeout(function () {
        btn = true
      }, 1000)
      if (that.data.phone.length == 11) {
        call.requestServerData("/api/foundation/user/send-captcha", "POST",
          { scene: 'forget-password', phone: that.data.phone }
        ).then(function (data) {
          var myDate = Date.parse(new Date())
          myDate = myDate / 1000 + 60
          wx.setStorage({//存储到本地
            key: "time1",
            data: myDate
          })
          wx.showToast({
            title: '验证码已发送',
            icon: 'none',
            duration: 2000,
          });
          that.countDown();
        }); //ajax
      } else {
        wx.showToast({
          title: '请输入正确的手机号',
          icon: 'none',
          duration: 2000,
        });
      }
    }
  },
  countDown: function () {
    let that = this;
    that.setData({
      code: false
    })
    let countDownNum = that.data.countDownNum;//获取倒计时初始值
    //如果将定时器设置在外面，那么用户就看不到countDownNum的数值动态变化，所以要把定时器存进data里面
    that.setData({
      timer: setInterval(function () {//这里把setInterval赋值给变量名为timer的变量
        //每隔一秒countDownNum就减一，实现同步
        countDownNum--;
        //然后把countDownNum存进data，好让用户知道时间在倒计着
        that.setData({
          countDownNum: countDownNum
        })
        //在倒计时还未到0时，这中间可以做其他的事情，按项目需求来
        if (countDownNum == 0) {
          //这里特别要注意，计时器是始终一直在走的，如果你的时间为0，那么就要关掉定时器！不然相当耗性能
          //因为timer是存在data里面的，所以在关掉时，也要在data里取出后再关闭
          clearInterval(that.data.timer);
          //关闭定时器之后，可作其他处理codes go here
          that.setData({
            countDownNum: 60,
            code: true
          })
        }
      }, 1000)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  submit:function(){
    var that = this
    if (this.data.phone.length != 11) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none',
        duration: 2000,
      });
      return false
    }
    if (!this.data.codenumber) {
      wx.showToast({
        title: '请输入验证码',
        icon: 'none',
        duration: 2000,
      });
      return false
    }
    if (!this.data.password) {
      wx.showToast({
        title: '请输入密码',
        icon: 'none',
        duration: 2000,
      });
      return false
    }

            
             
              call.requestServerData("/api/foundation/user/verify-captcha", "POST",
                { phone: that.data.phone, password: that.data.password, scene: 'forget-password', code: that.data.codenumber }
              ).then(function (data) {
                if (data.data.code == 0) {
                  var obj1 = JSON.parse(data.data.data)
                  var token = obj1.token
                  console.log(token)
                  wx.setStorage({//存储到本地
                    key: "token",
                    data: obj1.token
                  })
                  wx.switchTab({
                    url: '../index/index'
                  })
                }
              })
      

  },
  toLogin:function(){
    wx.navigateTo({
      url: '../login/login'
    })
  },
  bindKeyInput1: function (e) {
    console.log(e.detail.value)
    this.setData({
      phone: e.detail.value
    })
  },
  bindKeyInput2: function (e) {
    this.setData({
      codenumber: e.detail.value
    })
  },
  bindKeyInput3: function (e) {
    this.setData({
      password: e.detail.value
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