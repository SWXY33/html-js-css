import { base64src } from '../../utils/base64src.js'
var roomName;
var startDate;
var endDate;
var day;
var housetype;
var hotelName;
var orderapp =  getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hotelName:'',
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
    areaName:'中国大陆',
    phone: '',
    username:''
 },
 getidnumber:function(){//扫描身份证获取身份证号

 },
 formSubmit: function (e) {
  console.log("roomName="+roomName);
  console.log("startDate="+startDate);
  console.log("endDate="+endDate);
  console.log("day="+day);
  console.log("housetype="+housetype)
  orderapp.hotelName = hotelName;
  orderapp.roomName = roomName;
  var FormArray=[];
  FormArray.state="success";
  FormArray.data = e.detail.value;
  console.log('form发生了submit事件，携带数据为：', FormArray);
  var orderInf = '订单号：DB2020092917\r\n'+roomName+'\r\n入住时间：'+startDate+'到'+endDate+'共'+day+'天\r\n姓名：'+FormArray.data.username+"\r\n手机："+FormArray.data.phone+'\r\n身份证号：'+FormArray.data.idnumber+'\r\n合计：'+this.data.price+'元';
  

  wx.request({//预订房间 
    url: 'https://dubeniot.com/iot-manager/Hotel/reserveRoom?bookingPerson='+FormArray.data.username+'&duration='+day+'&hotelId=160041825383116&houseType='+housetype+'&idnumber='+FormArray.data.idnumber+'&phone='+FormArray.data.phone,
    method: 'POST',
    
    header: {
      'Content-Type': 'application/json' // 默认值
    },
    success(res) { 

      console.log("订单号="+JSON.stringify(res.data.data)) 
      
      orderapp.orderNumber = res.data.data;
        wx.showToast({
        title: '预订成功',
        icon:'success'
      })
    
      setTimeout(function () {
      wx.reLaunch({
        url: '/pages/myroom/myroom',
      })
    }, 2000)
    }
  })
  
 
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
  }else if(name==853){
    this.setData({
    areaName:'中国澳门'
    })
  }else if(name==886){
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
          hotelName = options.hotelName;
          roomName = options.roomname;
          startDate = options.startDate;
          endDate = options.endDate;
          day = options.day;
          var price = options.price;
          housetype = options. housetype;
          this.setData({
               roomName: roomName,
               startDate: startDate,
               endDate: endDate,
               day:day,
               price:price,
               hotelName:hotelName,
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