Page({
  data: {

   avatarUrl:"./user-unlogin.png",
   userName:"swxy33",
   welcome:"尊敬的",
   userHead:"../../images/admin.jpg",
 
  },
  onLoad: function () {
   var myDate = new Date(),
     year = myDate.getFullYear(),
     month = myDate.getMonth(),
     day = myDate.getDate(),
     hour = myDate.getHours(),
     min = myDate.getMinutes(),
     sec =  myDate.getSeconds();
       wx.setStorageSync('loginTime',year+"-"+month+"-"+day+"  "+hour+":"+min+":"+sec)
   var that = this;
    
   
  },
  
 onShow: function () {
  }
 })