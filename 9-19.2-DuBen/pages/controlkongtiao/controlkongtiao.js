// pages/controlkongtiao/controlkongtiao.js
var app={

  /**
   * 页面的初始数据
   */
  data: {
    isChecked1: true,
    status:'开',//设置空调开关状态
    temperature:25,//设置初始温度
    model:1,//设置空调模式，1代表制冷、2代表制热、3代表自动
    cold:true,
    warm:false,
    auto:false
    },
cold:function(){//制冷模式
var model = this.data.model;
console.log("model=="+model)
if(model!=1){
  this.setData({
    model:1,
    cold:true,
    warm:false,
    auto:false
  })
}
},
warm:function(){//制热模式
  var model = this.data.model;
  console.log("model=="+model)
  if(model!=2){
    this.setData({
      model:2,
      cold:false,
      warm:true,
      auto:false
    })
  }
},
auto:function(){//自动模式
  var model = this.data.model;
  console.log("model=="+model)
  if(model!=3){
    this.setData({
      model:3,
      cold:false,
      warm:false,
      auto:true
    })
  }
},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(this.data.isChecked1==true){
      this.setData({
        status:'开'
      })
    }else{
      this.setData({
        status:'关'
      })
    }
  },
  addtemperature:function(){//升温
  var temperature = this.data.temperature;
  var add = temperature+1;
  console.log("temperature="+add)
  if(add<33){
    this.setData({
      temperature:add
    })
  }else{
    this.setData({
      temperature:32
    })
  }
},
  subtemperature:function(){//降温
    var temperature = this.data.temperature;
    var sub = temperature-1;
    console.log("temperature="+sub)
    if(sub>15){
      this.setData({
        temperature:sub
      })
    }else{
      this.setData({
        temperature:16
      })
    }
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
};
for (var i = 0; i < 2; ++i) {
  (function (i) {
    app['changeSwitch' + i] = function (e) {
      console.log("state=="+JSON.stringify(e.detail.value))
      if(e.detail.value==true){
        this.setData({
          status:'开'
        })
      }else{
        this.setData({
          status:'关'
        })
      }
      var changedData = {};
      changedData['isChecked' + i] = !this.data['isChecked' + i];
      this.setData(changedData);
      
    }
  })(i)
}
Page(app);