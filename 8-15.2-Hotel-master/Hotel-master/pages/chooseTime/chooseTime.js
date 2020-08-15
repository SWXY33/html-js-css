Page({

  /**
   * 页面的初始数据
   */
  data: {
      out: 0, 
      type: '-', //日期分隔符
      date: [], //日期数组对象
      dayWidth: 0, //日期的宽度
      nowDay: 0, //当前时间的日
      start: [], //入住时间
      count: 6, //显示月的数量
      startDay: '', //入住日期
      startWeek: '', //入住时间的周几
      end: [], //离开时间
      endDay: '', //离开日期
      endWeek: '', //离开时间的周几
      day: 0, //多少晚
      priceStauts: [], //价格状态
      lastNot: [0, 10] //前置的无房操作
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({ 
      success: function success(res) {
        that.setData({
          dayWidth :res.windowWidth
        })
      } 
    });
    that.setDate()
    that.nowDay = new Date().getDate(); 
    /*默认入住离店日期，今日入住明日离店，此处应在setDefaultDate函数内传入vuex里保存的日期进行默认操作
    *不推荐使用本地缓存，下边只是使用缓存的示例*/
    wx.getStorage({ 
      key: 'Time', 
      success: function success(res) {
        console.log("ghjkl",res);
        if (res && res.data) {
          var obj = JSON.parse(res.data);
          that.setData({
            start : that.setDefaultDate(obj.start),
            end : that.setDefaultDate(obj.end)
          })
        }
      }, 
      fail: function fail() {
      that.setData({
        start : that.setDefaultDate(that.getDefaultDate(0)),
        end : that.setDefaultDate(that.getDefaultDate(1))
      })
      that.start(that.data.start)
      that.end(that.data.end)
      } 
    }); 
    
    //如果需要日期的价格
    // if (options && options.request) {
    //   wx.request({ 
    //     url: '', //当需要日历价格的时候请求的后台接口地址
    //     method: 'GET', 
    //     data: {
    //        count: this.count //获取几个月分的数据
    //     }, 
    //   success: function success(res) {
    //     if (res.data.status != 1) {
    //       return wx.showToast({ title: res.data.message, icon: 'none', mask: true });
    //     }
    //     _this.data.priceStauts = res.data.data;
    //   },
    //    fail: function fail() {
    //      wx.showToast({ 
    //        title: '网络错误请稍后再试', 
    //        icon: 'none', 
    //        mask: true 
    //       });
    //     } 
    //   });
    // }
  },
  //离店日期
  end(newVal) {
    if (this.data.end.length != 0) {
      //计算天数
      var startDay = this.data.date[this.data.start[0]].year + '/' + this.data.date[this.data.start[0]].month + '/' + this.isFestival(this.data.start[0], this.data.start[1]);
      var endDay = this.data.date[newVal[0]].year + '/' + this.data.date[newVal[0]].month + '/' + this.isFestival(this.data.end[0], this.data.end[1]);
      //计算选择离店日期
      this.setData({
        endDay : this.setMonth(newVal[0]) + this.isFestival(newVal[0], newVal[1]) + '日',
        endWeek : this.getWeek(this.data.date[newVal[0]].year + '/' + this.data.date[newVal[0]].month + '/' + this.isFestival(newVal[0], newVal[1])),
        day : this.getDay(startDay, endDay)    
      })
    } else {
      this.setData({
        day : 0    
      })
    }
  },
  //入住日期
  start(newVal) {
    if (this.data.start.length > 0) {
      this.data.startDay = this.setMonth(newVal[0]) + this.isFestival(newVal[0], newVal[1]) + '日';
      this.data.startWeek = this.getWeek(this.data.date[newVal[0]].year + '/' + this.data.date[newVal[0]].month + '/' + this.isFestival(newVal[0], newVal[1]));
      this.setData({
        startDay : this.setMonth(newVal[0]) + this.isFestival(newVal[0], newVal[1]) + '日',
        startWeek : this.getWeek(this.data.date[newVal[0]].year + '/' + this.data.date[newVal[0]].month + '/' + this.isFestival(newVal[0], newVal[1]))
      })
    }

    if (this.data.priceStauts.length > 0) {
      for (var i = newVal[0]; i < this.data.priceStauts.length; i++) {
        if (i == newVal[0]) {
          for (var j = newVal[1]; j < this.data.priceStauts[i].length; j++) {
            if (this.data.priceStauts[i][j] == -1) {
              console.log(j);
              this.data.lastNot = [i, j];
              return this.setData({lastNot : [i, j]});
            }
          }
        } else {
          for (var j = 0; j < this.data.priceStauts[i].length; j++) {
            if (this.data.priceStauts[i][j] == -1) {
              this.data.lastNot = [i, j];
              return this.setData({lastNot : [i, j]});
            }
          }
        }
      }
    }
  },
  //月份补零
  setMonth(dateIndex) {
    let month = this.data.date[dateIndex].month;
    if (month < 10) {
      month = '0' + month;
    }
    return month + '月';
  },
  //如果是节假日名称则返回选择的日期天数
  isFestival(line, index, push = false) {
    var date = this.data.date[line].day[index];
    if (isNaN(date)) {
      var newIndex = this.data.date[line].day.indexOf(date) + 1;
      if (push) return newIndex;
      return newIndex < 10 ? '0' + newIndex : newIndex;
    } else {
      if (push) return date;
      return date < 10 ? '0' + date : date;
    }
  },
  //获取今天明天的日期
  getDefaultDate(AddDayCount) {
    var dd = new Date();
    dd.setDate(dd.getDate() + AddDayCount); //获取AddDayCount天后的日期
    var year = dd.getFullYear();
    var mon = dd.getMonth() + 1; //获取当前月份的日期
    var day = dd.getDate();
    return year + '-' + mon + '-' + day;
  },
  //设置入住时间 如果没有传值则根据默认值设置
  setDefaultDate(data) {
    var that = this
    var arr = [0, parseInt(that.nowDay - 1)];
    var start = data.indexOf('-') != -1 ? data.split('-') : data.split('/');
    var year = new Date().getFullYear();
    var month = new Date().getMonth() + 1;

    console.log("22222",that.data.date)
    for (var i = 0; i < that.data.date.length; i++) {
      if (that.data.date[i].year == start[0] && that.data.date[i].month == start[1]) {
        if (year == start[0] && month == start[1] && start[2] < that.nowDay) {
          arr = [i, parseInt(that.nowDay - 1)];
        } else {
          arr = [i, parseInt(start[2] - 1)];
        }
        break;
      }
    }
    return arr;
  },
  //计算天数
  getDay(date1, date2) {
    //获得天数
    //date1：开始日期，date2结束日期
    var a1 = Date.parse(new Date(date1));
    var a2 = Date.parse(new Date(date2));
    var day = parseInt((a2 - a1) / (1000 * 60 * 60 * 24)); //核心：时间戳相减，然后除以天数
    return day;
  },
  //计算周几
  getWeek(date) {
    var weekDay = ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    var myDate = new Date(Date.parse(date));
    return weekDay[myDate.getDay()];
  },

  //选择入住离开
  selectDay(e) {
    var that = this
    var line = e.currentTarget.dataset.line
    var index = e.currentTarget.dataset.index
    if (line == 0 && index + 1 < this.nowDay) return;
    //如果有入住情况和价格则需要进行一些列的判断
    if (that.data.priceStauts.length > 0) {
      if ((that.data.start.length == 0 && that.data.priceStauts[line][index] < 0) || (that.data.end.length > 0 && that.data.priceStauts[line][index] < 0)) {
        return wx.showToast({
          title: '该日期已被预订',
          icon: 'none'
        });
      }

      if ((that.data.start.length > 0 && line < that.data.start[0]) || (line == that.data.start[0] && that.data.start[1] > index)) {
        if (that.data.priceStauts[line][index] < 0)
          return wx.showToast({
            title: '该日期已被预订',
            icon: 'none'
          });
        that.setData({
          start : [line, index],
          end : []
        })
        return;
      }

      if (that.data.start.length > 0 && that.data.end.length == 0) {
        if (that.data.start[0] - line == 0) {
          for (var j = that.data.start[1]; j < index; j++) {
            if (that.data.priceStauts[line][j] < 0)
              return wx.showToast({
                title: '很抱歉，所选入离店时间包含无房日期',
                icon: 'none',
                mask: true
              });
          }
        } else {
          //如果不在同一个月份有三种情况需要处理
          for (var i = that.data.start[0]; i <= line; i++) {
            //开始日期到开始日期当月的最大日期是否包含无房情况
            if (i == that.data.start[0]) {
              for (var j = that.data.start[1]; j < that.data.priceStauts[i].length; j++) {
                if (that.data.priceStauts[i][j] < 0)
                  return wx.showToast({
                    title: '很抱歉，所选入离店时间包含无房日期',
                    icon: 'none',
                    mask: true
                  });
              }
            } else if (i == line) {
              //结束日期到当月结束日期之前是否包含无房情况
              for (var j = 0; j < index; j++) {
                if (that.data.priceStauts[i][j] < 0)
                  return wx.showToast({
                    title: '很抱歉，所选入离店时间包含无房日期',
                    icon: 'none',
                    mask: true
                  });
              }
            } else {
              //中间间隔的月份需要检查每一天是否包含无房情况
              for (var j = 0; j < that.data.priceStauts[i].length; j++) {
                if (that.data.priceStauts[i][j] < 0)
                  return wx.showToast({
                    title: '很抱歉，所选入离店时间包含无房日期',
                    icon: 'none',
                    mask: true
                  });
              }
            }
          }
        }
      }
    }

    //如果没有入住时间
    if (that.data.start.length == 0) {
      //填充入住时间
      that.setData({
        start : [line, index]
      })
    } else if (that.data.start.length > 0 && that.data.start[0] == line &&that.data.start[1] == index && that.data.end.length == 0) {
      return;
    } else {
      //如果没有离开时间
      if (that.data.end.length == 0) {
        //如果有价格和入住离开情况则需要进行判断所选的离店时间时候包含无房日期
        if (line < that.data.start[0] || (line == that.data.start[0] && index < that.data.start[1])) {
          that.setData({
            end : that.data.start,
            start: [line, index]
          })
        } else {
          //如果离开时间比入住时间晚则填充
          that.setData({
            end : [line , index]
          })
        }
      } else {
        //如果有离开时间则清空离开时间重新填充入住时间
        that.setData({
          start : [line, index],
          end : []
        })
        
      }
    }
    that.start(that.data.start)
    that.end(that.data.end)
  },

  //设置日历
  setDate() {
    var year = new Date().getFullYear();   //年份 
    var month = new Date().getMonth();     //月份
    var all = [];
    for (let i = 0; i < this.data.count; i++) {
      var day = [];   //天数   
      var week = 0;  //星期
      var date={};    //
      for (var j = 0; j < new Date(year, month + 1, 0).getDate(); j++) {
        day.push(j + 1);
      }
      date = {
        year: year,
        month: month + 1,
        day: day,
        oneDayWeek: new Date(Date.parse(year + '/' + (month + 1) + '/' + '01')).getDay()
      };
      if (month == 11) {
        year += 1;
        month = 0;
      } else {
        month++;
      }
      all[i] = date
    }
    return this.setData({date:all});


  },
  //确定入住离店事件提交
  submit() {
    var obj = {
      start: this.date[this.start[0]].year + this.type + this.date[this.start[0]].month + this.type + this.isFestival(this.start[0], this.start[1], true),
      end: this.date[this.end[0]].year + this.type + this.date[this.end[0]].month + this.type + this.isFestival(this.end[0], this.end[1], true),
      startDay: this.date[this.start[0]].month + '月' + this.isFestival(this.start[0], this.start[1], true) + '日',

      endDay: this.date[this.end[0]].month + '月' + this.isFestival(this.end[0], this.end[1], true) + '日',
      day: this.day
    }; 
  },

})