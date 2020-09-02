// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showModalStatus: false,
    hidden: true,
    btnValue:'',
    time:'0',
    color:'#000',
    pointer:''
  },
 
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // 查看是否授权
    wx.getSetting({
     success: function(res) {
      if (res.authSetting['scope.userInfo']) {
       wx.getUserInfo({
        success: function(res) {
         // 用户已经授权过,不需要显示授权页面,所以不需要改变 isHide 的值
         // 根据自己的需求有其他操作再补充
         // 我这里实现的是在用户授权成功后，调用微信的 wx.login 接口，从而获取code
         wx.login({
          success: res => {
           // 获取到用户的 code 之后：res.code
           console.log("用户的code:" + res.code);
           // 可以传给后台，再经过解析获取用户的 openid
           // 或者可以直接使用微信的提供的接口直接获取 openid ，方法如下：
            wx.request({
             // 自行补上自己的 APPID 和 SECRET
            url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wx3f21ca66fe7e5f1b&secret=7f48cea5dc5d3dc09bc99e812cdd145e&js_code=' + res.code + '&grant_type=authorization_code',
            success: res => {
           //   // 获取到用户的 openid
              console.log("用户的openid:" + res.data.openid);
              console.log("data====:" + JSON.stringify(res.data));
              wx.setStorageSync('session_key',res.data.session_key)
             }
             
           });
          }
         });
        }
       });
      } else {
       // 用户没有授权
       // 改变 isHide 的值，显示授权页面
       that.setData({
        isHide: true
       });
      }
     }
    });
   },
   
   bindGetUserInfo: function(e) {
      //获取用户信息
      console.log("e.detail=============="+JSON.stringify(e.detail))
      let encryptedData = e.detail.encryptedData;
      let iv = e.detail.iv;
      let session_key = wx.getStorageSync('session_key');
      console.log("encryptedData=============="+encryptedData);
      console.log("iv=============="+iv);
      console.log("session_key=============="+session_key);
      wx.request({
       
         url: 'http://192.168.1.157:8090/wx/miniGetPhone?encryptedData='+encryptedData+'&iv='+iv+'&session_key='+session_key, 
         method:'POST',
         header: {
           'content-type': 'application/json'
         },
         success (res) {
           console.log("服务器返回数据:" + res.statusCode)
           console.log(res.data)
         }
       
     });
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
      isHide: false
     });
    } else {
     //用户按了拒绝按钮
     wx.showModal({
      title: '警告',
      content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
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
  getCode:function(){//获取验证码
    var that = this; 
    that.setData({
      btnDisabled:true,//只要点击了按钮就让按钮禁用 （避免正常情况下多次触发定时器事件）
      hidden: false,
      btnValue: '60'+'s',
      index:'0',
      time:'60',
      color:'#CCC',
      pointer:'none'
      })
      var btnValue = that.data.time //把手机号跟倒计时值变例成js值
      wx.showToast({
        title: '短信验证码已发送',
        icon: 'none',
        duration: 2000
        });
        //设置一分钟的倒计时
        var interval = setInterval(function() {
          btnValue--; //每执行一次让倒计时秒数减一
          that.setData({
          btnValue: btnValue + 's', //按钮文字变成倒计时对应秒数
        })
        //如果当秒数小于等于0时 停止计时器 且按钮文字变成重新发送 且按钮变成可用状态 倒计时的秒数也要恢复成默认秒数 即让获取验证码的按钮恢复到初始化状态只改变按钮文字
        if (btnValue <= 0) { 
        clearInterval(interval)
        that.setData({
          btnValue: '重新发送',
        color: '#000',
        pointer:''
        })
        }
        }, 1000);
  },
  loginByPhone: function() {
   wx.navigateTo({
     url: '../phonelogin/phonelogin',
   })
  },
  // 弹框
  loginByOtherPhone: function(e) {
    this.setData({
      hidden: false,
      btnValue: '获取验证码'
      })
    var currentStatu = e.currentTarget.dataset.statu;
    this.util(currentStatu)
  },
  util: function(currentStatu) {
    /* 动画部分 */
    // 第1步：创建动画实例   
    var animation = wx.createAnimation({
      duration: 200, //动画时长  
      timingFunction: "linear", //线性  
      delay: 0 //0则不延迟  
    });

    // 第2步：这个动画实例赋给当前的动画实例  
    this.animation = animation;

    // 第3步：执行第一组动画  
    animation.opacity(0).rotateX(-100).step();

    // 第4步：导出动画对象赋给数据对象储存  
    this.setData({
      animationData: animation.export()
    })

    // 第5步：设置定时器到指定时候后，执行第二组动画  
    setTimeout(function() {
      // 执行第二组动画  
      animation.opacity(1).rotateX(0).step();
      // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象  
      this.setData({
        animationData: animation
      })
      //关闭  
      if (currentStatu == "close") {

        this.setData({
          showModalStatus: false
        });
        wx.showToast({
          title: '登录成功',
          icon: 'succes',
          duration: 1000,
          mask: true
        })
      }
    }.bind(this), 200)
    // 显示  
    if (currentStatu == "open") {
      this.setData({
        showModalStatus: true
      });
    }
    if (currentStatu == "rightclose") {
      this.setData({
        showModalStatus: false
      });
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
})