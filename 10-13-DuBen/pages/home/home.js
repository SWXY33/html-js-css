// pages/home/home.js
var currentYear = new Date().getFullYear();
  var currentMonth = new Date().getMonth() + 1;
  var currentDay = new Date().getDate();
  var currentWeek = new Date().getDay();
  var currentDate = currentYear + '-' + currentMonth + '-' + currentDay;
  console.log("现在时间："+currentDate+"-"+currentWeek);
  
  
  var startDate = '';
  var startYear=currentYear;
  var startDay=currentDay;
  var startMonth=currentMonth;
  var startWeek=currentWeek;
  var endOfStartDate = '2020-12-31';
  var startDayCount;
  
  var startline=0,
  startindex='',
  endline=0,
  endindex='';
 
  var endDate = '';
  var endYear;
  var endDay;
  var endMonth;
  var endWeek;
  var endOfEndDate = '2020-12-31';
  
  var dayCount = 1;
  if(currentWeek==1){
    currentWeek="星期一";
    endWeek="星期二";
  }else if(currentWeek==2){
    currentWeek="星期二";
    endWeek="星期三";
  }
  else if(currentWeek==3){
    currentWeek="星期三";
    endWeek="星期四";
  }else if(currentWeek==4){
    currentWeek="星期四";
    endWeek="星期五";
  }else if(currentWeek==5){
    currentWeek="星期五";
    endWeek="星期六";
  }else if(currentWeek==6){
    currentWeek="星期六";
    endWeek="星期日";
  }else if(currentWeek==7){
    currentWeek="星期日";
    endWeek="星期一";
  }
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    hotelname:'度本智能酒店',
    startline:0,
    startindex:startDay-1,
    endline:0,
    endindex:startDay,
    startDate: '',
    currentDate: '',
    endOfStartDate: '',
    endDate: '',
    endOfEndDate: '',
    startDay:startDay ,
    startMonth: startMonth,
    startWeek: currentWeek,
    startYear:startYear,
    endDay: '',
    endMonth: '',
    endWeek: endWeek,
    endYear:'',
    dayCount: 1,
    id:0,
    arr: [],
    day:1,
    degs: 0,
    roomData:[],//房间类型信息
    HOUSE_ONE:0,//单间剩余数量
    HOUSE_TWO:0,//双间声部数量
    HOUSE_BIG:0,//大床房剩余数量
    little:0,//房间数量少，0为剩余预警，1为数量充足
  },
  //获取指定日期的下一天日期
   nextDate:function(date = new Date()) {
    　　date = new Date(date);
    　　date = +date + 1000 * 60 * 60 * 24;
    　　date = new Date(date);
    　　return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    },

//预订
book:function(e){ 
  var hotelName = e.currentTarget.dataset.hotelname;
  var housetype = e.currentTarget.dataset.housetype;
  var roomname = e.currentTarget.dataset.roomname;
  var price = e.currentTarget.dataset.price;
  var startYear = e.currentTarget.dataset.start4;
  var startMonth = e.currentTarget.dataset.start3;
  var startDay = e.currentTarget.dataset.start1;
  var startWeek = e.currentTarget.dataset.start2;
  var endYear = e.currentTarget.dataset.end4;
  var endMonth = e.currentTarget.dataset.end3;
  var endDay = e.currentTarget.dataset.end1;
  var endWeek = e.currentTarget.dataset.end2;
  var day = e.currentTarget.dataset.day;
  var startDate = startYear+"-"+startMonth+"-"+startDay;
  var endDate = endYear+"-"+endMonth+"-"+endDay;
  console.log("入住时间："+startDate);
  console.log("离店时间："+endDate);
  console.log("！！！！！！！入住天数------------="+day)
  console.log("！！！！！！！价格------------="+price)
  console.log("房间名称------------="+roomname+";housetype="+housetype)
  wx.navigateTo({
  url: '/pages/order/order?startDate='+startDate+'&endDate=' + endDate+'&day='+day+'&price='+price+'&roomname='+roomname+"&housetype="+housetype+'&hotelName='+hotelName,
  })
},
  /**
   * 折叠展开动画
   */
  rotateAnim: function () {
    let deg = this.data.degs;
    deg = deg == 0 ? 90 : 0;
    console.log("deg====="+deg)
    this.setData({
      degs: deg
    })
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '首页' 
    })
   endDate = this.nextDate().split('-');
   console.log("endDate="+endDate+";type="+typeof(endDate))
   endYear = this.nextDate().split('-')[0];
   endMonth = this.nextDate().split('-')[1];
   endDay = this.nextDate().split('-')[2];
   if(endMonth>startMonth){
    endline = 1;
    this.setData({
      endline : 1
    })
   }
    console.log("endYear="+endYear+";endMonth="+endMonth+";endDay="+endDay+";endWeek="+endWeek)
    this.setData({
      endYear: endYear,
      endMonth: endMonth,
      endDay:endDay,
    })
    var that = this;
    var type ;
    for(var i=0;i<3;i++){
      if(i==0){
        type = 'HOUSE_ONE';
      }else if(i==1){
        type = 'HOUSE_TWO';
      }else if(i==2){
        type = 'HOUSE_BIG';
      }
      wx.request({//查询房间类型剩余数 (HOUSE_ONE为单间，HOUSE_TWO为双间，HOUSE_BIG为大床房) 
        url: 'https://dubeniot.com/iot-manager/Hotel/getRoomQuantity?hotelId=160041825383116&type='+type ,
        method: 'GET',
        
        header: {
          'Content-Type': 'application/json' // 默认值
        },
        success(res) { 
          console.log("res="+JSON.stringify(res.data.data))  
          console.log("roomType="+res.data.data[0].roomType) 
          if(res.data.data[0].roomType=='HOUSE_ONE'){
           
            that.setData({
              HOUSE_ONE:res.data.data[0].quantity
             })
          }else if(res.data.data[0].roomType=='HOUSE_TWO'){
            
            that.setData({
              HOUSE_TWO:res.data.data[0].quantity
             })
          }else if(res.data.data[0].roomType=='HOUSE_BIG'){ 
                   
            that.setData({
              HOUSE_BIG:res.data.data[0].quantity
             })
          }  
        },
        fail(res){
          console("fail")
        }
        
      })
    
    }
 
    wx.request({//获取房间类型
      url: 'https://dubeniot.com/iot-manager/Hotel/getRoomType?hotelId=160041825383116' ,
      method: 'GET',
      
      header: {
        'Content-Type': 'application/json' // 默认值
      },
      success(res) { 
        console.log("res="+JSON.stringify(res.data.data))    
     that.setData({
       roomData:res.data.data
     })
      }
    })

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
  roomNum:function(e){
    var that = this;
    var housetype = e.currentTarget.dataset.housetype;
    console.log("housetype="+housetype)
    wx.request({
      url: 'https://dubeniot.com/iot-manager/Hotel/getRoomQuantity?hotelId=160041825383116',//获取客房类型剩余数量
      method: 'GET',
      
      header: {
        'Content-Type': 'application/json' // 默认值
      },
      success(res) { 
        console.log("res="+JSON.stringify(res.data.data))  

     that.setData({
       roomNumData:res.data.data
     })

      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (e) {
    
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