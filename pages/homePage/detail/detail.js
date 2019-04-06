Page({
  /**
   * 页面的初始数据
   */
  data: {
    detailObj: {},
  },

  accept:function(){
    wx.request({
      url: 'https://tbw315.xyz/wechat/taskAccepting/',
      method: 'POST',
      header:{
        'content-type': 'application/x-www-form-urlencoded',
        'cookie': wx.getStorageSync('cookie'),
        'X-CSRFToken': wx.getStorageSync('CSRFtoken')
      },
      data:{
        'taskId': this.data.detailObj.task_inc_id
      },
      success: function (res) {
        if (res.data['msg'] == 'ok')
          wx.showToast({
            title: '接受成功',
            icon: 'success',
            duration: 1000
          })
        else
          wx.showToast({
            title: '接受失败',
            icon: '/images/fail.jpg',
            duration: 2000
          })
      }
    })
  },

  seecomment:function(){
    wx.navigateTo({
      title: "see",
      url: './comment/comment'
    })
  },
    
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    let index = options.index;
    let data = JSON.parse(options.data);
    console.log(data);
    this.setData({
      //把引入的数据根据下标对应放到detailObj中
      detailObj: data.taskList[index],
      //index也存放起来
      index: index
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