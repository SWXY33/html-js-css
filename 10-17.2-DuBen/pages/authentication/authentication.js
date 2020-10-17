// pages/authentication/authentication.js
const app = getApp()
var id_card="";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
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
    score:'',
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
   
  },
//人脸登陆
takePhoto(e) {
    

  
  var that = this;
  console.log("wx.canIUse('button.open-type.getUserInfo')="+that.data.canIUse)
  //拍照
  const ctx = wx.createCameraContext()
  ctx.takePhoto({
    quality: 'high',
    success: (res) => {
      console.log("res=========："+JSON.stringify(res))
      console.log("人脸图片："+res.tempImagePath)
      app.renlianimg = res.tempImagePath;
      this.getBaiduToken();
        this.setData({
        src: res.tempImagePath//获取图片
      })
      //图片base64编码

    

      wx.getFileSystemManager().readFile({
        filePath: this.data.src, //选择图片返回的相对路径
        encoding: 'base64', //编码格式
        success: res => { //成功的回调
          this.setData({
            base64: res.data
          })
        }
      })
    
    },//拍照成功结束
    fail:(res)=>{
      //失败尝试
    wx.showToast({
      title: '请重试',
      icon: 'loading',
      duration: 1000
    })
    }
  })//调用相机结束

    
},
error(e) {
  console.log(e.detail)
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
     that.uploadPhoto();
   }
 })
},
uploadPhoto1:function()
  {
    var that=this;
    //上传人脸进行注册-----test
    console.log("app.openid====="+app.openid)
console.log("BASE64===="+that.data.base64)
    wx.request({
      url: 'https://aip.baidubce.com/rest/2.0/face/v3/faceset/user/add?access_token=' + that.data.baidutoken,
      method: 'POST',
      data: {
        image: that.data.base64,//图片信息(总数据大小应小于10M)，图片上传方式根据image_type来判断。注：组内每个uid下的人脸图片数目上限为20张
        image_type: 'BASE64',//图片类型 BASE64:图片的base64值，base64编码后的图片数据，编码后的图片大小不超过2M；URL:图片的 URL地址( 可能由于网络等原因导致下载图片时间过长)；FACE_TOKEN：人脸图片的唯一标识，调用人脸检测接口时，会为每个人脸图片赋予一个唯一的FACE_TOKEN，同一张图片多次检测得到的FACE_TOKEN是同一个。
        group_id: 'lushanli',//自己建的用户组id
        user_id: '9_23',//这里获取用户昵称
        user_info:'username:'+app.username+'userhead:'+app.userHead+'openid:'+app.openid,
        liveness_control:'NORMAL',//活体检测控制,一般的活体要求(平衡的攻击拒绝率, 通过率)
      },
      header: {
        'Content-Type': 'application/json' // 默认值
      },
      success(res) { 
        console.log("res="+JSON.stringify(res))    
        that.setData({
          msg: res.data.error_msg
        })
        console.log(that.data.msg)      
        //做成功判断
        if (that.data.msg == 'SUCCESS') {//微信js字符串请使用单引号
          wx.showToast({
            title: '登录成功',
            icon: 'success',
            duration: 2000
          })
          console.log("人脸图片："+that.data.src)
         
        
        }else{
          wx.showToast({
            title: '检测不到人脸',
            icon: 'loading',
            duration: 3000
       })
        }
      }
    })
  },
uploadPhoto:function(){

    var that=this;
    that.uploadPhoto1();
    //上传人脸进行注册-----test
    console.log("app.openid====="+app.openid)
    var id_card_str = wx.getStorageSync("idcard")
    console.log("id_card_number====="+id_card)
    console.log("name====="+wx.getStorageSync("name"))
    app.username = wx.getStorageSync("name");
   
    wx.request({
      url: 'https://aip.baidubce.com/rest/2.0/face/v3/person/verify?access_token=' + this.data.baidutoken,
      method: 'POST',
      data: {
        image: this.data.base64,//图片信息(总数据大小应小于10M)，图片上传方式根据image_type来判断。注：组内每个uid下的人脸图片数目上限为20张
        image_type: 'BASE64',//图片类型 BASE64:图片的base64值，base64编码后的图片数据，编码后的图片大小不超过2M；URL:图片的 URL地址( 可能由于网络等原因导致下载图片时间过长)；FACE_TOKEN：人脸图片的唯一标识，调用人脸检测接口时，会为每个人脸图片赋予一个唯一的FACE_TOKEN，同一张图片多次检测得到的FACE_TOKEN是同一个。
        id_card_number:id_card,//身份证号码
        name: wx.getStorageSync("name"),//姓名（注：需要是UTF-8编码的中文）
       
      },
      header: {
        'Content-Type': 'application/json' // 默认值
      },
      success(res) { 
        console.log("res="+JSON.stringify(res))  
        //score类型为float,与公安小图相似度可能性，用于验证生活照与公安小图是否为同一人，有正常分数时为[0~100]，推荐阈值80，超过即判断为同一人 
        console.log("score="+JSON.stringify(res.data.result.score))  
        that.setData({
          msg: res.data.error_msg,
          score:res.data.result.score
        })
        console.log(that.data.msg)      
        //做成功判断
        if (that.data.msg == 'SUCCESS') {//微信js字符串请使用单引号
          wx.showToast({
            title: '相似度:'+that.data.score+',验证成功',
            icon: 'success',
            duration: 2000
          })
          console.log("score："+that.data.score)
          wx.switchTab({
            url: '../mine/mine',
          })
        
        }else{
          wx.showToast({
            title: '检测不到人脸',
            icon: 'loading',
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


// 用户点击右上角分享
onShareAppMessage: function () {

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