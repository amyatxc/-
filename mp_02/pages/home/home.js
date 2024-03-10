// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token: wx.getStorageSync('token'),
    classList: [],
    depList: [],
    depId: 162,
    inputValue: ''
    // doctorList: []
  },
  getClassId(event) {
    const id = event.currentTarget.dataset.id;
    const classList = this.data.classList;
    // 在这里处理获得的id
    this.setData({
      depId: id
    })
    for (let i = 0; i < classList.length; i++) {
      let item = classList[i];
      if (item.class_id === id) {
        item.active = true; // 给被点击的项添加 active 属性
      } else {
        item.active = false; // 清除其他项的 active 属性
      }
    }
    this.setData({
      classList: classList
    });
    // console.log(this.data.depId)
    this.getDep()
  },
  getDepId(event){
    const id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/doctors/doctors?id=${id}`,
    })
  },
  onBlur(e){
    if(!e.detail.value) return
    wx.navigateTo({
      url: `/pages/index/index?search=${e.detail.value}`,
    })
    // console.log(e.detail.value)
    this.setData({
      inputValue: ''
    })
  },

  // loginInfo(){
  //   wx.request({
  //     url: 'http://127.0.0.1:3007/api/login',
  //     method: 'post',
  //     data: {
  //       username: 'zs',
  //       password: '123456'
  //     },
  //     success: (res) => {
  //       // console.log(res.data)
  //       // this.postInfo()
  //       this.setData({
  //         token: res.data.token
  //       })
  //       this.getClass()
  //       this.getDep()
  //     }
  //   })
  // },
  getClass(){
    wx.request({
      url: 'http://127.0.0.1:3007/register/class',
      method: 'GET',
      header: {
        'Content-Type': 'application/json',
        'Authorization': this.data.token // 添加其他自定义的请求头
      },
      success: (res) => {
        // console.log(res.data)
        this.setData({
          classList: res.data.data
        })
        const classList = this.data.classList;
        if (classList.length > 0) {
          classList[0].active = true; // 给第一项添加 active 属性
        }
        this.setData({
          classList: classList
        });
      }
    })
  },
  getDep(){
    wx.request({
      url: `http://127.0.0.1:3007/register/dep/${this.data.depId}`,
      method: 'GET',
      header: {
        'Content-Type': 'application/json',
        'Authorization': this.data.token // 添加其他自定义的请求头
      },
      success: (res) => {
        // console.log(res.data)
        this.setData({
          depList: res.data.data
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // this.loginInfo()
    this.getClass()
    this.getDep()
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