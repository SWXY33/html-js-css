// pages/home/home.js
var currentYear = new Date().getFullYear();
  var currentMonth = new Date().getMonth() + 1;
  var currentDay = new Date().getDate();
  var currentWeek = new Date().getDay();
  var currentDate = currentYear + '-' + currentMonth + '-' + currentDay;
  
  var startDate = '';
  var startYear=currentYear;
  var startDay;
  var startMonth;
  var startWeek;
  var endOfStartDate = '2020-12-31';
  var startDayCount;
  
  var startline=0,
  startindex='',
  endline=0,
  endindex='';
  
  var endDate = '';
  var endYear=currentYear;
  var endDay;
  var endMonth;
  var endWeek;
  var endOfEndDate = '2020-12-31';
  
  var dayCount = 1;
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    startline:'',
    startindex:'',
    endline:'',
    endindex:'',
    startDate: '',
    currentDate: '',
    endOfStartDate: '',
    endDate: '',
    endOfEndDate: '',
    startDay: '08',
    startMonth: '09',
    startWeek: '星期二',
    startYear:startYear,
    endDay: '09',
    endMonth: '09',
    endWeek: '星期三',
    endYear:endYear,
    dayCount: 1,
    id:0,
    arr: [],
    day:1,
    degs: 0,
    degss: 0,
    degsss: 0,
    subords: [
      { name: '张三', pay: '300.00' },
      { name: '李四', pay: '400.00' },
      { name: 'Marry', pay: '200.00' },
      { name: '龙霸天', pay: '300.00' },
    ]
  },

  /**
   * 折叠展开动画
   */
  rotateAnim: function () {
    let deg = this.data.degs;
    deg = deg == 0 ? 90 : 0;
    this.setData({
      degs: deg
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  chooseTime:function(e){
    console.log("e==="+JSON.stringify(e)) ;
     var startYear = e.currentTarget.dataset.start4;
     var startMonth = e.currentTarget.dataset.start3;
     var startDay = e.currentTarget.dataset.start1;
     var startWeek = e.currentTarget.dataset.start2;
     var endMonth = e.currentTarget.dataset.end3;
     var endDay = e.currentTarget.dataset.end1;
     var endWeek = e.currentTarget.dataset.end2;
     var endYear = e.currentTarget.dataset.end4;
     var day = e.currentTarget.dataset.day;
     var startline = e.currentTarget.dataset.startline;
     var startindex=e.currentTarget.dataset.startindex;
     var endline=e.currentTarget.dataset.endline;
     var endindex=e.currentTarget.dataset.endindex;
     console.log("DAY------------="+day)
     console.log("startYear==="+startYear+"****endYear=="+endYear)
     console.log("startline="+startline+";startindex="+startindex+";endline="+endline+";endindex="+endindex)
     wx.setStorage({
          key: "Time",
          data: {
               startYear:startYear,
               startMonth:startMonth,
               startDay:startDay,
               startWeek:startWeek,
               endYear:endYear,
               endMonth:endMonth,
               endDay:endDay,
               endWeek:endWeek,
               day:day,
               startline:startline,
               startindex:startindex,
               endline:endline,
               endindex:endindex
          }
       })
     wx.navigateTo({
          url: '../chooseTime/chooseTime?startMonth='+startMonth+"&startWeek="+startWeek+"&startDay="+startDay+"&endMonth="+endMonth+"&endWeek="+endWeek+"&endDay="+endDay+"&day="+day+"&startYear="+startYear+"&endYear="+endYear+"&startline="+startline+"&startindex="+startindex+"&endline="+endline+"&endindex="+endindex,
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