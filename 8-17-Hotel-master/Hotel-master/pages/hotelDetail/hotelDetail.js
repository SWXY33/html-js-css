// pages/hotelDetail/hotelDetail.js

var currentYear = new Date().getFullYear();
var currentMonth = new Date().getMonth() + 1;
var currentDay = new Date().getDate();
var currentWeek = new Date().getDay();
var currentDate = currentYear + '-' + currentMonth + '-' + currentDay;

var startDate = '';
var startYear;
var startDay;
var startMonth;
var startWeek;
var endOfStartDate = '2020-12-31';
var startDayCount;


var endDate = '';
var endYear;
var endDay;
var endMonth;
var endWeek;
var endOfEndDate = '2020-12-31';

var dayCount = 1;

function RoomBean() {
     var image;
     var name;
     var tel;
     var price;
}


Page({

     /**
      * 页面的初始数据
      */
     data: {
          startDate: '',
          currentDate: '',
          endOfStartDate: '',
          endDate: '',
          endOfEndDate: '',
          startDay: '',
          startMonth: '',
          startWeek: '',
          endDay: '',
          endMonth: '',
          endWeek: '',
          dayCount: 1,
          id:0,
          arr: [],

          hotelName: '',
          hotelAddress: '',
          roomArray: [
               {
                    image: '../../res/images/ic_hotel_image.png',
                    name: '标准单人间',
                    service: 'WiFi/有窗/空调',
                    price: 158
               }, {
                    image: '../../res/images/ic_hotel_image.png',
                    name: '标准双人间',
                    service: 'WiFi/有窗/空调',
                    price: 258
               }, {
                    image: '../../res/images/ic_hotel_image.png',
                    name: '豪华单人间',
                    service: 'WiFi/有窗/空调',
                    price: 198
               }, {
                    image: '../../res/images/ic_hotel_image.png',
                    name: '豪华双人间',
                    service: 'WiFi/有窗/空调',
                    price: 358
               }
          ],
          serviceList: [
               {
                    icon: '../../res/images/ic_service_park.png',
                    name: '停车场'
               },
               {
                    icon: '../../res/images/ic_service_food.png',
                    name: '营养早餐'
               },
               {
                    icon: '../../res/images/ic_service_park.png',
                    name: '健身室'
               },
               {
                    icon: '../../res/images/ic_service_food.png',
                    name: '免费WiFi'
               },
               {
                    icon: '../../res/images/ic_service_park.png',
                    name: '叫车服务'
               },
               {
                    icon: '../../res/images/ic_service_food.png',
                    name: '营养早餐'
               },
               {
                    icon: '../../res/images/ic_service_park.png',
                    name: '健身室'
               },
               {
                    icon: '../../res/images/ic_service_food.png',
                    name: '免费WiFi'
               },
               {
                    icon: '../../res/images/ic_service_park.png',
                    name: '叫车服务'
               }
          ]
     },
     chooseTime:function(e){
          var startMonth = e.currentTarget.dataset.start3;
          var startDay = e.currentTarget.dataset.start1;
          var startWeek = e.currentTarget.dataset.start2;
          var endMonth = e.currentTarget.dataset.end3;
          var endDay = e.currentTarget.dataset.end1;
          var endWeek = e.currentTarget.dataset.end2;
          console.log("startDay="+startDay)
          wx.navigateTo({
               url: '../chooseTime/chooseTime?startMonth='+startMonth+"&startWeek="+startWeek+"&startDay="+startDay+"&endMonth="+endMonth+"&endWeek="+endWeek+"&endDay="+endDay,
             })
     },

     /**
      * 生命周期函数--监听页面加载
      */
     onLoad: function (options) {
          startDate = currentDate;
          startYear = currentYear;
          startDay = currentDay;
          startMonth = currentMonth;
          startWeek = currentWeek;

          this.initEndDate();
          this.setSearchDate();

          console.log(options);
          var hotelName = options.name;
          var address = options.address;
          var distance = options.distance;
          var tel = options.tel;
          if (hotelName !== undefined) {
               this.setData({
                    hotelName: hotelName,
                    hotelAddress: address + '\n距我' + distance + 'm',
                    tel:tel
               });
          }
     },
     getlocation:function(){
         
               wx.getLocation({
                 type: 'gcj02', //返回可以用于wx.openLocation的经纬度
                 success: function (res) {  //因为这里得到的是你当前位置的经纬度
                   var latitude = res.latitude
                   var longitude = res.longitude
                   wx.openLocation({       
                     latitude: 22.23,//纬度，范围为-90~90，负数表示南纬
                     longitude: 112.79,//经度，范围为-180~180，负数表示西经
                     name: "度本科技大酒店",//位置名
                     address:"广东省江门市台山市黄屋",//地址的详细说明
                     scale: 15,//缩放比例，范围1~28，默认为28
                   })
                 }
               })
              
     },
     calling: function (e) {//一键拨号功能
         
          console.log("获取电话号码："+e.currentTarget.dataset.tel);
              wx.makePhoneCall({
                  phoneNumber: e.currentTarget.dataset.tel,           
                  success: function () {           
                      console.log("拨打电话成功！")          
                  },           
                  fail: function () {           
                      console.log("拨打电话失败！")          
                  }           
              })          
          },
     bookRoom: function (e) {
          var index = e.currentTarget.dataset.index;
          console.log("index="+index)
          var room = this.data.roomArray[index];
          wx.navigateTo({//点击预订跳转页面
               url: '../bookHotel/bookHotel?price=' + room.price + '&hotelName=' + this.data.hotelName + '&roomName=' + room.name + '&startDate=' + startDate + '&endDate=' + endDate,
          })
     },

     startDateChange: function (e) {
          console.log(e);
          startDate = e.detail.value;
          var startArray = startDate.split('-');
          startYear = parseInt(startArray[0]);
          startDay = parseInt(startArray[2]);
          startMonth = parseInt(startArray[1]);
          startWeek = new Date(startYear, startMonth, startDay).getDay();

          var startFormat = this.formatDate(startDate);
          var endFormat = this.formatDate(endDate);
          if (new Date(endFormat) < new Date(startFormat)) {
               this.initEndDate();
          }

          this.setSearchDate();
     },

     endDateChange: function (e) {
          console.log(e);
          endDate = e.detail.value;
          var endArray = endDate.split('-');
          endYear = parseInt(endArray[0]);
          endDay = parseInt(endArray[2]);
          endMonth = parseInt(endArray[1]);
          endWeek = new Date(endYear, endMonth, endDay).getDay();

          this.setSearchDate();
     },

     formatDate: function (date) {
          return date.replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '').replace(/(-)/g, '/');
     },

     getWeekday: function (week) {
          var weekday = new Array(7)
          weekday[0] = "星期日"
          weekday[1] = "星期一"
          weekday[2] = "星期二"
          weekday[3] = "星期三"
          weekday[4] = "星期四"
          weekday[5] = "星期五"
          weekday[6] = "星期六"

          return weekday[week];
     },

     prefixInteger: function (num, length) {
          return (Array(length).join('0') + num).slice(-length);
     },

     getDayCount: function (startDate, endDate) {
          var startFormat = this.formatDate(startDate);
          var endFormat = this.formatDate(endDate);

          var start = new Date(startFormat);
          var end = new Date(endFormat);

          var result = end - start;
          if (result >= 0) {
               var days = parseInt(result / (1000 * 60 * 60 * 24));
               return days == 0 ? 1 : days;
          } else {
               return 0;
          }
     },

     initEndDate: function () {
          startDayCount = new Date(startYear, startMonth, 0).getDate();

          if (startMonth == 12 && startDay == 31) {
               endYear = startYear + 1;
               endMonth = 1;
               endDay = 1;
          } else {
               endYear = startYear;
               if (startDay <= startDayCount) {
                    endMonth = startMonth
                    endDay = startDay + 1;
               } else {
                    endMonth = startMonth + 1;
                    endDay = 1;
               }
          }
          if (currentWeek >= 7) {
               endWeek = 1;
          } else {
               endWeek = currentWeek + 1;
          }
          endDate = endYear + '-' + endMonth + '-' + endDay;
     },

     setSearchDate: function () {
          this.setData({
               currentDate: currentDate,

               startDate: startDate,
               startDay: this.prefixInteger(startDay, 2),
               startMonth: this.prefixInteger(startMonth, 2),
               startWeek: this.getWeekday(startWeek),
               endOfStartDate: '2020-12-31',

               endDate: endDate,
               endDay: this.prefixInteger(endDay, 2),
               endMonth: this.prefixInteger(endMonth, 2),
               endWeek: this.getWeekday(endWeek),
               endOfEndDate: '2020-12-31',

               dayCount: this.getDayCount(startDate, endDate)
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

          console.log("`````````"+this.data.arr)
          console.log("111111+"+this.data.id)   //打印测试id是否传过来
          console.log("222222+"+this.data.dayCount)
         

     
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