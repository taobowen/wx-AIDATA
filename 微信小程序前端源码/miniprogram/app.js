//app.js
App({
  // get:function(){
  //   wx.request({
  //     url: '',
  //     method: '',
  //     header:{
  //       cookie:wx.getStorageSync('cookie')
  //     }
  //   })
  // },
  onLoad:function(){
    
  },
  onLaunch: function () {
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      // wx.cloud.init({
      //   traceUser: true,
      // })
    }
   
    this.onLoad();
    this.globalData = {}
  },

  formsubmit:function(){

  }
})
