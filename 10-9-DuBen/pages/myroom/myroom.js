// pages/myhouse/myhouse.js
var orderapp =  getApp();
var hotelName = 0;
var roomName = 0;
var orderNumber;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hotelName:'',
    roomName:'',
    orderState:0,//判断是否有订单
    orderNumber:''
  },
  myroom:function(){//我的房间
wx.navigateTo({
  url: '/pages/controlmyroom/controlmyroom',
})
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '我的订单' 
    })
    hotelName = orderapp.hotelName;
    roomName = orderapp.roomName;
    orderNumber = orderapp.orderNumber;
    if(orderNumber==undefined){
      orderNumber='';
      this.setData({
        orderNumber:''
      })
    }else{
      this.setData({
        orderNumber:orderNumber
      })
    }
    console.log("订单号："+orderNumber)
    console.log("onLoad orderapp.hotelName="+hotelName);
    console.log(hotelName==undefined);
    if(hotelName!=undefined){
      this.setData({
        hotelName:hotelName,
        roomName:roomName,
        orderState:1,//判断是否有订单
      })
    }else{
      hotelName = 0;
      roomName = 0;
      this.setData({
        hotelName:'',
        roomName:'',
        orderState:0,//判断是否有订单
      })
    }
  console.log("onLoad 是否有订单"+this.data.orderState)
  console.log("onLoad orderapp.hotelName="+hotelName)
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
    
    
      hotelName = orderapp.hotelName;
      roomName = orderapp.roomName;
      console.log("onShow orderapp.hotelName="+hotelName);
      console.log(hotelName==undefined);
      if(hotelName!=undefined){
        this.setData({
          hotelName:hotelName,
          roomName:roomName,
          orderState:1,//判断是否有订单
        })
      }else{
        hotelName = 0;
        roomName = 0;
        this.setData({
          hotelName:'',
          roomName:'',
          orderState:0,//判断是否有订单
        })
      }
    console.log("onShow 是否有订单"+this.data.orderState)
    console.log("onShow orderapp.hotelName="+hotelName)

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