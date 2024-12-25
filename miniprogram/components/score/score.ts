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
    paragraphs: {
      type: Array,
      value: []
    },
    // 高亮
    activeKey: Number
  },

  /**
   * 组件的初始数据
   */
  data: {
  },

  lifetimes: {
    attached() { }
  },
  /**
   * 组件的方法列表
   */
  methods: {

  }
})