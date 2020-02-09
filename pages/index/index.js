//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    region:['陕西省','西安市','长安区'],
    now:'',
    cond_code:'999'
  },
  changeRegion: function (e) {
    console.log("此时选中的地区是：" + e.detail.value),
      this.setData({
        region: e.detail.value
      })
    this.getWeather(); //更新天气
  },
  // getLocation:function(){
  //   var that = this;
  //   wx.request({
  //     url: 'http://zhouxunwang.cn/data/?id=25',
  //   })
  // },
  getWeather:function(){
    //this不可以再wxAPI函数内部使用
    var that = this;  //let和var的区别：let指的是块级变量，var是全局变量
    wx.request({
      // 和风天气的url
      url: 'https://free-api.heweather.net/s6/weather/now?',
      data:{
        location:that.data.region[1],
        key:'8ec9b545f15544b3a079696b654cc856'
      },
      success:function(res){
        // console.log(res.data);
        that.setData({
          now:res.data.HeWeather6[0].now
        })
      }
    })
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
      this.getWeather();
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
