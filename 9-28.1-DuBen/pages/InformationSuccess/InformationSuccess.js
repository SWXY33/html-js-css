// pages/InformationSuccess/InformationSuccess.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Information:[],//身份证信息
    headimg:''//身份证头像
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(typeof(options.Information)+'--身份证信息：--'+options.Information);
    let headimg = options.headimg;
    console.log(typeof(options.headimg)+'--身份证头像：--'+headimg);
 
    console.log(typeof(JSON.parse(options.Information))+"111111111身份证信息："+JSON.parse(options.Information))
  
    this.setData({
      Information:JSON.parse(options.Information),
      headimg:headimg
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