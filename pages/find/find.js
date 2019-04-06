Page({
  /**
   * 页面的初始数据
   */
  data: {
    currentData: 0,
    selectPerson: true,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { 
    let scrollHeight = wx.getSystemInfoSync().windowHeight-32;
    this.setData({
      scrollHeight: scrollHeight
    })
  },
  //获取当前滑块的index
  bindchange: function (e) {
    const that = this;
    that.setData({
      currentData: e.detail.current
    })
  },
  //点击切换，滑块index赋值
  checkCurrent: function (e) {
    const that = this;
    if (that.data.currentData === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentData: e.target.dataset.current
      })
    }
  },

  addquestion:function(){
    wx.navigateTo({
      url: './addquestion/addquestion'
    })
  },

  seenews: function () {
    wx.navigateTo({
      url: './seenews/seenews'
    })
  }
})