// pages/homePage/homePage.js
var app = getApp();
var locationUrl = 'https://apis.map.qq.com/ws/geocoder/v1/';
const tencentMapKey = 'XPIBZ-F4S6F-SHHJI-NO25R-R76VF-X6BCB';

var currentYear = new Date().getFullYear();
var currentMonth = new Date().getMonth() + 1;
var currentDay = new Date().getDate();
var currentWeek = new Date().getDay();
var currentDate = currentYear + '-' + currentMonth + '-' + currentDay;
console.log("currentDate="+currentDate+"星期"+currentWeek)

var endYear = new Date().getFullYear();
var endMonth = new Date().getMonth() + 1;
var endDay = new Date().getDate()+1;
var endWeek = new Date().getDay()+1;
var endDate = endYear + '-' + endMonth + '-' + endDay;
console.log("endDate="+endDate+"星期"+endWeek)

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
var endDate = currentYear + '-' + currentMonth + '-' + currentDay;
var dayCount = 1;

Page({

     /**
      * 页面的初始数据
      */
     data: {
          homeAdvertises: [
               {
                    'imgSrc': '../../res/images/LOGO.png',
                    'webUrl': ''
               },
               {
                    'imgSrc': '../../res/images/LOGO.png',
                    'webUrl': ''
               },
               {
                    'imgSrc': '../../res/images/LOGO.png',
                    'webUrl': ''
               }
          ],

          location: '定位中...',
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
     },
     testmap:function(){
          wx.navigateTo({
            url: '../testMap/testMap',
          })
     },
     nearbyHotel:function(){
          wx.navigateTo({
               url: '../nearbyHotel/nearbyHotel?location=' + this.data.location,
             })
     },
     chooseTime:function(){
          wx.navigateTo({
               url: '../chooseTime/chooseTime',
             })
     },
     /**
      * 生命周期函数--监听页面加载
      */
     onLoad: function (options) {
          this.getLocalLocation();

          startDate = currentDate;
          startYear = currentYear;
          startDay = currentDay;
          startMonth = currentMonth;
          startWeek = currentWeek;
          console.log("startWeek===="+startWeek)

          this.initEndDate();

          this.setSearchDate();
     },

     homeAdvertisesTap: function (e) {
          var index = e.currentTarget.dataset.index;
          wx.showToast({
               title: '点击了' + index,
               icon: 'none'
          })
     },

     getLocalLocation: function () {
          this.setData({
               location: '定位中...'
          });
          var that = this;
          wx.getLocation({
               type: 'gcj02', //返回可以用于wx.openLocation的经纬度
                 success: function (res) {  //因为这里得到的是你当前位置的经纬度
                   var latitude = res.latitude;//纬度
                   var longitude = res.longitude;//经度
                   wx.request({
                    url: locationUrl+'?location='+latitude+','+longitude+'&key='+tencentMapKey+'&get_poi=1',
                    method:'GET',
                    header: {
                         'content-type': 'application/json'
                       },
                       success (res) {
                         console.log("服务器返回数据:" + res.statusCode)
                         console.log(res.data)
                         that.setData({
                              location: res.data.result.address_component.district
                         });
                    },
                    fail(res){
                         console.log("定位失败！")         
                         that.setData({
                              location: '定位失败'
                         });
                    }
                 });
                 }, 
          })        
     },

     selectCity: function () {
          wx.navigateTo({
               url: '../select_city/select_city'
          })
     },

     searchEvent: function () {
          if (location == '定位中...') {
               wx.showToast({
                    title: '定位中，请稍后',
                    icon: 'none'
               })
          } else {
               wx.navigateTo({
                    url: '../../pages/searchHotel/searchHotel?location=' + this.data.location,
               })
          }
     },

     filterTap: function () {
          if (location == '定位中...') {
               wx.showToast({
                    title: '定位中，请稍后',
                    icon: 'none'
               })
          } else {
               wx.navigateTo({
                    url: '../../pages/searchHotel/searchHotel?location=' + this.data.location,
               })
          }
     },

     nearbyTap: function () {
          if (location == '定位中...') {
               wx.showToast({
                    title: '定位中，请稍后',
                    icon: 'none'
               })
          } else {
               wx.navigateTo({
                    url: '../../pages/nearbyHotel/nearbyHotel?location=' + this.data.location,
               })
          }
     },

     startDateChange: function (e) {//e是事件，代表鼠标事件的各种信息
          console.log(e);
          startDate = e.detail.value;//当前日期
          console.log("111当前日期="+startDate)
          var startArray = startDate.split('-');
          console.log("startArray="+startArray);
          startYear = parseInt(startArray[0]);
          startDay = parseInt(startArray[2]);
          startMonth = parseInt(startArray[1]);
          console.log("222当前日期="+startYear+"-"+startMonth+"-"+startDay)
          startWeek = new Date(startYear, startMonth, startDay).getDay();
          
          console.log("1111111111111"+new Date(startYear, startMonth, startDay))
          console.log("退房时间："+startYear+"-"+startMonth+"-"+startDay+"-星期"+startWeek)
          var startFormat = this.formatDate(startDate);
          var endFormat = this.formatDate(endDate);
          console.log("2222222222"+startFormat)
          console.log("endFormat"+endFormat)
          if (new Date(endFormat) < new Date(startFormat)) {
               this.initEndDate();
          }

          this.setSearchDate();
     },

     endDateChange: function (e) {
          console.log(e);
          endDate = e.detail.value;//ex:2020-08-17
          var endArray = endDate.split('-');
          endYear = parseInt(endArray[0]);
          endDay = parseInt(endArray[2]);
          endMonth = parseInt(endArray[1]);
          endWeek = new Date(endYear, endMonth, endDay).getDay();
          console.log("退房时间："+endYear+"-"+endMonth+"-"+endDay+"-星期"+endWeek)
          this.setSearchDate();
     },

     getWeekday: function (week) {
          var weekday = new Array(7)
          weekday[0] = "周日"
          weekday[1] = "周一"
          weekday[2] = "周二"
          weekday[3] = "周三"
          weekday[4] = "周四"
          weekday[5] = "周五"
          weekday[6] = "周六"

          return weekday[week];
     },

     prefixInteger: function (num, length) {
          return (Array(length).join('0') + num).slice(-length);
     },

     getDayCount: function (startDate, endDate) {
          var startFormat = this.formatDate(startDate);
          var endFormat = this.formatDate(endDate);
          console.log(startFormat + "->" + endFormat);
          var start = new Date(startFormat);
          var end = new Date(endFormat);

          console.log(start + "->" + end);
          var result = end - start;
          if (result >= 0) {
               var days = parseInt(result / (1000 * 60 * 60 * 24));
               return days == 0 ? 1 : days;
          } else {
               return 0;
          }
     },

     formatDate: function (date) {
          return date.replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '').replace(/(-)/g, '/');
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