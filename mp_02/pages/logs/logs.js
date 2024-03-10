// pages/message/message.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // token: '',
    username: '',
    password: '',
    confirmPassword: ''
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
  onConfirmPasswordInput(e){
    if(this.data.password !== e.detail.value){
      wx.showToast({
        title: '密码不符，请重试',
        icon: 'none',
        duration: 2000
      })
      this.setData({
        confirmPassword: ''
      })
      return
    }
    this.setData({
      confirmPassword: e.detail.value
    })
  },

  regUserInfo(){
    if(!this.data.username || !this.data.password || !this.data.confirmPassword){
      wx.showToast({
        title: '请将信息填写完全',
        icon: 'none',
        duration: 2000
      })
      return
    }
    wx.request({
      url: 'http://127.0.0.1:3007/api/reguser',
      method: 'POST',
      data: {
        username: this.data.username,
        password: this.data.password
      },
      success: (res) => {
        if(res.data.status !== 0){
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 2000
          })
          this.setData({
            username: '',
            password: '',
            confirmPassword: ''
          })
          return
        }
        wx.showToast({
          title: res.data.message,
          icon: 'none',
          duration: 2000,
          success: () => {
            setTimeout(() => {
              wx.navigateBack({
                delta: 1
              });
            }, 2000);
          }
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