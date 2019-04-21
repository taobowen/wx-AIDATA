Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidden:true
  },
  //弹出loading按钮事件
  /**
   * 生命周期函数--监听页面加载
   */
  loadingTap: function () {
    var that = this
    that.setData({
      hidden:false
    });
    //设置3000毫秒后执行  
    setTimeout(function(){
      that.setData({
        hidden:true
      });
      that.updata();
    },3000);
  }
})