var app = getApp();
Page({
  data:{
    myFood:[
      {foodlist:''},
      {index:''},
      {name:''},
      {price:''},
      {img:''},
      {num:''},
      {prices:''}
      
    ],
    goods:[],
    orderList: {},
    total: 0, //总价格
    toastHidden: true,
    toastTxt: "",
    tables: ["1号", "2号", "3号", "4号", "5号", "6号", "7号", "8号", "9号"], //桌号
    tableIndex: 0
  },
	//根据id获取商品名字
  findName:function(id,arr) {
    for (var key in arr){
      var goodsId = arr[key].id,
      goodsName = arr[key].name;
      if(id==goodsId){
        return goodsName
      }
    }
    },
    //根据id获取商品名字
  findPrice:function(id,arr) {
    for (var key in arr){
      var goodsId = arr[key].id,
      goodsPrice = arr[key].price;
      if(id==goodsId){
        return goodsPrice
      }
    }
    },
    //根据id获取商品图片
  findImg:function(id,arr) {
    for (var key in arr){
      var goodsId = arr[key].id,
      goodsImg = arr[key].pic;
      if(id==goodsId){ 
        return goodsImg
      }
    }
    },
     //根据id获取商品销量
  findSold:function(id,arr) {
    for (var key in arr){
      var goodsId = arr[key].id,
      goodsSold = arr[key].sold;
      if(id==goodsId){
        return goodsSold
      }
    }
    },
    
  // 页面初始化 options为页面跳转所带来的参数
  onLoad:function(options){
    console.log("total=========="+options.total)
    
    
    this.setData({
      total: options.total
    });
    wx.setStorageSync('goods', options.goods)
    var goods = wx.getStorageSync('goods');
    var  orderList = wx.getStorageSync('orderList');
    var num = orderList.count;
    console.log("orderList=="+JSON.stringify(orderList)+";;count="+num)
    var  list=orderList.list;
    let idArray = Object.keys(list);//购物车商品id
    let numArray= Object.values(list);//购物车商品数量
    console.log("idArray="+idArray+";numArray="+numArray)
    
      
 
   console.log('list===='+JSON.stringify(list))
   console.log("goods===="+goods+"goods的数据类型为："+typeof(goods))
   var GoodsObject = JSON.parse(goods);//json字符串转化为对象
   console.log("GoodsObjectde的数据类型是："+typeof(GoodsObject))
   //Object.keys(object)
   //返回一个对象的自身可枚举属性组成的数组，数组中属性名的排列顺序和使用 for…in 循环遍历该对象时返回的顺序一致
   //Object.values(object)
   //返回一个对象所有可枚举属性值
   let GoodsArray = Object.values(GoodsObject)
   var myFood=[];
   
   var index=0;
   for (var key in idArray){
    var foodData={};
    index ++;
    var foodId = idArray[key];
    console.log("id="+foodId)
  
    var name = this.findName(foodId,GoodsArray);
    var price = this.findPrice(foodId,GoodsArray);
    var img = this.findImg(foodId,GoodsArray);
    var sold = this.findSold(foodId,GoodsArray);
      var num = numArray[key];
      var prices = price*num;
      var details = '{"foodlist":'+'"'+index+'----'+name+'----'+num+'份'+'x'+price+'元----'+'￥'+price*num+'\n"}';
      foodData["foodlist"]=details;
      foodData["index"]=index;
      foodData["name"]=name;
      foodData["price"]=price;
      foodData["num"]=num;
      foodData["img"]=img;
      foodData["prices"]=prices;
      myFood.push(foodData)
      
  }

  console.log("订单详情："+myFood+"myFood的数据类型是："+typeof(myFood))
  console.log("!!!!!"+myFood)
  console.log("jsonStr："+JSON.stringify(myFood))
  //var jsObject = JSON.parse(myFood);    //转换为json对象
  this.setData({
    myFood:myFood
    })
    wx.setStorageSync('myFood', myFood)
  },
  
  //修改标题
  //生命周期函数--监听页面初次渲染完成
  onReady:function(){
    wx.setNavigationBarTitle({
      title: '提交订单'
    })
  },
  
  //返回修改
  returnClick:function(){
    wx.navigateBack();
  },

  //确认提交
  okClick:function(){

    //1s后关闭
    var _this = this;
    setTimeout(function(){
      _this.setData({
        toastHidden: true
      });
    }, 1000);

    if(this.data.total == 0){
        this.setData({
          toastHidden: false,
          toastTxt: "没有选择商品"
        });
    }else{
        this.setData({
          toastHidden: false,
          toastTxt: "点单成功",
        });
        console.log("wx.getStorageSync('myFood')="+JSON.stringify(wx.getStorageSync('myFood')))
         wx.navigateTo({
         
            url: '../success/success?myFood='+JSON.stringify(wx.getStorageSync('myFood')),
            success: function(res){
              // success
              console.log("success")
            },
            fail: function() {
              // fail
            },
            complete: function() {
              // complete
            }
          })
    }
  },

  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      tableIndex: e.detail.value
    })
  },
})