let app = getApp();
Page({
 data: {
  isSubmit: false,
  warn: "",
  phone: "",
  pwd: "",
  isPub: false,
  sex: "男"

 },
 formSubmit: function (e) {
  var FormArray=[];
  FormArray.state="success";
  FormArray.data = e.detail.value;
  console.log('form发生了submit事件，携带数据为：', FormArray);
  console.log('sex：', FormArray.data.sex);
  wx.request({
    url: 'http://192.168.1.155:80/test/welcome.php', 
    data: {
     password:FormArray.data.pwd,
     phone:FormArray.data.phone,
   
    },
    method:'POST',
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    success (res) {
      console.log("服务器返回数据:" + res.statusCode)
      console.log(res.data)
    }
  })
  let { phone, pwd, isPub, sex } = e.detail.value;
  if (!phone || !pwd) {
   this.setData({
    warn: "手机号或密码为空！",
    isSubmit: true
   })
   return;
  }
  this.setData({
   warn: "",
   isSubmit: true,
   phone,
   pwd,
   isPub,
   sex
  })
 },
 onLoad: function (options) {
 
 },
 formReset: function () {
  console.log('form发生了reset事件')
 }
})
