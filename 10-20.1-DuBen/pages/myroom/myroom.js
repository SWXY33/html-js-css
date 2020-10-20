// pages/myhouse/myhouse.js
var myroom =  getApp();
var hotelName = 0;
var roomName = 0;
var orderNumber;
var hotelId;
var phone;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderData:[],
    hotelName:'',
    roomName:'',
    orderState:0,//判断是否有订单
    orderNumber:'',
    cancelBook:'取消订单',
    comfircancel:'已取消'
  },
  myroom:function(){//我的房间
wx.navigateTo({
  url: '/pages/controlmyroom/controlmyroom',
})
  },
  /**
   * 生命周期函数--监听页面加载
   */
  cancelBook:function(e){
    var that = this;
    that.setData({
      cancelBook:'已取消'
    })
var ordernumber =e.currentTarget.dataset.ordernumber;
console.log("ordernumber==="+ordernumber)
wx.request({//取消预订 
  url: 'https://dubeniot.com/iot-manager/Hotel/returnReservation?orderNumber='+ordernumber,
  method: 'POST',
  header: {
    'Content-Type': 'application/json' // 默认值
  },
  success(res) { 
    console.log("取消预订-------------res="+JSON.stringify(res.data.data)) 
  
  }
})
  },
  onLoad: function (options) {
    var that = this;
    wx.setNavigationBarTitle({
      title: '我的订单' 
    })
    hotelId = myroom.hotelId;
    phone = myroom.phone;
    console.log("myroom.phone="+phone)
    console.log("myroom.hotelId="+hotelId)
    wx.request({//查询订单 
      url: 'https://dubeniot.com/iot-manager/Hotel/queryMakingReservation?hotelId='+hotelId+'&phone='+phone,
      method: 'POST',
      header: {
        'Content-Type': 'application/json' // 默认值
      },
      success(res) { 
        console.log("我的订单-------------res="+JSON.stringify(res.data.data)) 
        var myorder = res.data.data;
        console.log("myorder的数据类型是："+typeof(myorder))
        var myorder1 = [];
        for(var i=myorder.length-1;i>=0;i--){
          console.log("ordertime=============="+myorder[i]["ordertime"])
          var json_date = new Date(myorder[i]["ordertime"]).toJSON();
          var newtime = new Date(+new Date(json_date) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '') 
          console.log("newDate==="+newtime)
          myorder[i]["ordertime"] = newtime;
         myorder1.push(myorder[i])
        }
        
        console.log("myorder==="+JSON.stringify(myorder))
        console.log("myorder1==="+JSON.stringify(myorder1))
      that.setData({
        orderData:myorder1
      })
      }
    })
  



    hotelName = myroom.hotelName;
    roomName = myroom.roomName;
    orderNumber = myroom.orderNumber;
    if(orderNumber==undefined){
      orderNumber='';
      that.setData({
        orderNumber:''
      })
    }else{
      that.setData({
        orderNumber:orderNumber
      })
    }
    console.log("订单号："+myroom)
    console.log("onLoad myroom.hotelName="+hotelName);
    console.log(hotelName==undefined);
    if(hotelName!=undefined){
      that.setData({
        hotelName:hotelName,
        roomName:roomName,
        orderState:1,//判断是否有订单
      })
    }else{
      hotelName = 0;
      roomName = 0;
      that.setData({
        hotelName:'',
        roomName:'',
        orderState:0,//判断是否有订单
      })
    }
  console.log("onLoad 是否有订单"+that.data.orderState)
  console.log("onLoad myroom.hotelName="+hotelName)
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
    var that = this;
      hotelId = myroom.hotelId;
      hotelName = myroom.hotelName;
      roomName = myroom.roomName;
      console.log("onShow myroom.hotelName="+hotelName);
      console.log("onShow myroom.hotelId="+hotelId);
      console.log(hotelName==undefined);
      if(hotelName!=undefined){
        that.setData({
          hotelName:hotelName,
          roomName:roomName,
          orderState:1,//判断是否有订单
        })
      }else{
        hotelName = 0;
        roomName = 0;
        that.setData({
          hotelName:'',
          roomName:'',
          orderState:0,//判断是否有订单
        })
      }
    console.log("onShow 是否有订单"+that.data.orderState)
    console.log("onShow myroom.hotelName="+hotelName)

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