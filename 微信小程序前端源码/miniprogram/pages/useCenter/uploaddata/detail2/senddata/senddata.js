// pages/useCenter/uploaddata/detail2/senddata/senddata.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  formSubmit(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
  },
  formReset() {
    console.log('form发生了reset事件')
  },

  addpicture: function () {
    wx.chooseImage({
      success: function (res) {
        count: 1;
        sizeType: ['original', 'compressed'];
        sourceType: ['album', 'camera'];
        success: res => {
          var tempFilePaths = res.tempFilePaths;
          wx.setStorageSync('pictureurl', tempFilePaths)
          this.loadpicture;
        }
      },
    })
  },
  loadpicture: function () {
    var pictureurl = wx.getStorageSync('pictureurl');
    this.setData({ pictureurl: pictureurl });
  },

  uploadFile: function () {
    const tempFilePaths = res.tempFilePaths
    wx.uploadFile({
      url: 'https://tbw315.xyz', // 仅为示例，非真实的接口地址
      filePath: tempFilePaths[0],
      name: 'file',
      formData: {
        user: 'test'
      },
      success(res) {
        const data = res.data
        // do something
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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