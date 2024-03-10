// pages/CPatients/CPatients.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    phone: '',
    card: '',
    address: '',
    gender: '',
    patient_id: 1
  },
  inputName(e){
    this.setData({
      name: e.detail.value
    })
  },
  inputPhone(e){
    this.setData({
      phone: e.detail.value
    })
  },
  inputIdCard(e){
    this.setData({
      card: e.detail.value
    })
  },
  inputAddress(e){
    this.setData({
      address: e.detail.value
    })
  },
  radioChange(e){
    this.setData({
      gender: e.detail.value
    })
  },

  getPatientsList(id){
    wx.request({
      url: `http://127.0.0.1:3007/register/patientInfo/${id}`,
      method: 'GET',
      header: {
        'Content-Type': 'application/json',
        'Authorization': wx.getStorageSync('token') // 添加其他自定义的请求头
      },
      success: (res) => {
        this.setData({
          name: res.data.data[0].patient_name,
          phone: res.data.data[0].phone,
          card: res.data.data[0].card,
          address: res.data.data[0].address,
          gender: res.data.data[0].sex
        })
      }
    })
  },
  updatePatient(){
    const phoneRegex = /^1[3-9]\d{9}$/;
    const idRegex = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if(!this.data.name) {
      wx.showToast({
        title: '请输入姓名',
        icon: 'none'
      });
      return
    }
    if (!phoneRegex.test(this.data.phone)) {
      wx.showToast({
        title: '手机号格式不正确',
        icon: 'none'
      });
      return
    }
    if (!idRegex.test(this.data.card)) {
      wx.showToast({
        title: '身份证号格式不正确',
        icon: 'none'
      });
      return
    }
    if(!this.data.address) {
      wx.showToast({
        title: '请输入居住地址',
        icon: 'none'
      });
      return
    }
    wx.request({
      url: 'http://127.0.0.1:3007/register/updatepatientInfo',
      method: 'post',
      header: {
        'Content-Type': 'application/json',
        'Authorization': wx.getStorageSync('token') // 添加其他自定义的请求头
      },
      data: {
        patient_name: this.data.name,
        card: this.data.card,
        phone: this.data.phone,
        sex: this.data.gender,
        address: this.data.address,
        patient_id: this.data.patient_id
      },
      success: (res) => {
        wx.showToast({
          title: '更新成功',
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
  },
  deletePatient() {
    wx.showModal({
      title: '提示',
      content: '确定要删除吗？',
      showCancel: true,
      cancelText: '取消',
      confirmText: '确定',
      success: (res) => {
        if (res.confirm) {
          // 用户点击了确定，执行删除逻辑
          this.performDelete();
        }
      }
    });
  },
  performDelete() {
    wx.request({
      url: 'http://127.0.0.1:3007/register/deletepatientInfo',
      method: 'post',
      header: {
        'Content-Type': 'application/json',
        'Authorization': wx.getStorageSync('token') // 添加其他自定义的请求头
      },
      data: {
        patient_id: this.data.patient_id
      },
      success: (res) => {
        wx.showToast({
          title: '删除成功',
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
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const id = parseInt(options.id)
    this.setData({
      patient_id: id
    })
    this.getPatientsList(id)
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