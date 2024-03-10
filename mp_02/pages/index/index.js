// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    search: '',
    list: []
  },
  getYuYue(event){
    const doctorId = event.currentTarget.dataset.doctor_id;
    wx.navigateTo({
      url: `/pages/yuYue/yuYue?id=${doctorId}`,
    })
  },
  
  getSearch(){
    wx.request({
      url: 'http://127.0.0.1:3007/register/search',
      method: 'post',
      header: {
        'Content-Type': 'application/json',
        'Authorization': wx.getStorageSync('token') // 添加其他自定义的请求头
      },
      data: {
        search: this.data.search
      },
      success: (res) => {
        // console.log(res.data)
        this.setData({
          list: res.data.data
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      search: options.search
    })
    // console.log(this.data.search)
    this.getSearch()
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