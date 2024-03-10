// pages/record/record.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shift_record: []
  },
  getShiftId(e){
    // console.log(e.currentTarget.dataset.shiftid)
    wx.navigateTo({
      url: `/pages/guoHao/guoHao?shiftId=${e.currentTarget.dataset.shiftid}`,
    })
  },
  
  getShiftRecord(){
    wx.request({
      url: `http://127.0.0.1:3007/register/shiftRecord/${wx.getStorageSync('userId')}`,
      method: 'get',
      header: {
        'Content-Type': 'application/json',
        'Authorization': wx.getStorageSync('token') // 添加其他自定义的请求头
      },
      success: (res) => {
        this.setData({
          shift_record: res.data.data
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getShiftRecord()
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
    this.getShiftRecord()
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