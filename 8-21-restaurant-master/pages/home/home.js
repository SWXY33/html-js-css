// 获取到小程序实例
var app = getApp();
Page({
	data: {
		shop:{
			name:'大坡农家饭店',
			desc:'凡在本店办理会员，一律享受8.8折优惠'
		},
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
		cart: {
			count: 0,//购物车商品数量
			total: 0,//购物车商品总价
			list: {}//购物车商品详情
		},
		cartList:{},
		showCartDetail: false
	},
	// 生命周期函数--监听页面加载
	// 一个页面只会调用一次。
	onLoad: function (options) {
		var that = this
		//调用应用实例的方法获取全局数据
		app.getUserInfo(function(userInfo){
		//更新数据
		that.setData({
			userInfo: userInfo
		});
		//that.update();
		console.log(userInfo)
		});
	},
	// 生命周期函数--监听页面初次渲染完成
	onReady: function(){},
	// 生命周期函数--监听页面显示
	// 每次打开页面都会调用一次
	onShow: function () {
		this.setData({
			classifySeleted: this.data.goodsList[0].id
		});
	},
	// 生命周期函数--监听页面隐藏
	// 当navigateTo或底部tab切换时调用
	onHide: function(){},
	// 生命周期函数--监听页面卸载
	// 当redirectTo或navigateBack的时候调用。
	onUnload:function(){},
	// 页面相关事件处理函数--监听用户下拉动作
	onPullDownRefresh:function(){},
	// 页面上拉触底事件的处理函数
	onReachBottom:function(){},

	// 开发者可以添加任意的函数或数据到
	//  object 参数中，在页面的函数中用 this 可以访问
	checkOrderSame: function(name){
		var list = this.data.goods;
		for(var index in list){
			if(list[index].name === name){
				return index;
			}
		}
		return false;
	},
	tapAddCart: function (e) {
		this.addCart(e.target.dataset.id);
	
	},
	tapReduceCart: function (e) {
		this.reduceCart(e.target.dataset.id);
	},
	addCart: function (id) {
		var num = this.data.cart.list[id] || 0;
		this.data.cart.list[id] = num + 1;
		this.countCart();
		var price = this.data.goods[id].price;
		var name  = this.data.goods[id].name;
		var img   = this.data.goods[id].pic;
		var list  = this.data.cartList;
		console.log("price="+price+";name="+name+";img="+img+";list="+JSON.stringify(list))
		var sortedList = [];
		var index;
		if(index = this.checkOrderSame(name)){
			sortedList = list[index];
			var num = this.data.cart.list[id] || 0;
			num = num + 1;
		}
		else{
			var order = {
				"price" : price,
				"num" : 1,
				"name": name,
				'img':  img,
				"shopId": this.data.shopId,
				"shopName": this.data.shop.restaurant_name,
				"pay": 0,
			}
			list.push(order);
	
			sortedList = order;
		}
		this.setData({
			cartList: list,
		});
		console.log("list===="+JSON.stringify(list))
	},
	reduceCart: function (id) {
		var num = this.data.cart.list[id] || 0;
		if (num <= 1) {
			delete this.data.cart.list[id];
		} else {
			this.data.cart.list[id] = num - 1;
		}
		this.countCart();
	},
	countCart: function (index,lists) {
		var count = 0,
			total = 0;
		var goods;
		for (var id in this.data.cart.list) {
		    goods = this.data.goods[id];
			count += this.data.cart.list[id];
			total += goods.price * this.data.cart.list[id];
		}
		this.data.cart.count = count;
		this.data.cart.total = total;
		this.setData({
			cart: this.data.cart
		});
		// 存储订单页所需要的数据
		wx.setStorage({
			key: 'orderList',
			data: {
				count: this.data.cart.count,
				total: this.data.cart.total,
				list: this.data.cart.list,
			}
		})
		
	},
	follow: function () {
		this.setData({
			followed: !this.data.followed
		});
	},
	onGoodsScroll: function (e) {
		if (e.detail.scrollTop > 10 && !this.data.scrollDown) {
			this.setData({
				scrollDown: true
			});
		} else if (e.detail.scrollTop < 10 && this.data.scrollDown) {
			this.setData({
				scrollDown: false
			});
		}

		var scale = e.detail.scrollWidth / 570,
			scrollTop = e.detail.scrollTop / scale,
			h = 0,
			classifySeleted,
			len = this.data.goodsList.length;
		this.data.goodsList.forEach(function (classify, i) {
			var _h = 70 + classify.goods.length * (46 * 3 + 20 * 2);
			if (scrollTop >= h - 100 / scale) {
				classifySeleted = classify.id;
			}
			h += _h;
		});
		this.setData({
			classifySeleted: classifySeleted
		});
	},
	tapClassify: function (e) {
		var id = e.target.dataset.id;
		this.setData({
			classifyViewed: id
		});
		var self = this;
		setTimeout(function () {
			self.setData({
				classifySeleted: id
			});
		}, 100);
	},
	showCartDetail: function () {
		this.setData({
			showCartDetail: !this.data.showCartDetail
		});
	},
	hideCartDetail: function () {
		this.setData({
			showCartDetail: false
		});
	},
	submit: function (e) {
		var goods = JSON.stringify(this.data.goods);
		console.log("goods===="+goods)
		console.log("data=========="+JSON.stringify(this.data))
		var num = this.data.cart.count;
		var args = JSON.stringify(this.data.cart);
		var total=this.data.cart.total;
		console.log("agrs="+args+"**********total="+total)
		console.log("点菜数量："+num+";一共花费："+total)
		
		
		wx.navigateTo({
		url: '../mine/mine?args='+args+"&goods="+goods+"&total="+total
		})
		}
});