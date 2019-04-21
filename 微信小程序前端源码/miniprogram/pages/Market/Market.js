// pages/homePage/homePage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0
  },

  onLoad: function (options) {
    let scrollHeight = wx.getSystemInfoSync().windowHeight-100;
    this.setData({
      scrollHeight: scrollHeight
    })
    
  },

  bindchange: function (e) {
    const that = this;
    that.setData({
      currentTab: e.detail.current
    })
  },

  switchNav: function (e) {
    console.log(e);
    var page = this;
    var id = e.target.id;
    if (this.data.currentTab == id) {
      return false;
    } else {
      page.setData({ currentTab: id });
    }
  },

  seedetail: function (event) {
    console.log(event);
    let index = event.currentTarget.dataset.index
    wx.navigateTo({
      url: './detail/detail?index=' + index + '&data=' + JSON.stringify(this.data.data),
    })
  },
})  