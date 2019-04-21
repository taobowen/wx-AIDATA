// pages/useCenter/useCenter.js
Page({
  data: {
    hidden: true,
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: ''
  },

  onLoad:function(options){
    clearTimeout(setTimeout);
  },
  
  loadingTap: function () {
    // wx.showLoading({
    //   title: '加载中',
    // })
    // setTimeout(function () {
    //   wx.hideLoading()
    // }, 2000)
    var that = this
    that.setData({
      hidden: false
    });
    //设置2000毫秒后执行  
    setTimeout(function () {
      that.setData({
        hidden: true
      });
    }, 2000);
    wx.navigateTo({
      url: './Message/Message'
    })
  },

  seemoney: function () {
    var that = this
    that.setData({
      hidden: false
    });
    //设置2000毫秒后执行  
    setTimeout(function () {
      that.setData({
        hidden: true
      });
    }, 2000);
    wx.navigateTo({
      url: './money/money'
    })
  },

  seedetail:function(){
    var that = this
    that.setData({
      hidden: false
    });
    //设置2000毫秒后执行  
    setTimeout(function () {
      that.setData({
        hidden: true
      });
    }, 2000);
    wx.navigateTo({
      url: './uploaddata/uploaddata'
    })
  },

  seedetail2: function () {
    var that = this
    that.setData({
      hidden: false
    });
    //设置2000毫秒后执行  
    setTimeout(function () {
      that.setData({
        hidden: true
      });
    }, 2000);
    wx.navigateTo({
      title: "back",
      url: './releasetask/releasetask'
    })
  },
})