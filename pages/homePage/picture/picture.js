// pages/homePage/detail/detail.js
// let common = require('../../homePage/homePage.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    detailObj: {},
  },

  accept: function () {
    wx.request({
      url: '',
      method: 'POST',
      header: {
        cookie: wx.getStorageSync('cookie')
      }
    })
  },

  seedetail: function (event) {
    console.log(event);
    let index = event.currentTarget.dataset.index
    wx.navigateTo({
      url: '/pages/homePage/detail/detail?index=' + index + '&data=' + JSON.stringify(this.data.data),
    })
  },

  seecomment: function () {
    wx.navigateTo({
      title: "see",
      url: './comment/comment'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let data = JSON.parse(options.data);
    console.log(data);
    this.setData({
      data:data
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