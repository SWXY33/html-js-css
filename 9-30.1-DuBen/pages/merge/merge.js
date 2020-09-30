// pages/merge/merge.js
const app = getApp()
var id_card="";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('view.open-type.getUserInfo'),
    nickName: "",
    src: "",//图片的链接
    role:true,
    true:true,
    baidutoken: "",
    base64: "",
    msg: "",
    allow_id:'',
    error:'',
    allow_name:'',
    errorname:'',
    id_card:'',
    userHead:'',
    userName:'',
    renlianimg:'',
    successname:0,
    successid:0
  },
  id:function(e){
    var ts = this;
    var code = e.detail.value
    console.log(code)

    //身份证号合法性验证 
    //支持15位和18位身份证号
    //支持地址编码、出生日期、校验位验证
      var city = { 11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江 ", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北 ", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏 ", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外 " };
      var tip = "";
      var pass = true;
    var reg = /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/;
    if (!code || !code.match(reg)) {
        tip = "身份证号格式错误";
        pass = false;
      }else if (!city[code.substr(0, 2)]) {
        tip = "地址编码错误";
        pass = false;
      }else {
        //18位身份证需要验证最后一位校验位
        if (code.length == 18) {
          code = code.split('');
          //∑(ai×Wi)(mod 11)
          //加权因子
          var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
          //校验位
          var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
          var sum = 0;
          var ai = 0;
          var wi = 0;
          for (var i = 0; i < 17; i++) {
            ai = code[i];
            wi = factor[i];
            sum += ai * wi;
          }
          var last = parity[sum % 11];
          if (parity[sum % 11] != code[17]) {
            tip = "校验位错误";
            pass = false;
          }
        }
      }
    console.log(pass)
    if (pass) { 
      ts.setData({ 
        successid:1,
        allow_id: true ,
        error: false});
      for(var i=0;i<code.length;i++){
       id_card+=code[i];
      } 
      console.log("id_card="+id_card)
    wx.setStorageSync("idcard", id_card)} 
      if (!pass) {
        console.log("tip"+tip);
        wx.showToast({
          title: tip,
          image:'../../img/fail.png',
     })
        ts.setData({ 
          allow_id: false ,
          error: true });}
      // return pass;
      console.log("ts.data.successname="+ts.data.successname+";ts.data.successid="+ts.data.successid)
      if(ts.data.successname==1&&ts.data.successid==1){
      ts.getBaiduToken();
      }
  },
  name:function(e){
    var ts = this;
    var name = e.detail.value
    var reg = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,6}$/;
    console.log("name.match(reg)==="+name.match(reg))
    if(name.match(reg)){
      console.log("姓名格式正确！");
    ts.setData({
      successname:1,
      allow_name:true,
      errorname:false
    });
    wx.setStorageSync("name", name)}
    else{
      console.log("姓名格式有误！");
      wx.showToast({
        title: "姓名格式错误！",
        image:'../../img/fail.png',
   })
      ts.setData({
        allow_name:false,
        errorname:true
      }); 
      
    }
    console.log(name)
    console.log("ts.data.successname="+ts.data.successname+";ts.data.successid="+ts.data.successid)
    if(ts.data.successname==1&&ts.data.successid==1){
    ts.getBaiduToken();
    }
  },
  getBaiduToken:function(){
    var that=this;
    //acess_token获取,qs:需要多次尝试
    wx.request({
      url: 'https://aip.baidubce.com/oauth/2.0/token', //是真实的接口地址
      data: {
        grant_type: 'client_credentials',
        client_id: 'GVR6ZAhjcPsorOilvDESPU0j',//用你创建的应用的API Key（15177553656【Sa888111】账号）
        client_secret: 'NR1RKICkCgH9jqawiq6l6GPGgBDfUI2z'//用你创建的应用的Secret Key
      },
      header: {
        'Content-Type': 'application/json' // 默认值
      },
      success(res) {
        that.setData({
          baidutoken: res.data.access_token//获取到token
        })
        that.heyan();
      }
    })
  },
  heyan:function(){
    var that=this;
  
    console.log("app.openid====="+app.openid)
    console.log("that.data.baidutoken====="+that.data.baidutoken)
    console.log("id_card====="+wx.getStorageSync("idcard"))
    console.log("name====="+wx.getStorageSync("name"))
    wx.request({
      url: 'https://aip.baidubce.com/rest/2.0/face/v3/person/idmatch?access_token=' + that.data.baidutoken,
      method: 'POST',
      data: {
        id_card_number: wx.getStorageSync("idcard"),
        name: wx.getStorageSync("name")
      },
      header: {
        'Content-Type': 'application/json' // 默认值
      },
      success(res) { 
        
        console.log("res="+JSON.stringify(res))    
        that.setData({
          msg: res.data.error_code
        })
        console.log(that.data.msg)      
        //做成功判断
        //根据error_code判断，为0时表示匹配为同一个人。否则按错误码表的定义，如222351表示身份证号码与名字不匹配。
        if (that.data.msg == '0') {//微信js字符串请使用单引号
          wx.showToast({
            title: '信息匹配成功',
            icon: 'success',
            duration: 2000
          })
       
        
        }else{
          wx.showModal({
            title: '身份证与名字不匹配',
            image:'../../img/fail.png',
            duration: 3000
       })
        }
      }
    })
  },
//获取用户信息
bindGetUserInfo: function (e) {
  //获取用户信息
  console.log("e.detail=============="+JSON.stringify(e))
 
if (e.detail.userInfo) {
 //用户按了允许授权按钮
 var that = this;
 // 获取到用户的信息了，打印到控制台上看下
 console.log("用户的信息如下：");
 console.log(e.detail.userInfo);
 this.setData({
   userHead: e.detail.userInfo.avatarUrl,
   welcome:'尊贵的，',
   userName:e.detail.userInfo.nickName,
 }),

 //授权成功后,通过改变 isHide 的值，让实现页面显示出来，把授权页面隐藏起来
 that.setData({
  isHide: false,
  canIUse:false
 });
} else {
 //用户按了拒绝按钮
 wx.showModal({
  title: '警告',
  content: '您点击了拒绝授权，将无法使用该功能，请授权之后再进入!!!',
  showCancel: false,
  confirmText: '返回授权',
  success: function(res) {
   // 用户没有授权成功，不需要改变 isHide 的值
   if (res.confirm) {
    console.log('用户点击了“返回授权”');
   }
  }
 });
}
},

//先授权登陆，再拍照注册
btnreg: function () {
  wx.showModal({
    title: '注册须知',
    content: '先授权登陆，再拍照注册哦！网络可能故障，如果不成功，请再试一下！',
  })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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