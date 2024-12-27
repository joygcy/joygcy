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
      value: ''
    },
    scale: {
      type: String,
      value: '',
    },
    key: {
      type: String,
      value: 'score'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    showFingerImg: true,
  },

  lifetimes: {
    ready() {
      // 守卫代码，如果没有对应的指法，就不展示
      if(!toneF[this.properties.note]) {
        this.setData({ showFingerImg: false });
      } else {
        // 通过 SelectorQuery 获取 Canvas 节点
        this.createSelectorQuery()
          .select('#' + this.properties.key)
          .fields({
            node: true,
            size: true,
          })
          .exec(this.init.bind(this))
        }
      }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    init(res) {
      const width = res[0].width
      const height = res[0].height
  
      const canvas = res[0].node
      const ctx = canvas.getContext('2d')
  
      const dpr = wx.getSystemInfoSync().pixelRatio
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.scale(dpr, dpr)
      this.render(canvas, ctx)
    },
  
    render(canvas, ctx) {
      ctx.clearRect(0, 0, 300, 150)
      ctx.scale(0.5, 0.5);
      this.drawBody(ctx);
      this.drawHole(ctx);
    },

    drawBody(ctx) {
      ctx.beginPath()
      ctx.moveTo(37, 52);
      ctx.quadraticCurveTo(5, 47, 1, 35);
      ctx.bezierCurveTo(-7, 9, 75, -2, 97, 2);
      ctx.bezierCurveTo(117, 7, 52, 42, 49, 49);
      ctx.bezierCurveTo(45, 55, 47, 70, 44, 70);
      ctx.lineTo(37, 70);
      ctx.quadraticCurveTo(34, 70, 37, 52);
      ctx.fillStyle = '#B4E088'
      ctx.strokeStyle = '#333333'
      ctx.fill()
      ctx.stroke()
    },
    drawHole(ctx) {
      // 绘制指孔
      const holePositions = [
        [55, 60], [28, 60], 
        [10, 34], [18, 26], [27, 20], [38, 16], 
        [58, 31], [68, 24], [79, 17], [90, 10],
        [24, 34], [62, 16]
      ];
      for (let i = 0; i < holePositions.length; i++) {
        ctx.beginPath()
        ctx.arc(holePositions[i][0], holePositions[i][1], 4, 0, Math.PI * 2)
        ctx.fillStyle = toneF[this.properties.note]?.includes(i+1) ? '#333' : '#FFFFFF';
        ctx.strokeStyle = '#333333'
        ctx.fill()
        ctx.stroke()
      }
    },
  }
})