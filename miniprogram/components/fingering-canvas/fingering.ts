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
  },

  lifetimes: {
    attached() {
      const ctx = wx.createCanvasContext('myCanvas');

      // 画出主体部分
      ctx.beginPath();
      ctx.moveTo(50, 75);
      ctx.bezierCurveTo(50, 60, 150, 60, 150, 75);
      ctx.lineTo(350, 75);
      ctx.bezierCurveTo(350, 100, 250, 100, 250, 125);
      ctx.lineTo(150, 125);
      ctx.bezierCurveTo(150, 100, 50, 100, 50, 75);
      ctx.closePath();
      ctx.setFillStyle('red');
      ctx.fill();

      // 添加吹口（假设在顶部中央）
      ctx.beginPath();
      ctx.arc(200, 50, 10, 0, 2 * Math.PI);
      ctx.setFillStyle('#8B4513');  // 使用棕色表示吹口
      ctx.fill();

      // 绘制指孔
      const holePositions = [
        [100, 90], [150, 90], [200, 90], [250, 90], [300, 90],
        [100, 120], [150, 120], [200, 120], [250, 120], [300, 120],
        [100, 150], [200, 150]
      ];
      for (let i = 0; i < holePositions.length; i++) {
        ctx.beginPath();
        ctx.arc(holePositions[i][0], holePositions[i][1], 5, 0, 2 * Math.PI);
        ctx.setFillStyle('#FFFFFF');  // 白色圆圈代表指孔
        ctx.fill();
      }

      // 绘制到 canvas 上
      ctx.draw();
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {

  }
})