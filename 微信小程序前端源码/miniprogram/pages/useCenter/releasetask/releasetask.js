var date = new Date();
var currentHours = date.getHours();
var currentMinute = date.getMinutes();

Page({
  data: {
    // tempFilePaths: [],
    pictureurl:'',
    my_DATA_TYPE: [
      {
        'id': '1',
        'name': '图片',
        'twoLtype': [
          {
            'id': '1',
            'name': '人脸识别'
          },
          {
            'id': '6',
            'name': '物体标记'
          },
          {
            'id': '7',
            'name': '骨骼标记'
          },
          {
            'id': '8',
            'name': '手势轮廓'
          },
          {
            'id': '9',
            'name': '指纹识别'
          },
          {
            'id': '10',
            'name': '其他'
          }
        ]
      },
      {
        'id': '2',
        'name': '音频',
        'twoLtype': [
          {
            'id': '2',
            'name': '上海方言'
          },
          {
            'id': '11',
            'name': '湖南方言'
          },
          {
            'id': '12',
            'name': '广东方言'
          },
          {
            'id': '13',
            'name': '浙江方言'
          },
          {
            'id': '14',
            'name': '东北方言'
          },
          {
            'id': '15',
            'name': '四川方言'
          },
          {
            'id': '16',
            'name': '其他'
          }
        ]
      },
      {
        'id': '3',
        'name': '视频',
        'twoLtype': [
          {
            'id': '17',
            'name': '车辆识别'
          },
          {
            'id': '18',
            'name': '步态识别'
          },
          {
            'id': '19',
            'name': '其他'
          }
        ]
      },
      {
        'id': '4',
        'name': '其他',
        'twoLtype': [
          {
            'id': '20',
            'name': '基因表达数据识别'
          },
          {
            'id': '21',
            'name': '地震探测数据识别'
          },
          {
            'id': '22',
            'name': '其他'
          },
        ]
      }
    ],
    multiArray1: [['图片', '音频', '视频', '其他'], ['人脸识别', '物体标记', '骨骼标记', '手势轮廓', '指纹识别', '其他']],
    multiIndex1: [0, 0],
    startDate: "请选择日期",
    multiArray: [['今天', '明天', '3-2', '3-3', '3-4', '3-5'], [0, 1, 2, 3, 4, 5, 6], [0, 10, 20]],
    multiIndex: [0, 0, 0],
  },

  onLoad :function (options){
    wx.request({
      url: 'https://tbw315.xyz/wechat/getTaskType/',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'cookie': wx.getStorageSync('cookie'),
        'X-CSRFToken': wx.getStorageSync('CSRFtoken')
      },
      success: function (res) {
        var data = res.data
        console.log(res);
        that.setData({  
          type: data
        })
      }
    })
  },
//获取一级类型对应的二级类型
  findData2lType: function(typeId, typeList){
    var size =typeList.size;
    var twoLtypeList;
    for(var i=0; i<size; i++){
      if(typeList[i]['belongto_data_type']==typeId)
      {
        twoLtypeList.push(typeList[i]);
      }
    }
    return twoLtypeList;
  },

  bindMultiPickerChange1(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var typeIndex = e.detail.value[0];
    var twoTypeIndex = e.detail.value[1];
    this.setData({
      multiIndex1: e.detail.value,
      
    })
  },

  bindMultiPickerColumnChange2(e){
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value)
    const data = {
      multiArray1: this.data.multiArray1,
      multiIndex1: this.data.multiIndex1
    }
    data.multiIndex1[e.detail.column] = e.detail.value
    if (!e.detail.column) {
      var twotype = this.data.my_DATA_TYPE[data.multiIndex1[0]]['twoLtype'];
      console.log(twotype)
      data.multiArray1[1] = []
      for (var i = 0; i < twotype.length; i++) {
        data.multiArray1[1].push(twotype[i]['name'])
        console.log(twotype[i]['name'])
      }
      data.multiIndex1[1] = 0
      data.multiIndex1[2] = 0
    }
    console.log(data.multiIndex1)
    this.setData(data)
  },

  formSubmit(e) {
    
    var typeIndex = this.data.multiIndex1[0]
    var twoTypeIndex = this.data.multiIndex1[1]
    e.detail.value.datatype = [
      this.data.my_DATA_TYPE[typeIndex]['id'],
      this.data.my_DATA_TYPE[typeIndex]['twoLtype'][twoTypeIndex]['id']
      ]
      
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    wx.request({
      url: 'https://tbw315.xyz/wechat/taskReleasing/',
      method: 'POST',
      header:{
        'content-type': 'application/x-www-form-urlencoded',
        'cookie': wx.getStorageSync('cookie'),
        'X-CSRFToken': wx.getStorageSync('CSRFtoken')
      },
      data: {
        'task_tag': e.detail.value.task_tag,
        'task_data_num': e.detail.value.task_data_num,
        'task_credits': e.detail.value.task_credits,
        'task_onelevel_type': e.detail.value.datatype[0],
        'task_twolevel_type': e.detail.value.datatype[1],
        'task_deadline': "2019-03-25 16:45:36",
        'task_description': e.detail.value.task_description
      },
      success: function (res) {
        if (res.data['msg'] == 'ok')
          wx.showToast({
            title: '提交成功',
            icon: 'success',
            duration: 1000
          })
        else
          wx.showToast({
            title: '提交失败',
            icon: 'none',
            duration: 2000
          })
      }
    })
  },
  formReset() {
    console.log('form发生了reset事件')
  },
  onLoad:function(options){

  },

  // addpicture:function() {
  //   wx.chooseImage({
  //     success: function (res) {
  //       var data = {
  //         program_id: app.jtappid
  //       }
  //       var tempFilePaths = res.tempFilePaths  //图片
  //       wx.uploadFile({
  //         url: 'aaa.cn', //仅为示例，非真实的接口地址
  //         filePath: tempFilePaths[0],
  //         name: 'add_image', //文件对应的参数名字(key)
  //         formData: data,  //其它的表单信息
  //         success: function (res) {
  //         }
  //       })
  //     }
  //   })
  // },

   addpicture:function(){
    wx.chooseImage({
        count: 1,
        sizeType:['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: res =>{
          var tempFilePaths=res.tempFilePaths;
          this.setData({ pictureurl: tempFilePaths });
          // wx.setStorageSync('pictureurl', tempFilePaths)
          console.log(pictureurl)
          // this.loadpicture;
        }
    });
  },
  loadpicture:function(){
    var pictureurl= wx.getStorageSync('pictureurl');
    this.setData({pictureurl: pictureurl});
    console.log(pictureurl)
  },


  uploadFile:function(){
    const tempFilePaths = res.tempFilePaths
    wx.uploadFile({
      url: 'https://tbw315.xyz', // 仅为示例，非真实的接口地址
      filePath: tempFilePaths[0],
      name: 'file',
      header:{},
      formData: {
        user: 'test'
      },
      success(res) {
        const data = res.data
        // do something
      }
    })
  },

  bindPickderChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  bindPickderChange2: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index2: e.detail.value
    })
  },

  pickerTap: function () {
    date = new Date();

    var monthDay = ['今天', '明天'];
    var hours = [];
    var minute = [];

    currentHours = date.getHours();
    currentMinute = date.getMinutes();

    // 月-日
    for (var i = 2; i <= 28; i++) {
      var date1 = new Date(date);
      date1.setDate(date.getDate() + i);
      var md = (date1.getMonth() + 1) + "-" + date1.getDate();
      monthDay.push(md);
    }

    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };

    if (data.multiIndex[0] === 0) {
      if (data.multiIndex[1] === 0) {
        this.loadData(hours, minute);
      } else {
        this.loadMinute(hours, minute);
      }
    } else {
      this.loadHoursMinute(hours, minute);
    }

    data.multiArray[0] = monthDay;
    data.multiArray[1] = hours;
    data.multiArray[2] = minute;

    this.setData(data);
  },

  bindMultiPickerColumnChange: function (e) {

    date = new Date();

    var that = this;

    var monthDay = ['今天', '明天'];
    var hours = [];
    var minute = [];

    currentHours = date.getHours();
    currentMinute = date.getMinutes();

    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    // 把选择的对应值赋值给 multiIndex
    data.multiIndex[e.detail.column] = e.detail.value;

    // 然后再判断当前改变的是哪一列,如果是第1列改变
    if (e.detail.column === 0) {
      // 如果第一列滚动到第一行
      if (e.detail.value === 0) {

        that.loadData(hours, minute);

      } else {
        that.loadHoursMinute(hours, minute);
      }

      data.multiIndex[1] = 0;
      data.multiIndex[2] = 0;

      // 如果是第2列改变
    } else if (e.detail.column === 1) {

      // 如果第一列为今天
      if (data.multiIndex[0] === 0) {
        if (e.detail.value === 0) {
          that.loadData(hours, minute);
        } else {
          that.loadMinute(hours, minute);
        }
        // 第一列不为今天
      } else {
        that.loadHoursMinute(hours, minute);
      }
      data.multiIndex[2] = 0;

      // 如果是第3列改变
    } else {
      // 如果第一列为'今天'
      if (data.multiIndex[0] === 0) {

        // 如果第一列为 '今天'并且第二列为当前时间
        if (data.multiIndex[1] === 0) {
          that.loadData(hours, minute);
        } else {
          that.loadMinute(hours, minute);
        }
      } else {
        that.loadHoursMinute(hours, minute);
      }
    }
    data.multiArray[1] = hours;
    data.multiArray[2] = minute;
    this.setData(data);
  },

  loadData: function (hours, minute) {
    var minuteIndex;
    if (currentMinute > 0 && currentMinute <= 10) {
      minuteIndex = 10;
    } else if (currentMinute > 10 && currentMinute <= 20) {
      minuteIndex = 20;
    } else if (currentMinute > 20 && currentMinute <= 30) {
      minuteIndex = 30;
    } else if (currentMinute > 30 && currentMinute <= 40) {
      minuteIndex = 40;
    } else if (currentMinute > 40 && currentMinute <= 50) {
      minuteIndex = 50;
    } else {
      minuteIndex = 60;
    }

    if (minuteIndex == 60) {
      // 时
      for (var i = currentHours + 1; i < 24; i++) {
        hours.push(i);
      }
      // 分
      for (var i = 0; i < 60; i += 10) {
        minute.push(i);
      }
    } else {
      // 时
      for (var i = currentHours; i < 24; i++) {
        hours.push(i);
      }
      // 分
      for (var i = minuteIndex; i < 60; i += 10) {
        minute.push(i);
      }
    }
  },

  loadHoursMinute: function (hours, minute) {
    // 时
    for (var i = 0; i < 24; i++) {
      hours.push(i);
    }
    // 分
    for (var i = 0; i < 60; i += 10) {
      minute.push(i);
    }
  },

  loadMinute: function (hours, minute) {
    var minuteIndex;
    if (currentMinute > 0 && currentMinute <= 10) {
      minuteIndex = 10;
    } else if (currentMinute > 10 && currentMinute <= 20) {
      minuteIndex = 20;
    } else if (currentMinute > 20 && currentMinute <= 30) {
      minuteIndex = 30;
    } else if (currentMinute > 30 && currentMinute <= 40) {
      minuteIndex = 40;
    } else if (currentMinute > 40 && currentMinute <= 50) {
      minuteIndex = 50;
    } else {
      minuteIndex = 60;
    }

    if (minuteIndex == 60) {
      // 时
      for (var i = currentHours + 1; i < 24; i++) {
        hours.push(i);
      }
    } else {
      // 时
      for (var i = currentHours; i < 24; i++) {
        hours.push(i);
      }
    }
    // 分
    for (var i = 0; i < 60; i += 10) {
      minute.push(i);
    }
  },

  bindStartMultiPickerChange: function (e) {
    var that = this;
    var monthDay = that.data.multiArray[0][e.detail.value[0]];
    var hours = that.data.multiArray[1][e.detail.value[1]];
    var minute = that.data.multiArray[2][e.detail.value[2]];

    if (monthDay === "今天") {
      var month = date.getMonth() + 1;
      var day = date.getDate();
      monthDay = month + "月" + day + "日";
    } else if (monthDay === "明天") {
      var date1 = new Date(date);
      date1.setDate(date.getDate() + 1);
      monthDay = (date1.getMonth() + 1) + "月" + date1.getDate() + "日";

    } else {
      var month = monthDay.split("-")[0]; // 返回月
      var day = monthDay.split("-")[1]; // 返回日
      monthDay = month + "月" + day + "日";
    }

    var startDate = monthDay + " " + hours + ":" + minute;
    that.setData({
      startDate: startDate
    })
  },
})