import toneF from "./tone-f"

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
    // 音
    note: {
      type: String,
      value: '3'
    },
    scale: {
      type: String,
      value: '',
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    dots: [],
    showImage: true,
  },

  lifetimes: {
    attached() {
      const { scale, note } = this.properties;
      let showImage = true;
      const dots = toneF[`${scale}${note}`];
      if (!dots) {
        showImage = false;
      }
      this.setData({
        dots,
        showImage
      })
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {

  }
})