
module.exports.requestServerData = function (url, method, data,type) {
  return new Promise(function (resolve, reject) {
    var token=''
    wx.getStorage({
      key: 'token',
      complete: function (res) {
        token = res.data
        wx.request({
          url: "https://panpan-mini.100dp.com" + url,
          method: method,
          header: {
            'content-type': 'application/x-www-form-urlencoded',
            'token': token//MTgzNjg3ODE4NTh8fDE1NDgzNzg3NjZ8OHww
          },
          data: data,
          success: function (res) {
            if (res.data.status == 200) {
              if (res.data.code == 0) {
                resolve(res)
                 
              } else if (res.data.code == 10004 || res.data.code == 10005 && type!=true){
                console.log(type)
                wx.navigateTo({
                  url: '../login/login'
                })
              } else if (res.data.code == 404008 && type != true) {
                wx.navigateTo({
                  url: '../register/register'
                })
              } else if (res.data.code == 404002 && type != true) {
                wx.navigateTo({
                  url: '../login/login'
                })
              } else if (res.data.code == 404006&& type!=true) {
                wx.navigateTo({
                  url: '../register2/register'
                })
              } else if (type != true){
                wx.showToast({
                  title: res.data.message,
                  icon: 'none',
                  duration: 2000,
                });
              }
            } else {
              
            }
          },
          fail: function (res) {
            reject(res)
          }
        }) 
      }
      
    })
    
  
  })
}
var domin ='https://panpan-mini.100dp.com'
