
//获取应用实例
const app = getApp()

Page({
  data: {
  },
  onLoad: function () {
    var self=this;
    this.mapCtx = wx.createMapContext('myMap');
    wx.getLocation({
      type: 'gcj02',
      success(res) {
        self.setData({
          latitude : res.latitude,
          longitude : res.longitude,
          markers: [{
            id: 1,
            latitude: res.latitude,
            longitude: res.longitude,
            iconPath: '../../res/images/ic_city_location.png',
            callout:{
              content:"您所在位置",
              bgColor:"#fff",
              padding:"5px",
              borderRadius:"2px",
              borderWidth:"1px",
              borderColor:"#07c160",
            }
          },
            {
              id: 2,
              latitude: res.latitude,
              longitude: res.longitude+0.01,
              iconPath: '../../res/images/ic_city_location.png',
              callout: {
                content: "酒店位置",
                bgColor: "#fff",
                padding: "5px",
                borderRadius: "2px",
                borderWidth: "1px",
                borderColor: "#07c160",
               
              }
            }
          ],
        });
      }
    })
  },
})