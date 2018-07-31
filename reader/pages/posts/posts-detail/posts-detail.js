var detail = require('../../../data/posts-data.js')
// 微信全局数据
var app = getApp()
var globalData = app.globalData
Page({
  // 默认初始化数据
  data: {
    currentPostId: '',
    isPlayingMusic: false,
  },
  onLoad: function(option) {
    // 详情页id
    var postId = option.id
    this.data.currentPostId = postId
    var detail_data = detail.localdata[postId]
    this.setData({
      detail_data: detail_data,

    })

    // 所有文章缓存状态
    // var postsCollected = {
    //     1: "true",
    //     2: "false",
    //     3: "true"
    // }

    //获取所有的缓存
    var postsCollected = wx.getStorageSync('storage')
    if (postsCollected) {
      var postCollected = postsCollected[postId]
      //设置对应缓存状态
      if (postCollected) {
        this.setData({
          collected: postCollected
        })
      }
    } else {
      // 缓存中没有，则新建缓存，未收藏状态
      var postsCollected = {}       // 这个变量作用域在本else括号内
      postsCollected[postId] = "false"
      wx.setStorageSync('storage', postsCollected)
    }
    this.setMusicMonitor()
    if (globalData.g_isPlayingMusic){
      this.setData({
        isPlayingMusic:true
      })
    }

  },
  setMusicMonitor:function() {
    var that = this
    wx.onBackgroundAudioPlay(function () {
      that.setData({
        isPlayingMusic: true
      })
      globalData.g_isPlayingMusic = true
    })
    wx.onBackgroundAudioPause(function () {
      that.setData({
        isPlayingMusic: false
      })
      globalData.g_isPlayingMusic = false
    })
  },
  /**
   * 收藏状态实际中从服务器返回，可以用缓存模拟
   */
  onCollectTap: function() {
    var postsCollected = wx.getStorageSync('storage')
    var postCollected = postsCollected[this.data.currentPostId]
    if (!postCollected) {
      wx.showToast({
        title: '收藏成功',
        duration: 1000
      })
    }
    postCollected = !postCollected
    postsCollected[this.data.currentPostId] = postCollected
    // 更新缓存
    wx.setStorageSync('storage', postsCollected)
    //更新数据绑定
    this.setData({
      collected: postCollected
    })

  },
  onShareAppMessage: function(res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '自定义转发标题',
      path: '/page/user?id=123'
    }
  },
  onShareTap: function(res) {
    // onShareAppMessage();

  },
  onTapMusic: function() {
    // data中数据定义后，获取用this.data. 如果是绑定数据，要用setData
    if (this.data.isPlayingMusic) {
      wx.pauseBackgroundAudio()
      // console.log('stop music')
      this.setData({
        isPlayingMusic: false
      })
    } else {
      // console.log("start music")
      var postsCollectData = detail.localdata[this.data.currentPostId]
      var postCollectDataUrl = postsCollectData.music.dataUrl
      var postCollectTitle = postsCollectData.music.title
      wx.playBackgroundAudio({
        dataUrl: postCollectDataUrl,
        title: postCollectTitle
      })
      this.setData({
        isPlayingMusic: true
      })
    }
  }
})