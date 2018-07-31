function convertToStarsArray(stars){
    // 代表星星个数 35 45 
    var num = stars.toString().substring(0,1)
    // console.log(num)
    var arr = []
    for(var i = 0; i < 5;i++){
        if(i < num){
            arr.push(1)
        }else {
            arr.push(0)
        }
    }
    return arr
}

function http(url,callBack) {
    wx.request({
        url: url,
        header: {
            'Content-Type': 'json'
        },
        method: 'GET',
        success: function (res) {
            //  console.log(res)
            callBack(res.data)
        }
    })  
}

module.exports = {
    http:http,
    convertToStarsArray, convertToStarsArray
}