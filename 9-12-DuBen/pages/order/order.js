import { base64src } from '../../utils/base64src.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    Information:'',//身份证信息
    baiduToken: '',
    headimg:'',//身份证头像
    shareQrImg: '' //base64图片
  },

     // 获取百度access_token
     //注意：access_token的有效期为30天，切记需要每30天进行定期更换，或者每次请求都拉取新token；
     getBaiduToken: function() {
      const apiKey = 'U0mTNgGzPoo0w7WknrXfHcLI';
      const seckey = 'izm0AetWrO00wy5MssOPGjHT5HoUR3f1';
      const tokenUrl = `https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=${apiKey}&client_secret=${seckey}`;
   console.log("tokenUrl========"+tokenUrl)
      let that = this;
      wx.request({
        url: tokenUrl,
        method: 'POST',
        dataType: 'json',
        header: {
          'content-type': 'application/json; charset=UTF-8'
        },
        success: function(res) {
          console.log('getBaiduToken提示pass', res);
          that.setData({
            baiduToken: res.data.access_token
          })
        },
        fail: function(res) {
          console.log('getBaiduToken提示fail', res);
        }
      })
    },


    // 上传图片
    //图片格式：现支持PNG、JPG、JPEG、BMP，不支持GIF图片
    /*请求的图片需经过Base64编码，图片的base64编码指将图片数据编码成一串字符串，使用该字符串代替图像地址。您可以首先得到图片的二进制，然后用Base64格式编码即可。需要注意的是，图片的base64编码是不包含图片头的，如data:image/jpg;base64,*/
    uploadImg: function() {
      let that = this;
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success(res) {
          // tempFilePath可以作为img标签的src属性显示图片
          const tempFilePaths = res.tempFilePaths
          console.log(tempFilePaths)
          // 路径转化为base64图片
          wx.getFileSystemManager().readFile({
            filePath: tempFilePaths[0],
            encoding: 'base64',
            success: res => {
              console.log("res============"+JSON.stringify(res))
              console.log('读图片数据pass', res.data);
              that.scanImageInfo(res.data);
            },
            fail: res => {
              console.log('读图片数据fail', res.data);
            }
          })
        }
      })
    },
    // 扫描图片中的数据
    //接口文件档  https://ai.baidu.com/ai-doc/OCR/rk3h7xzck
    scanImageInfo: function(imageData) {
      let that = this;
      const detecUrl = 'https://aip.baidubce.com/rest/2.0/ocr/v1/idcard?access_token=' + this.data.baiduToken;
   
      wx.showLoading({
        title: '加载中',
      });
      wx.request({
        url: detecUrl,
        data: {
          image: imageData,//图像数据，base64编码后进行urlencode，要求base64编码和urlencode后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/jpeg/png/bmp格式
          id_card_side: 'front',//身份证正反面（front：身份证含照片的一面；back：身份证带国徽的一面）
          detect_photo:'true',//是否检测头像内容，默认不检测。可选值：true-检测头像并返回头像的 base64 编码及位置信息
        },
        method: 'POST',
        dataType: 'json',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: res => {
          console.log("success！身份证信息内容为："+JSON.stringify(res))
          console.log("身份证头像为："+res.data.photo)//	当请求参数 detect_photo = true时返回，头像切图的 base64 编码（无编码头，需自行处理）
          
         
          that.setData({
           Information: res.data.words_result,
           headimg: res.data.photo,
           shareQrImg:'data:image/jpeg;base64,'+res.data.photo
          }) 
          console.log("that.data.shareQrImg=="+that.data.shareQrImg)
          base64src(that.data.shareQrImg, res => {
            console.log("返回图片地址，直接赋值到image标签即可"+res) // 返回图片地址，直接赋值到image标签即可
            wx.setStorageSync('headimg', res)
          });
           console.log("--身份证头像数据类型：--"+typeof(res.data.photo))
           console.log("111-headimg========="+that.data.headimg)
           console.log("222-headimg========"+wx.getStorageSync('headimg'))
           console.log("JSON.stringify(res.data.words_result)=="+JSON.stringify(res.data.words_result))
          wx.navigateTo({
            
            url: '../InformationSuccess/InformationSuccess?Information='+JSON.stringify(res.data.words_result)+'&headimg='+wx.getStorageSync('headimg'),
          })
          console.log('1111----', res.data)
          console.log('success!', res.data.words_result)
        },
        fail: res => {
          console.log('fail')
        },
        complete: res => {
          wx.hideLoading();
        }
      })
    },
    //人脸识别
    testFace:function(){
         wx.navigateTo({
           url: '../testFace/testFace',
         })
  
    },
    //人脸验证
    verifyFace:function(){
 wx.navigateTo({
   url: '../verifyFace/verifyFace',
 })
    },
    
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getBaiduToken();
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