Page({
 
  onLoad: function () {
    var that = this;
 
    wx.request({
      url: 'http://dubeniot.com:8080/iot-manager/query/getDeviceBindedByType?deviceType=curtains',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          goldData: res.data.result[0],
 
        })
 
      }
    })
  }
})