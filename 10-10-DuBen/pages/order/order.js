import { base64src } from '../../utils/base64src.js'
var roomName;
var startDate;
var endDate;
var day;
var housetype;
var hotelName;
var orderapp =  getApp();
var id_card="";
var heyanResult='2';
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hotelName:'',
    Information:'',//身份证信息
    baiduToken: '',//文字识别Token
    baidutoken1:'',//人脸识别Token
    idnumber:'',//身份证号
    idname:'',//身份证姓名
    headimg:'',//身份证头像
    shareQrImg: '', //base64图片
    roomName:'',
    startDate:'',
    endDate:'',
    day:'',
    price:'',
    allow_name:'',
    errorname:'',
    successname:0,
    successid:0,
    heyanResult:'',//核验身份证名字与身份证号是否匹配
    select: false,
    prefix_num: '86',
    prefix: ['86', '852', '853','886' ],
    areaName:'中国大陆',
    phone: '',
    username:''
 },
    // 获取百度access_token
     //注意：access_token的有效期为30天，切记需要每30天进行定期更换，或者每次请求都拉取新token；
     getBaiduToken: function() {
       //（15177553656【Sa888111】账号文字识别接口）
      const apiKey = 'dMfKVOgQWCqWtX0QYULxGCWp';
      const seckey = 'IZVbgE5XL5lr1ONUCepEojSXpAd2efuW';
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
    //接口文件档  https://cloud.baidu.com/doc/OCR/s/rk3h7xzck
    scanImageInfo: function(imageData) {
      let that = this;
      const detecUrl = 'https://aip.baidubce.com/rest/2.0/ocr/v1/idcard?access_token=' + this.data.baiduToken;//该接口500次/天免费（（15177553656【Sa888111】账号））
   
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
         /* wx.navigateTo({
            
            url: '../InformationSuccess/InformationSuccess?Information='+JSON.stringify(res.data.words_result)+'&headimg='+wx.getStorageSync('headimg'),
          })*/
          console.log('1111----', res.data)
          if(res.data.image_status=='normal'){
            console.log('success!', res.data.words_result)
            console.log('success!'+typeof(res.data.words_result)+'-----'+res.data.words_result)
            var obj = res.data.words_result;
            console.log('身份证姓名===='+obj[Object.keys(obj)[0]].words)
            console.log('身份证号===='+obj[Object.keys(obj)[3]].words)
            that.setData({
              idnumber : obj[Object.keys(obj)[3]].words,
              idname:obj[Object.keys(obj)[0]].words
            })
          }else if(res.data.image_status=='reversed_side'){
        wx.showModal({
           title: '提示',
           content: '身份证正反面颠倒',
          })
		  }else if(res.data.image_status=='non_idcard'){
        wx.showModal({
           title: '提示',
           content: '上传的图片中不包含身份证',
          })
		  }else if(res.data.image_status=='blurred'){
        wx.showModal({
           title: '提示',
           content: '身份证模糊',
          })
		  }else if(res.data.image_status=='other_type_card'){
        wx.showModal({
           title: '提示',
           content: '其他类型证照',
          })
		  }else if(res.data.image_status=='over_exposure'){
        wx.showModal({
           title: '提示',
           content: '身份证关键字段反光或过曝',
          })
		  }else if(res.data.image_status=='over_dark'){
        wx.showModal({
           title: '提示',
           content: '身份证欠曝（亮度过低）',
          })
		  }else if(res.data.image_status=='unknown'){
        console.log("未知状态!")
        wx.showModal({
           title: '提示',
           content: '未知状态',
          })
		  }
          
        },
        fail: res => {
          console.log('fail')
        },
        complete: res => {
          wx.hideLoading();
        }
      })
    },

  id:function(e){//用来验证身份证格式是否正确
    var ts = this;
    id_card ='';
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
      ts.setData({
        idnumber:id_card
      })
      } 
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
      ts.varify();
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
  ts.setData({
    idname:name
  })
}
    else{
      console.log("姓名格式有误！");
      wx.showToast({
        title:"姓名格式错误！",
        image:'../../img/fail.png',
   })

      
    }
    console.log(name)
    console.log("ts.data.successname="+ts.data.successname+";ts.data.successid="+ts.data.successid)
    if(ts.data.successname==1&&ts.data.successid==1){
    ts.varify();
    }
 
  },
  varify:function(){
    var that=this;
    //acess_token获取,qs:需要多次尝试
    wx.request({
      url: 'https://aip.baidubce.com/oauth/2.0/token', //是真实的接口地址
      data: {
        grant_type: 'client_credentials',
        client_id: 'GVR6ZAhjcPsorOilvDESPU0j',//用你创建的应用的API Key（15177553656【Sa888111】账号人脸识别接口）
        client_secret: 'NR1RKICkCgH9jqawiq6l6GPGgBDfUI2z'//用你创建的应用的Secret Key
      },
      header: {
        'Content-Type': 'application/json' // 默认值
      },
      success(res) {
        console.log("res==="+res)
        console.log("baidutoken1==="+res.data.access_token)
        that.setData({
          baidutoken1: res.data.access_token//获取到token
        })

      }
    })
  },
  heyan:function(){//身份证与名字比对
    var that=this;
    console.log("app.openid====="+app.openid)
    console.log("that.data.baidutoken====="+that.data.baidutoken1)
    console.log("id_card====="+that.data.idnumber)
    console.log("name====="+that.data.idname)
    wx.request({
      url: 'https://aip.baidubce.com/rest/2.0/face/v3/person/idmatch?access_token=' + that.data.baidutoken1,//总量500次赠送 + 超出按量计费（0.3 元/次，累计500次免费调用，免费额度用尽后开始计费）
      method: 'POST',
      data: {
        id_card_number: that.data.idnumber,
        name: that.data.idname
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
          heyanResult=1;
          console.log("名字与身份证号匹配 heyanResult="+heyanResult)
          that.setData({
            heyanResult:1
          })
          wx.showToast({
            title: '身份证号与姓名一致',
            icon: 'success',
            duration: 2000
          })
     
        
        }else{
          heyanResult=0;
          console.log("名字与身份证号不匹配 heyanResult="+heyanResult)
          that.setData({
            heyanResult:0
          })
          wx.showModal({
            title: '身份证号与名字不匹配',
            image:'../../img/fail.png',
            duration: 3000
       })
      
        }
      }
    })
  },
 formSubmit: function (e) {
   var that =this;

   
  console.log("roomName="+roomName);
  console.log("startDate="+startDate);
  console.log("endDate="+endDate);
  console.log("day="+day);
  console.log("housetype="+housetype)
  orderapp.hotelName = hotelName;
  orderapp.roomName = roomName;
  var FormArray=[];
  FormArray.state="success";
  FormArray.data = e.detail.value;
  console.log('form发生了submit事件，携带数据为：', FormArray);

  if(FormArray.data.username==''){
  console.log("用户名不能为空！！")
  return
  }else if(FormArray.data.phone==''){
    console.log("手机号不能为空！！")
    return
  }else if(FormArray.data.idnumber==''){
    console.log("身份证号不能为空！！")
    return
  }
  that.heyan();
  
  var orderInf = '订单号：DB2020092917\r\n'+roomName+'\r\n入住时间：'+startDate+'到'+endDate+'共'+day+'天\r\n姓名：'+FormArray.data.username+"\r\n手机："+FormArray.data.phone+'\r\n身份证号：'+FormArray.data.idnumber+'\r\n合计：'+this.data.price+'元';
  

  wx.request({//预订房间 
    url: 'https://dubeniot.com/iot-manager/Hotel/reserveRoom?bookingPerson='+FormArray.data.username+'&duration='+day+'&hotelId=160041825383116&houseType='+housetype+'&idnumber='+FormArray.data.idnumber+'&phone='+FormArray.data.phone,
    method: 'POST',
    
    header: {
      'Content-Type': 'application/json' // 默认值
    },
    success(res) { 

      console.log("订单号="+JSON.stringify(res.data.data)) 
      
      orderapp.orderNumber = res.data.data;
        wx.showToast({
        title: '预订成功',
        icon:'success'
      })
    
      setTimeout(function () {
      wx.reLaunch({
        url: '/pages/myroom/myroom',
      })
    }, 2000)
    }
  })
  that.setData({
    idnumber:''
  })
  console.log("111身份证与名字是否匹配(1匹配，0不匹配)="+that.data.heyanResult);
  console.log("222身份证与名字是否匹配(1匹配，0不匹配)="+heyanResult);
 },
             
bindShowMsg() {
  this.setData({
    select: !this.data.select
  })
},
mySelect(e) {
  console.log(e)
  var name = e.currentTarget.dataset.name;
  console.log("select="+name)
  if(name==86){
    this.setData({
    areaName:'中国大陆'
    })
  }else if(name==852){
    this.setData({
    areaName:'中国香港'
    })
  }else if(name==853){
    this.setData({
    areaName:'中国澳门'
    })
  }else if(name==886){
    this.setData({
    areaName:'中国台湾'
    })
  }
  this.setData({
    prefix_num: name,
    select: false
    })
},

 
    
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
this.getBaiduToken();
    console.log(options);
          hotelName = options.hotelName;
          roomName = options.roomname;
          startDate = options.startDate;
          endDate = options.endDate;
          day = options.day;
          var price = options.price;
          housetype = options. housetype;
          this.setData({
               roomName: roomName,
               startDate: startDate,
               endDate: endDate,
               day:day,
               price:price,
               hotelName:hotelName,
          });
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