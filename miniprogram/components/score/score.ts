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
    animationData: {
      type: Object,
      value: {}
    },
    finterWidth: {
      type: Number,
      value: 100,
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentKey: null,
  },

  lifetimes: {
    attached() { 
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    
  }
})