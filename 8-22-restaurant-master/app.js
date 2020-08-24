//app.js
App({

  // 生命周期函数--监听小程序初始化
  onLaunch: function () {
		//调用API从本地缓存中获取数据
		
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  // 生命周期函数--监听小程序显示
  onShow:function(){
  	wx.getUserInfo({
	  success: function(res) {
	  	console.log(res);
	    var userInfo = res.userInfo
	  }
	})
  },

  // 生命周期函数--监听小程序隐藏
  onHide:function(){},

	// 开发者可以添加任意的函数或数
	
  // 据到Object参数中，用this可以访问
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData:{
    userInfo: null,
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
  }
})