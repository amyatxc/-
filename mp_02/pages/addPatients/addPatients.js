// pages/addPatients/addPatients.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    phone: '',
    card: '',
    address: '',
    gender: '男'
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

  addPatient(){
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
      url: 'http://127.0.0.1:3007/register/patients',
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
        user_id: wx.getStorageSync('userId')
      },
      success: (res) => {
        // console.log(res.data)
        wx.showToast({
          title: '添加就诊人成功',
          icon: 'success',
          duration: 2000
        });
        this.setData({
          name: '',
          phone: '',
          card: '',
          address: '',
          gender: '男'
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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