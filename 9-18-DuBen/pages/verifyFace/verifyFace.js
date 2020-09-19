Page({
  data: {
    src:'',
    base64: "",
    baidutoken: "",
    msg: null
  },
  //拍照并编码
  takePhoto() {
    var that=this;
    //拍照
    const ctx = wx.createCameraContext()
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        that.setData({
          src: res.tempImagePath
        })
        //图片base64编码
        wx.getFileSystemManager().readFile({
          filePath: that.data.src, //选择图片返回的相对路径
          encoding: 'base64', //编码格式
          success: res => { //成功的回调          
            that.setData({
              base64: res.data
            })
            that.checkPhoto();
          }
        })
      }
    })  

    wx.showToast({
      title: '请重试',
      icon: 'loading',
      duration: 500
    })
  },
  error(e) {
    console.log(e.detail)
  },
  checkPhoto: function () {
    var that=this;
    //acess_token获取
    wx.request({
      url: 'https://aip.baidubce.com/oauth/2.0/token', //真实的接口地址
      data: {
        grant_type: 'client_credentials',
        client_id: 'GVR6ZAhjcPsorOilvDESPU0j',
        client_secret: 'NR1RKICkCgH9jqawiq6l6GPGgBDfUI2z'//用自己的
      },
      header: {
        'Content-Type': 'application/json' // 默认值
      },
      success(res) {
        that.setData({
          baidutoken: res.data.access_token//获取到token
        })        
        that.validPhoto();
      }
    })
  },
  validPhoto:function(){
    var that = this;
    //上传人脸进行 比对
    wx.request({
      url: 'https://aip.baidubce.com/rest/2.0/face/v3/search?access_token=' + that.data.baidutoken,
      method: 'POST',
      data: {
        image: this.data.base64,
        image_type: 'BASE64',
        group_id_list: 'lushanli',//自己建的用户组id
      },
      header: {
        'Content-Type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res)
        that.setData({
          msg: res.data.result.user_list[0].score
        })
        console.log("相似度："+that.data.msg+"%")
        if (that.data.msg > 80) {
          console.log("success")
          wx.showToast({
            title: '相似度为'+that.data.msg+'%,验证通过',
            icon: 'success',
            duration: 1000
          })         
          //验证通过，跳转页面
          wx.navigateTo({
            url: '../varifySuccess/varifySuccess',
          })
        }
        else{
          console.log("fail")
          wx.showToast({
            title: '验证不通过',
            icon: 'fail',
            duration: 1000
          })    
        }
      }
    });
  }
})