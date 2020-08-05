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
 formReset: function () {
  console.log('form发生了reset事件')
 }
})
