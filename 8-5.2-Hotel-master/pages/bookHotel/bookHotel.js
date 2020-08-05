// pages/bookHotel/bookHotel.js

var roomPrice;
var hotelName;
var roomName;
var startDate;
var endDate;

Page({

     /**
      * 页面的初始数据
      */
     data: {
          list: [{
      id: 1,
      pay: '微信支付',
      img: '../../res/images/weixin.png'
    },
    {
      id: 2,
      pay: '支会员卡支付',
      img: '../../res/images/card.png'
    },
    {
      id: 3,
      pay: '到店支付',
      img: '../../res/images/daodian.png'
    }],

          /* 选中的id，0 代表都不选中 */
    isShow: 0,
          selectTime: [
               {
                    "id": "1",
                    "text": "18:00"
                    }, 
               {
               "id": "2",
               "text": "19:00"
               }, 
               {
               "id": "3",
               "text": "20:00"
               }],
               
          isDiscount: false,
          roomPrice,
          hotelName,
          roomName,
          startDate,
          endDate
     },
/* 
    需求：
    + 元素之间实现 单选
      - 当点击某个元素时，把当前元素的 id 赋值给 isShow
      - 通过 isShow 是否和元素的 id 相等来控制图片的显示和隐藏
    + 实现元素的 选中/未选中 之间的切换
      - 点击时判断是否被选中，若选中 则取消，否则 选中
  */
 
 select: function (e) {
     // 获取当前被点击元素的 id
     const id = e.currentTarget.dataset.id
     const isShow = 0
  
     // 通过 isShow 与 id 是否相等 来判断是否被选中
     if (this.data.isShow === id) {
       // 已经被选中 此时取消选中
       this.setData({
         isShow
       })
     } else {
       this.setData({
         isShow: id
       })
     }
 }, 
     pay:function(){//提交订单
          wx.navigateTo({
            url: '../orderTest/orderTest',
          })
     },
     chooseDiscount:function(){
          wx.navigateTo({
               url: '../discount/discount',
})
     },
     /**
      * 生命周期函数--监听页面加载
      */
     onLoad: function (options) {
         
          console.log(options);
          roomPrice = options.price;
          hotelName = options.hotelName;
          roomName = options.roomName;
          startDate = options.startDate;
          endDate = options.endDate;

          this.setData({
               roomPrice: roomPrice,
               hotelName: hotelName,
               roomName: roomName,
               startDate: startDate,
               endDate: endDate,
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