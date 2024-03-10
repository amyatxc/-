// pages/guoHao/guoHao.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    doctorInfo: [],
    shiftInfo: [],
    patientList: [],
    patientId: '',
    patient_name: '',
    is_delete: false,
    recordInfo: [],
    shiftId: ''
  },
  gotoPatients(){
    wx.navigateTo({
      url: '/pages/patients/patients',
    })
  },
  getPatientName(){
    const arr = this.data.patientList
    const result = arr.find((item) => item.patient_id === this.data.patientId);
    this.setData({
      patient_name: result.patient_name
    })
    // console.log(this.data.patient_name)
  },
  sumbit(){
    // console.log(this.data.patient_name)
    wx.request({
      url: 'http://127.0.0.1:3007/register/inShiftInfo',
      method: 'post',
      header: {
        'Content-Type': 'application/json',
        'Authorization': wx.getStorageSync('token') // 添加其他自定义的请求头
      },
      data: {
        doctor_name: this.data.doctorInfo[0].doctor_name,
        icon: this.data.doctorInfo[0].icon,
        dep_name: this.data.doctorInfo[0].dep_name,
        to_date: this.data.shiftInfo[0].to_date,
        guahao_amt: this.data.shiftInfo[0].guahao_amt,
        time_type: this.data.shiftInfo[0].time_type,
        patient_name: this.data.patient_name,
        user_id: wx.getStorageSync('userId')
      },
      success: (res) => {
        // console.log(res.data)
        wx.showToast({
          title: '提交成功',
          icon: 'success',
          duration: 2000,
          success: () => {
            setTimeout(() => {
              // 在这里编写跳转页面的逻辑
              wx.switchTab({
                url: '/pages/home/home'
              });
            }, 2000); // 等待2秒后跳转，与 wx.showToast 的 duration 保持一致
          }
        })
      }
    })
  },
  delete(){
    wx.showModal({
      title: '提示',
      content: '确定要取消挂号吗？',
      showCancel: true,
      cancelText: '取消',
      confirmText: '确定',
      success: (res) => {
        if (res.confirm) {
          // 用户点击了确定，执行删除逻辑
          wx.request({
            url: `http://127.0.0.1:3007/register/deleteRecordInfo/${this.data.shiftId}`,
            method: 'post',
            header: {
              'Content-Type': 'application/json',
              'Authorization': wx.getStorageSync('token') // 添加其他自定义的请求头
            },
            success: (res) => {
              wx.showToast({
                title: '取消挂号成功',
                icon: 'success',
                duration: 2000,
                success: () => {
                  setTimeout(() => {
                    wx.navigateBack({
                      delta: 1
                    });
                  }, 2000); // 两秒后返回上一页
                }
              });
            }
          })
        }
      }
    });
  },
  
  getDoctorInfo(id){
    wx.request({
      url: `http://127.0.0.1:3007/register/doctorInfo/${id}`,
      method: 'GET',
      header: {
        'Content-Type': 'application/json',
        'Authorization': wx.getStorageSync('token') // 添加其他自定义的请求头
      },
      success: (res) => {
        // let data = res.data.data[0].ill_name_list;
        // let illnessArray = JSON.parse(data);
        // let illnessObject = {};
        // for (let i = 0; i < illnessArray.length; i++) {
        //   illnessObject[i+1] = illnessArray[i];
        // }
        this.setData({
          doctorInfo: res.data.data
        })
        // console.log(this.data.doctorInfo)
      }
    })
  },
  getShiftInfo(id){
    wx.request({
      url: `http://127.0.0.1:3007/register/shiftInfo/${id}`,
      method: 'GET',
      header: {
        'Content-Type': 'application/json',
        'Authorization': wx.getStorageSync('token') // 添加其他自定义的请求头
      },
      success: (res) => {
        this.setData({
          shiftInfo: res.data.data
        })
        // console.log(this.data.shiftInfo)
      }
    })
  },
  getPatientsList(){
    wx.request({
      url: `http://127.0.0.1:3007/register/patients/${wx.getStorageSync('userId')}`,
      method: 'GET',
      header: {
        'Content-Type': 'application/json',
        'Authorization': wx.getStorageSync('token') // 添加其他自定义的请求头
      },
      success: (res) => {
        this.setData({
          patientList: res.data.data,
          patientId: res.data.data[0].patient_id
        })
        this.getPatientName()
        // console.log(this.data.patientId)
      }
    })
  },
  getRecordInfo(id){
    wx.request({
      url: `http://127.0.0.1:3007/register/recordInfo/${id}`,
      method: 'GET',
      header: {
        'Content-Type': 'application/json',
        'Authorization': wx.getStorageSync('token') // 添加其他自定义的请求头
      },
      success: (res) => {
        this.setData({
          recordInfo: res.data.data
        })
        // console.log(this.data.recordInfo)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getDoctorInfo(options.doctor_id)
    this.getShiftInfo(options.shift_id)
    this.getPatientsList()
    if(options.shiftId){
      this.setData({
        is_delete: true,
        shiftId: options.shiftId
      })
      this.getRecordInfo(options.shiftId)
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    this.getPatientName()
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})