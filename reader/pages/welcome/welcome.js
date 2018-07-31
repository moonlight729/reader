
Page({
  // 定义数据有俩种方式 1.data里定义 2.onLoad 或者其他周期函数中，通过setData()设置
  tapFunc: function(event) {
    wx.navigateTo({
      url: '/pages/posts/post'
    })
  }
})




