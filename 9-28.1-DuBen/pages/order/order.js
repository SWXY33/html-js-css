import { base64src } from '../../utils/base64src.js'
var roomName;
var startDate;
var endDate;
var day;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Information:'',//身份证信息
    baiduToken: '',
    headimg:'',//身份证头像
    shareQrImg: '', //base64图片
    roomName:'',
    startDate:'',
    endDate:'',
    day:'',
    price:'',
    
          /* 选中的id，0 代表都不选中 */
    isShow: 0,
          selectTime: [
               {
               "id": "1",
               "name":"中国大陆",
               "text": "86"
               }, 
               {
               "id": "2",
               "name":"中国香港",
               "text": "852"
               }, 
               {
               "id": "3",
               "name":"中国澳门",
               "text": "853"
               },
               {
                "id": "4",
                "name":"中国台湾",
                "text": "886"
                }],
  },

 
    
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    console.log(options);
   
          roomName = options.roomname;
          startDate = options.startDate;
          endDate = options.endDate;
          day = options.day;
          var price = options.price;
          var  housetype = options. housetype;
          this.setData({
               roomName: roomName,
               startDate: startDate,
               endDate: endDate,
               day:day,
               price:price,
          });
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