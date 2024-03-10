// pages/yuYue/yuYue.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    doctorInfo: [],
    ill_name_list: [],
    shift_list: [],
    doctor_id: ''
  },
  guaHao(e){
    const shift_id = e.currentTarget.dataset.shift_id
    wx.navigateTo({
      url: `/pages/guoHao/guoHao?shift_id=${shift_id}&doctor_id=${this.data.doctor_id}`,
    })
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
        let data = res.data.data[0].ill_name_list;
        let illnessArray = JSON.parse(data);
        let illnessObject = {};
        for (let i = 0; i < illnessArray.length; i++) {
          illnessObject[i+1] = illnessArray[i];
        }
        this.setData({
          doctorInfo: res.data.data,
          ill_name_list: illnessObject
        })
        this.getShift(id)
      }
    })
  },
  getShift(id){
    wx.request({
      url: `http://127.0.0.1:3007/register/shiftCase/${id}`,
      method: 'GET',
      header: {
        'Content-Type': 'application/json',
        'Authorization': wx.getStorageSync('token') // 添加其他自定义的请求头
      },
      success: (res) => {
        this.setData({
          shift_list: res.data.data
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getDoctorInfo(options.id)
    this.setData({
      doctor_id: options.id
    })
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