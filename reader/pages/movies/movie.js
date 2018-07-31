var utils = require('../utils/utils.js');

var app = getApp();

Page({
  data: {
      inTheaters:{},   // 为什么要定义
      commingSoon:{},
      top250:{},
    //   searchResult:{},
      containerShow:true,
      searchPanelShow:false,
      cancelImgShow:false,
  },
  onLoad:function(){
    var inTheatersUrl = app.globalData.doubanUrlBase + 
    "/v2/movie/in_theaters" + "?start=0&count=3"; // 正在热映
    var commingSoonUrl = app.globalData.doubanUrlBase + 
        "/v2/movie/coming_soon" + "?start=0&count=3"; // 即将上映
    var top250Url = app.globalData.doubanUrlBase + 
        "/v2/movie/top250" + "?start=0&count=3";              // 前250
    this.getMovieListData(inTheatersUrl,"inTheaters","正在热映");      // 传一个key值,区别对象
    this.getMovieListData(commingSoonUrl,"commingSoon","即将热映");
    this.getMovieListData(top250Url,"top250","豆瓣Top250");
  },
  getMovieListData(url,settedKey,categoryTitle) {
    var that = this
    wx.request({
      // 获取图书 https://douban.uieee.com/v2/book/1220562
      // 之后要学习自己搭建一个
      url: url,
      header: {
        'Content-Type': 'json'
      },
      method: 'GET',
      success: function (res) {
        //  console.log(res)
          that.processDoubanData(res.data, settedKey,categoryTitle)

      },
      fail: function () {

      }
    })
  },
    processDoubanData: function (doubanData, settedKey, categoryTitle) {
    // 定义一个数组，用来存放网络访问到的数据
    // console.log(doubanData)
    var movies = []
    for(var index in doubanData.subjects){
      var subject = doubanData.subjects[index]
      var title = subject.title
      if(title.length >6){
          title = subject.title.substring(0,6) + "..."
      }
      // 定义一个临时变量，存储每一项数据
      var temp = {
        stars: utils.convertToStarsArray(subject.rating.stars),
        title:title,
        average:subject.rating.average,
        coverage:subject.images.large,
        moveId:subject.id
      }
    //   console.log(temp)
      movies.push(temp)

    }
    //  console.log(categoryTitle)

    var readyData = {}
    readyData[settedKey] = {
        movies:movies,          // 变为一个对象的形式
        categoryTitle:categoryTitle
    }
    //    console.log(movies)
    // 进行数据绑定
    this.setData(readyData) // 这是什么写法，哦，里面是一个对象就行
},
  onTapMore: function (event) {
    //   console.log("onTapMore") // 这也可以，函数定义放在这里，煞笔微信
    var category = event.currentTarget.dataset.category
    wx.navigateTo({
        url: '/pages/movies/more-movies/more-movies?category=' + category,
    })
  },
  // 光标聚焦
    onBindFocus:function(event){
        this.setData({
            containerShow:false,
            searchPanelShow:true,
            cancelImgShow:true
        })
    },
    // input绑定内容改变
    onBindChange:function(event){
        // 获取input内容
        var text = event.detail.value
        console.log(text)
        var searchUrl = app.globalData.doubanUrlBase + "/v2/movie/search?q=" + text
        this.getMovieListData(searchUrl,"searchResult","")

    },
    cancelSearch:function(event){
        this.setData({
            containerShow: true,
            searchPanelShow: false,
            cancelImgShow:false
        })
    }
})