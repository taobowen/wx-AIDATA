Page({
  /**
   * 页面的初始数据
   */
  data: {
    currentData: 0,
    selectPerson: true,
    userAcTaskList: [],
    userReTaskList: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let scrollHeight = wx.getSystemInfoSync().windowHeight;
    this.setData({
      scrollHeight: scrollHeight
    })
    var that = this
    wx.request({
      url: 'https://tbw315.xyz/wechat/taskReleased/',
      data: {
        
      },
      method: 'POST',
      header:{
        'content-type': 'application/x-www-form-urlencoded',
        'cookie': wx.getStorageSync('cookie'),
        'X-CSRFToken': wx.getStorageSync('CSRFtoken')
      },
      success:(res)=>{
        console.log(res.data);
        var data = this.data;
        data.userReTaskList = res.data.userReTaskList;
        that.setData({
          data: data
        })
      }
    }),
      wx.request({
        url: 'https://tbw315.xyz/wechat/taskAccepted/',
        data: {

        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'cookie': wx.getStorageSync('cookie'),
          'X-CSRFToken': wx.getStorageSync('CSRFtoken')
        },
        success: (res) => {
          console.log(res.data);
          var data = this.data;
          data.userAcTaskList = res.data.userAcTaskList;
          that.setData({
            data: data
          })
        }
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

  seedetail1: function () {
    wx.navigateTo({
      url: './detail/detail',
    })
  },

  seedetail2: function(){
    wx.navigateTo({
      url: './detail2/detail2',
    })
  }
})