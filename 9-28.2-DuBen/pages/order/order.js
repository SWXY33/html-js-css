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
    select: false,
    prefix_num: '86',
    prefix: ['86', '852', '853','886' ],
    areaName:'中国大陆'
 },
             
              bindShowMsg() {
                this.setData({
                  select: !this.data.select
                })
              },
              mySelect(e) {
                console.log(e)
                var name = e.currentTarget.dataset.name;
                console.log("select="+name)
                if(name==86){
                  this.setData({
                    areaName:'中国大陆'
                  })
                }else if(name==852){
                  this.setData({
                    areaName:'中国香港'
                  })
                }
                else if(name==853){
                  this.setData({
                    areaName:'中国澳门'
                  })
                }
                else if(name==886){
                  this.setData({
                    areaName:'中国台湾'
                  })
                }
                this.setData({
                  prefix_num: name,
                  select: false
                })
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