Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 曲调
    tone: {
      type: String,
      value: 'F'
    },
    // 曲子代码
    scores: {
      type: Array,
      value: []
    },
    // 一拍多长时间，ms
    beatTime: {
      type: Number,
      value: 1000
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    animationData: {},
    currentKey: null,
  },

  lifetimes: {
    attached() { 

      this.animation = wx.createAnimation({
        duration: this.properties.beatTime,
        timingFunction: 'linear'
      });

      // setTimeout(() => {
        
      //   this.playScore();
      // }, 3000);
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    playScore: function() {
      // 设置线条的初始位置

      // this.animation.right(10).step();

      // 移动到最右边
      this.animation.translateX(0).step();
      // this.animation.right(0).step();
      // 更新数据，触发视图层重新渲染
      this.setData({
        animationData: this.animation.export()
    });


    }
  }
})