Page({
 
  onLoad: function () {
    var that = this;
 
    wx.request({
      url: 'http://www.intmote.com/myproject/test/new_file.json',
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