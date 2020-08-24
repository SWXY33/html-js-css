// pages/success/success.js
Page({
  data:{
    myFood:''
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    console.log("options="+JSON.stringify(options))
    this.setData({
      myFood:options
    })
    wx.setStorageSync('myFood', options)
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  
  returnClick:function(){
    console.log("wx.getStorageSync('myFood')="+JSON.stringify(wx.getStorageSync('myFood')))
    getApp().globalData.showDialog = JSON.stringify(wx.getStorageSync('myFood'))
    wx.switchTab({
      url: '../order/order',
    })
      
  },

  // 下单支付
  doPay:function(){
    var _this = this;
    // 允许从相机和相册扫码
    wx.scanCode({
      success: (res) => {
        var result = res.result;
        console.log("扫码结果："+result)
        _this.setData({
          result: result,

        })
      }
    })
    
  }
})