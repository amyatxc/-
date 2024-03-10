// pages/patients/patients.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: wx.getStorageSync('userId'),
    token: wx.getStorageSync('token'),
    patientsList: [],
    is_modify: ''
  },
  getAdd(){
    wx.navigateTo({
      url: '/pages/addPatients/addPatients',
    })
  },
  CPatients(e){
    const patientId = e.currentTarget.dataset.patientid;
    // console.log(patientId);
    if(this.data.is_modify !== '1'){
      const pages = getCurrentPages();
      const prevPage = pages[pages.length - 2]; // 上一个页面
      prevPage.setData({
        patientId: patientId, // 将patientId传回上一页面
      });
      wx.navigateBack({
        delta: 1, // 返回上一级页面
      });
      return
    }
    wx.navigateTo({
      url: `/pages/CPatients/CPatients?id=${patientId}`,
    })
  },
  
  getPatientsList(){
    wx.request({
      url: `http://127.0.0.1:3007/register/patients/${this.data.id}`,
      method: 'GET',
      header: {
        'Content-Type': 'application/json',
        'Authorization': this.data.token // 添加其他自定义的请求头
      },
      success: (res) => {
        // console.log(res.data)
        this.setData({
          patientsList: res.data.data
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getPatientsList()
    this.setData({
      is_modify: options.is_modify
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
    this.getPatientsList()
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