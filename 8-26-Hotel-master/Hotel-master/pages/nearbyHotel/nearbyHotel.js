// pages/searchHotel/searchHotel.js

var mHotelList = [];

function HotelBean() {
     var image;
     var name;
     var score;
     var tel;
     var address;
     var distance;
     var price;
}

Page({

     /**
      * 页面的初始数据
      */
     data: {
          location: '',
          hotelArray: [],
          loadenable: true,
          shownavindex: 1,
          priceL2H: true,
          nearbyHotel:[]
     },

     /**
      * 生命周期函数--监听页面加载
      */
     onLoad: function (options) {
          this.setData({
               location: options.location
          });
          console.log("options.location="+options.location)
   
          var that = this;
          var nearbyHotelUrl='https://apis.map.qq.com/ws/place/v1/search';
          const tencentMapKey = 'XPIBZ-F4S6F-SHHJI-NO25R-R76VF-X6BCB';
          wx.getLocation({
               type: 'gcj02', //返回可以用于wx.openLocation的经纬度
                 success: function (res) {  //因为这里得到的是你当前位置的经纬度
                   var latitude = res.latitude;//纬度
                   var longitude = res.longitude;//经度
                   console.log("定位：纬度="+latitude+",经度="+longitude)
                   wx.request({
                    url: nearbyHotelUrl+'?keyword=酒店&boundary=nearby('+latitude+','+longitude+',1000)&key='+tencentMapKey,
                    method:'GET',
                    header: {
                         'content-type': 'application/json'
                       },
                       success (res) {
                         console.log("服务器返回数据:" + res.statusCode);
                         console.log(res.data);
                         var nearbyHotels=res.data.data;
                         console.log("附近酒店：查找到"+nearbyHotels.length+"个：---------"+JSON.stringify(nearbyHotels))
                 
          for (var i = 0; i < nearbyHotels.length; i++) {
               var hotelBean = new HotelBean();
               hotelBean.image = '../../res/images/ic_hotel_image.png';
               hotelBean.name = nearbyHotels[i].title;
               hotelBean.score = 5.0;
               hotelBean.tel = nearbyHotels[i].tel;
               hotelBean.address = nearbyHotels[i].address;
               hotelBean.distance = nearbyHotels[i]._distance;
               hotelBean.price = 199;

               mHotelList.push(hotelBean);
          }

          that.setData({
               hotelArray: mHotelList
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
                 
                });
               
     },

     filterMenuTap: function (e) {
          var index = e.currentTarget.dataset.index;
          this.setData({
               shownavindex: index
          });
          if (index == 2) {
               var priceL2H = !this.data.priceL2H;
               this.setData({
                    priceL2H: priceL2H
               });
          } else {
               this.setData({
                    priceL2H: true
               });
          }
     },

     filterTap: function () {
          wx.navigateTo({//筛选
               url: '../hotelFilter/hotelFilter',
          })
     },

     locationTap: function () {
          wx.navigateTo({//选择城市
               url: '../select_city/select_city'
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
          var that = this;
          wx: setTimeout(function () {
               mHotelList = [];
               for (var i = 0; i < 10; i++) {
                    var hotelBean = new HotelBean();
                    hotelBean.image = '../../res/images/ic_hotel_image.png';
                    hotelBean.name = '深圳市优软科技大酒店';
                    hotelBean.score = 4.5;
                    hotelBean.tel = '停车场/温泉/餐饮';
                    hotelBean.address = '深大地铁站';
                    hotelBean.distance = '3.5';
                    hotelBean.price = 299;

                    mHotelList.push(hotelBean);
               }

               that.setData({
                    hotelArray: mHotelList
               });
               wx.showToast({
                    title: '刷新成功',
                    duration: 1500
               })
               wx.stopPullDownRefresh();
          }, 2000);
     },

     /**
      * 页面上拉触底事件的处理函数
      */
     onReachBottom: function () {
          var that = this;
          wx: setTimeout(function () {
               for (var i = 0; i < 10; i++) {
                    var hotelBean = new HotelBean();
                    hotelBean.image = '../../res/images/ic_hotel_image.png';
                    hotelBean.name = '深圳市优软科技大酒店';
                    hotelBean.score = 4.5;
                    hotelBean.tel = '停车场/温泉/餐饮';
                    hotelBean.address = '深大地铁站';
                    hotelBean.distance = '3.5';
                    hotelBean.price = 299;

                    mHotelList.push(hotelBean);
               }

               that.setData({
                    hotelArray: mHotelList
               });
          }, 2000);

     },

     /**
      * 用户点击右上角分享
      */
     onShareAppMessage: function () {

     }
})