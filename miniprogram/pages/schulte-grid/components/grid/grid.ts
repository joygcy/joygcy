import moment from 'moment';
Component({
  cellAnimation: null,
  numberAnimation: null,
  behaviors: [],
  properties: {
    pageInstance: Object,
    difficulty: {
      type: String,
      value: '3x3',
    },
    state: {
      type: String,
      value: 'ready',
    },
  },
  data: {
    rows: 0,
    cols: 0,
    style: 50, // 宽高
    array: [],
    correctNum: 1,
    animateCell: 0,
  },
  lifetimes: {
    created () {
    },
    attached() {
      this.cellAnimation = wx.createAnimation({
        duration: 100,
      });
      this.numberAnimation = wx.createAnimation({
        duration: 100,
      });
    },
    moved() {
    },
    detached() {

    },
  },
  observers: {
    'difficulty': function(difficulty) {
      this.renderGrid(difficulty);
    },
    state: function(state) {
      if (state === 'ready') {
        this.setData({
          array: [],
          correctNum: 1,
        });
      }
    },
  },
  export() {
    return { generate: this.generate }
  },
  methods: {
    renderGrid(difficulty: string) {
      const shapeArr = difficulty.split('x');
      const cols = shapeArr[1];
      const size = `calc((100vw - 40rpx) / ${cols})`
      this.setData({
        rows: Array.from({ length: shapeArr[0] }),
        cols: Array.from({ length: shapeArr[1] }),
        style:`width: ${size}; height: ${size};font-size: ${size};`,
        array: [],
        correctNum: 1,
      });
    },
    generate() {
      const len = this.data.rows?.length * this.data.cols?.length || 0;
      const array = Array.from({ length: len }, (_, i) => i + 1);
      // 打乱顺序
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // 交换元素
      }
      this.setData({
        array,
        correctNum: 1,
      });
    },
    onTap(e) {
      const { correctNum, array } = this.data;
      const { state } = this.properties;
      if (state !== 'playing') {
        return;
      }
      const { value } = e.currentTarget.dataset;
      const isCorrect = value === correctNum;
      if (isCorrect) {
        this.setData({
          correctNum: correctNum + 1,
        });
        if (correctNum >= array.length) {
          this.triggerEvent('finish');
        }
      }
      this.cellAnimation.backgroundColor(isCorrect ? 'aliceblue' : 'pink').step().backgroundColor('white').step();
      this.numberAnimation.opacity(0.5).step().opacity(1).step();

      // 直接更新页面实例的steps
      // this.properties.pageInstance.steps.push({ isCorrect, value, time: moment().format('YYYY-MM-DD HH:mm:ss') })
      this.triggerEvent('addStep', { isCorrect, value, time: moment().format('YYYY-MM-DD HH:mm:ss') });
      
      this.setData({
        cellAnimation: { [`cell${value}`]: this.cellAnimation.export()},
        numberAnimation: { [`cell${value}`]: this.numberAnimation.export()},
        animateCell: value, // 点击动画
      });
    }
  },
});
