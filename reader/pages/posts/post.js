var posts_content = require('../../data/posts-data.js')
Page({
  ontap: function(event) {
    var postId = event.currentTarget.dataset.postid
    wx.navigateTo({
      url: './posts-detail/posts-detail?id='+postId,
    })
  },
  //轮播图跳转事件
  onSwipertap: function(event) {
    // target 和currentTarget 区别
    // target 是点击到的对象 currnetTarget是事件处理对象
    // console.log(event)
    var id = event.target.dataset.imgid
    wx.navigateTo({
      url: './posts-detail/posts-detail?id=' + id,
    })
  },
  //页面默认数据
  data: {
    indicatorDots: false,
  },

  onLoad: function(options) {
    this.setData({
      posts_key: posts_content.localdata // 键值

    })
  }
})