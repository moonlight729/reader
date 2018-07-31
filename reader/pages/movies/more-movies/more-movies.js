var common = require("../../utils/utils.js");
var utils = require("../../utils/utils.js")
var app = getApp()
Page({
    data: {
        movies: [], // javaScript 中的数组可以自己扩容，很好用
        navigateTitle: '',
        requestUrl: '',
        totalCount: 0,
        isEmpty: ''
    },
    onLoad: function(options) {
        var category = options.category
        //   console.log(category)
        this.data.navigateTitle = category
        this.loadMovieDetail(category)
    },
    onReady: function(options) {
        // 动态设置导航栏标题，onReady页面渲染完成，此函数执行才生效。页面的生命周期 onLoad onShow onReady
        wx.setNavigationBarTitle({
                title: this.data.navigateTitle
            }),
            // 设置导航栏动画
            wx.setNavigationBarColor({
                frontColor: '#ffffff',
                backgroundColor: '#ff0000',
                animation: {
                    duration: 400,
                    timingFunc: 'easeIn'
                }
            })


    },
    loadMovieDetail: function(category) {
        var dataUrl = ''
        switch (category) {
            case '正在热映':
                dataUrl = app.globalData.doubanUrlBase +
                    "/v2/movie/in_theaters"
                break;
            case '即将热映':
                dataUrl = app.globalData.doubanUrlBase +
                    "/v2/movie/coming_soon"
                break;
            case '豆瓣Top250':
                dataUrl = app.globalData.doubanUrlBase +
                    "/v2/movie/top250"
                break;
            default:
                break;
        }
        this.data.requestUrl = dataUrl
        this.data.totalCount = 19
        common.http(dataUrl, this.processDoubanData)

    },
    processDoubanData: function(doubanData) {
        // console.log(doubanData)
        //var movies = []
        for (var index in doubanData.subjects) {
            var subject = doubanData.subjects[index]
            var title = subject.title
            if (title.length > 6) {
                title = subject.title.substring(0, 6) + "..."
            }
            var temp = {
                stars: utils.convertToStarsArray(subject.rating.stars),
                title: title,
                average: subject.rating.average,
                coverage: subject.images.large,
                moveId: subject.id
            }
            this.data.movies.push(temp)
        }
        this.setData({
            movies: this.data.movies
        })
        wx.hideNavigationBarLoading()

    },
    onScrollToLower: function(event) {
        wx.showNavigationBarLoading()
        // "?start=0&count=3" // 指定加载从0号开始，加载3个
        this.data.totalCount += 20

        // console.log("this.data.totalCount=" + this.data.totalCount)
        var nextUrl = this.data.requestUrl + "?start=" + this.data.totalCount + "&count=20"
        // console.log(nextUrl)
        common.http(nextUrl, this.processDoubanData)

    },
    onPullDownRefresh: function() {
        console.log('下拉刷新')
    }

})