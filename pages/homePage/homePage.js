// pages/homePage/homePage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab:0,
    data:{},
    imgUrls:[
      "/images/haibao/haibao1.jpg",
      "/images/haibao/haibao2.jpg",
      "/images/haibao/haibao3.jpg",
      "/images/haibao/haibao4.jpg"
    ]
  },

  onLoad: function (options) {
    clearTimeout(setTimeout);
    let scrollHeight = wx.getSystemInfoSync().windowHeight - 40;
    this.setData({
      scrollHeight: scrollHeight
    })

    var that = this
    // wx.setNavigationBarTitle({
    //   title: options.title
    // })

    wx.login({
      success: (res) => {
        if (res.code) {
          wx.request({
            url: 'https://tbw315.xyz/wechat/user/login/',
            method: 'GET',
            header: {
              'content-type': 'application/json'
            },
            data: {
              code: res.code
            },
            success: (res) => {
              var cookie = res.header['Set-Cookie'];
              var token = /csrftoken=([0-9A-Za-z].*?[^;]);/.exec(cookie)[1];
              var sessionid = /sessionid=([0-9A-Za-z].*?[^;]);/.exec(cookie)[0];
              wx.setStorageSync('cookie','csrftoken='+token+';'+sessionid);
              wx.setStorageSync('CSRFtoken', token);
              var cookies = wx.getStorageSync('cookie')
              console.log(cookies)
              // console.log(cookies['csrftoken'])
              console.log('login ok')
              wx.getUserInfo({
                withCredentials: true,
                lang: '',
                success: function(res) {
                  var data = res.data
                  console.log(res);
                  that.setData({
                    
                  })
                },
                fail: function(res) {},
                complete: function(res) {},
              })
              wx.request({
                url: 'https://tbw315.xyz/wechat/taskList/',//服务器接口
                data: {

                },
                method: "POST",
                header: {
                  //对于 header['content-type'] 为 'application/json' 的数据，会对数据进行 JSON 序列化
                  // 对于 header['content-type'] 为 'application/x-www-form-urlencoded' 的数据，会将数据转换成 query string 
                  'content-type': 'application/x-www-form-urlencoded',
                  'cookie': wx.getStorageSync('cookie'),
                  'X-CSRFToken': wx.getStorageSync('CSRFtoken')
                },
                success: function (res) {
                  var data = res.data
                  console.log(res);
                  that.setData({
                    data: data
                  })
                }
              })
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    });
    //网络请求
  },


  bindchange: function (e) {
    const that = this;
    that.setData({
      currentTab: e.detail.current
    })
  },

  switchNav:function(e){
    console.log(e);
    var page=this;
    var id=e.target.id;
    if(this.data.currentTab==id){
      return false;
    }else{
      page.setData({currentTab:id});
    }
  },
  
  seedetail:function(event){
    console.log(event);
    let index = event.currentTarget.dataset.index
    wx.navigateTo({
      url: './detail/detail?index=' + index +'&data=' + JSON.stringify(this.data.data),
    })
  },

  seepicture: function (event) {
    console.log(event);
    wx.navigateTo({
      url: './picture/picture?data=' + JSON.stringify(this.data.data),
    })
  },
  seesound: function (event) {
    console.log(event);
    wx.navigateTo({
      url: './sound/sound?data=' + JSON.stringify(this.data.data),
    })
  },
  seevideo: function (event) {
    console.log(event);
    wx.navigateTo({
      url: './video/video?data=' + JSON.stringify(this.data.data),
    })
  },

  all: function () {
    wx.showLoading({
      title: '加载中',
    })
    setTimeout(function () {
      wx.hideLoading()
    }, 1000)
    wx.navigateTo({
      url: './all/all?data=' + JSON.stringify(this.data.data),
    })
  }
}) 
