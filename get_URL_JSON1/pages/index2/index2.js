Page({
  data: {
    //分页数据
    pageNumber:1,
    pagetotal:5,
    page:1
  },
  onLoad: function (options) {
   
  },
  //input输入双向绑定数据
  inputValue:function(e){
    let name = e.currentTarget.dataset.name;
    let mapName ={};
    mapName[name]=e.detail && e.detail.value;
    // console.log(mapName);
    this.setData(mapName);
  },
  //上一页
  prevFn:function(){
    if(this.data.pageNumber <=1){
      wx.showToast({
        icon:'none',
        title: '已经是最前一页',
      })
      return;
    }
    
    wx.showLoading({
      title: '加载中...',
    })
    this.setData({
      pageNumber:Number(this.data.pageNumber)-1
    })
    console.log(this.data.pageNumber);
    setTimeout(function(){
      wx.hideLoading()
    },1000)
  },
  //下一页
  nextFn:function(){
    if(this.data.pageNumber === this.data.pagetotal){
      wx.showToast({
        icon:'none',
        title: '已经是最后一页',
      })
      return;
    }
    wx.showLoading({
      title: '加载中...',
    })
    this.setData({
      pageNumber:Number(this.data.pageNumber)+1
    })
    console.log(this.data.pageNumber);
    setTimeout(function(){
      wx.hideLoading()
    },1000)
  },
  //去到某一页
  pageGo:function(){
    console.log(Number(this.data.pageNumber));
    if(Number(this.data.pageNumber) > this.data.pagetotal){
      this.setData({
        pageNumber:this.data.pagetotal
      })
    }else if(Number(this.data.pageNumber) <= 0){
      this.setData({
        pageNumber:1
      })
    }
    console.log(Number(this.data.pageNumber));
    wx.showLoading({
      title: '加载中...',
    })
    setTimeout(function(){
      wx.hideLoading()
    },1000)
  }
})
