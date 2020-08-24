var app = getApp();
Page({
  data:{
    goods: {
			1: {
				id: 1,
				name: '水豆腐酿',
				pic: '../../res/img/doufu.jpg',
				sold: 1014,
				price: 25
			},
			2: {
				id: 2,
				name: '黄焖猪蹄',
				pic: '../../res/img/zhuti.jpg',
				sold: 1029,
				price: 30
			},
			3: {
				id: 3,
				name: '红烧排骨',
				pic: '../../res/img/paigu.jpg',
				sold: 1030,
				price: 35
			},
			4: {
				id: 4,
				name: '酿菜',
				pic: '../../res/img/niangcai.jpg',
				sold: 1059,
				price: 20
			},
			5: {
				id: 5,
				name: '爆炒牛杂',
				pic: '../../res/img/niuza.jpg',
				sold: 1029,
				price: 50
			},
			6: {
				id: 6,
				name: '素炒苦瓜',
				pic: '../../res/img/kugua.jpg',
				sold: 1064,
				price: 15
			},
			7: {
				id: 7,
				name: '炒河粉',
				pic: '../../res/img/chaofen.jpg',
				sold: 814,
				price: 7
			},
			8: {
				id: 8,
				name: '汤粉',
				pic: '../../res/img/tangfen.jpg',
				sold: 124,
				price: 6
			},
			9: {
				id: 9,
				name: '炒时蔬',
				pic: '../../res/img/qingcai.jpg',
				sold: 102,
				price: 15
			},
			10:{
				id:10,
				name:"米饭",
				pic:"../../res/img/mifan.jpg",
				sold:364,
				price:2

			},
			11:{
				id:11,
				name:"白酒",
				pic:"../../res/img/baijiu.jpg",
				sold:156,
				price:5

			},
			12:{
				id:12,
				name:"啤酒",
				pic:"../../res/img/pijiu.jpg",
				sold:248,
				price:6

			},
			13:{
				id:13,
				name:"青椒炒肉丝",
				pic:"../../res/img/qingjiao.jpg",
				sold:168,
				price:20

			},
			14:{
				id:14,
				name:"醋溜土豆丝",
				pic:"../../res/img/tudou.jpg",
				sold:215,
				price:20

			}
		},
		goodsList: [
			{
				id: 'hot',
				classifyName: '热销',
				goods: [1, 2, 3, 4]
			},
			{
				id: 'new',
				classifyName: '农家小炒',
				goods: [5, 6,13,14]
			},
			{
				id: 'vegetable',
				classifyName: '时蔬',
				goods: [6, 9]
			},
			{
				id: 'mushroom',
				classifyName: '主食',
				goods: [ 7, 8, 10]
			},
			{
				id: 'food',
				classifyName: '酒水',
				goods: [11,12]
			}
		],
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
    
    
    var goods = wx.getStorageSync('goods');
    var  orderList = wx.getStorageSync('orderList');
    var num = orderList.count;
    console.log("orderList=="+JSON.stringify(orderList)+";;count="+num)
    console.log("total=========="+orderList.total)
    
    
    this.setData({
      total: orderList.total
    });
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
  },
  
/**
 * 生命周期函数--监听页面显示
 * 当页面数据要求及时变化的时候，可以把接口数据放入onShow中。
 */
onShow: function(options) {
  
  var goods = wx.getStorageSync('goods');
  var  orderList = wx.getStorageSync('orderList');
  var num = orderList.count;
  console.log("orderList=="+JSON.stringify(orderList)+";;count="+num)
  console.log("total=========="+orderList.total)
  
  
  this.setData({
    total: orderList.total
  });
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



},
  //修改标题
  //生命周期函数--监听页面初次渲染完成
  onReady:function(){
    wx.setNavigationBarTitle({
      title: '我的订单'
    })
  },
  
  //返回修改
  returnClick:function(){
    wx.navigateBack();
  },
  

  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      tableIndex: e.detail.value
    })
  },
})