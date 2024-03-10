// pages/message/message.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // token: '',
    username: '',
    password: ''
  },
  onUsernameInput(e){
    // if(!e.detail.value) return
    this.setData({
      username: e.detail.value
    })
    // console.log(this.data.username)
  },
  onPasswordInput(e){
    this.setData({
      password: e.detail.value
    })
    // console.log(this.data.password)
  },

  loginInfo(){
    wx.request({
      url: 'http://127.0.0.1:3007/api/login',
      method: 'post',
      data: {
        username: this.data.username,
        password: this.data.password
      },
      success: (res) => {
        // console.log(res.data)
        if(!res.data.token){
          this.setData({
            username: '',
            password: ''
          })
          wx.showToast({
            title: '登录失败，请检查账号和密码',
            icon: 'none',
            duration: 2000
          });
          return
        }
        // this.setData({
        //   token: res.data.token ? res.data.token : ''
        // })
        wx.setStorageSync('token', res.data.token);
        wx.setStorageSync('username', this.data.username);
        wx.setStorageSync('userId', res.data.id);
        wx.switchTab({
          url: `/pages/home/home`
        })
      }
    })
  },
  regUserInfo(){
    this.setData({
      username: '',
      password: ''
    })
    wx.navigateTo({
      url: '/pages/logs/logs',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.setStorageSync('token', '')
    wx.setStorageSync('username', '')
    wx.setStorageSync('userId', '')
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