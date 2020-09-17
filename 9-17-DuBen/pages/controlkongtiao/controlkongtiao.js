// pages/controlkongtiao/controlkongtiao.js
var app={

  /**
   * 页面的初始数据
   */
  data: {
    isChecked1: true,
    status:'开'
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(this.data.isChecked1==true){
      this.setData({
        status:'开'
      })
    }else{
      this.setData({
        status:'关'
      })
    }
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
};
for (var i = 0; i < 2; ++i) {
  (function (i) {
    app['changeSwitch' + i] = function (e) {
      console.log("state=="+JSON.stringify(e.detail.value))
      if(e.detail.value==true){
        this.setData({
          status:'开'
        })
      }else{
        this.setData({
          status:'关'
        })
      }
      var changedData = {};
      changedData['isChecked' + i] = !this.data['isChecked' + i];
      this.setData(changedData);
      
    }
  })(i)
}
Page(app);