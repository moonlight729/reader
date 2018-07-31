Page({
  data: {
    //   cameraImgSrc: '',
    ctx:'',
    device_position:'front'
  },
  onLoad:function(){
      this.data.ctx = wx.createCameraContext()

  },
    takePhoto() {
        var _this = this
        _this.data.ctx.takePhoto({
            quality:'high',
            success:(res) =>{
                _this.setData({
                    cameraImgSrc:res.tempImagePath
                })
            }
        })
    },
    changeCamera() {
        if(this.data.device_position === 'front'){
            this.setData({
                device_position: 'back'
            })
        }else {
            this.setData({
                device_position:'front'
            })
        }

    },
    closeCamera() {
        
    }
})