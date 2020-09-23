// pages/controlxinfeng/controlxinfeng.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isChecked1: true,
    status:'开',//设置空调开关状态
    model:'换气',
    src:'/img/566982h.png'
  },
  modelcontrol:function(e){
    var state = e.currentTarget.dataset.state;
    if(state==1){
      this.setData({
        model:'清新',
        src:'/img/1157960.png'
      })
    }else if(state==2){
      this.setData({
        model:'换气',
        src:'/img/566982h.png'
      })
    }else if(state==3){
      this.setData({
        model:'自动',
        src:'/img/1168287.png'
      })
    }
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