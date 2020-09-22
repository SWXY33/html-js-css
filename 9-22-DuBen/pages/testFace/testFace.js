// camera.js
const app = getApp()
Page({

  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    nickName: "",
    src: "",//图片的链接
    baidutoken: "",
    base64: "",
    msg: "",
    userHead:'',
    userName:'',
    renlianimg:''
  },
 /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //获取全局数据
    
    let username = app.username;
    let userHead = app.userHead;
    let renlianimg = app.renlianimg;
    this.setData({
      nickname:username,
      headimg:userHead,
      renlianimg:renlianimg,
    })
    console.log("username====="+username+";userHead========="+userHead);
    console.log("renlianimg======="+renlianimg);
      },
    
  //人脸登陆
  takePhoto(e) {
    

    let username = e.currentTarget.dataset.username;
    let userHead = '';
   console.log("userName====="+username+";userHead="+userHead)
   app.username = username;
   app.userHead = userHead;
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

  uploadPhoto:function()
  {
    var that=this;
    //上传人脸进行注册-----test
    console.log("app.openid====="+app.openid)

    wx.request({
      url: 'https://aip.baidubce.com/rest/2.0/face/v3/faceset/user/add?access_token=' + this.data.baidutoken,
      method: 'POST',
      data: {
        image: this.data.base64,//图片信息(总数据大小应小于10M)，图片上传方式根据image_type来判断。注：组内每个uid下的人脸图片数目上限为20张
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

  //先授权登陆，再拍照注册
  btnreg: function () {
    wx.showModal({
      title: '注册须知',
      content: '先授权登陆，再拍照注册哦！网络可能故障，如果不成功，请再试一下！',
    })
  }
})