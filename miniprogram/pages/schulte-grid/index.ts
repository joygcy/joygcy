type IState = 'ready' | 'playing' | 'success' | 'fail' | 'pause';

Page({
  data: {
    difficultyPickerVisible: false,
    difficulty: '3x3',
    difficultyOptions: [
      { label: '2x2', value: '4' },
      { label: '3x2', value: '6' },
      { label: '3x3', value: '9' },
      { label: '4x4', value: '16' },
      { label: '5x5', value: '25' },
      { label: '6x6', value: '36' },
      { label: '7x7', value: '49' },
      { label: '8x8', value: '64' },
      { label: '9x9', value: '81' },
    ],
    state: 'ready',
    current: 1,
    steps: [],
    startTime: 0,
    endTime: 0,
    pauseTime: 0, // 暂停时间戳
    elapsedTime: 0, // 暂停时长
    timeDesc: '-',
    intervalId: 0,
  },
  onLoad() {
    // 默认难度：默认难度上次做题的难度，再默认选择3*3
    const getLastDifficulty = wx.getStorageSync('lastDifficulty');
    this.setData({
      difficulty: getLastDifficulty?.[0] || '3x3',
    });
  },
  onHide() {
    this.onPause();
  },
  onPickerChange(e) {
    const { value } = e.detail;

    console.log('picker change:', e.detail);
    this.setData({
      difficultyPickerVisible: false,
      difficulty: value,
    });
    // 记录上次做题的难度
    wx.setStorageSync('lastDifficulty', value);
  },

  onPickerCancel(e) {
    console.log(e, '取消');
    console.log('picker1 cancel:');
    this.setData({
      difficultyPickerVisible: false,
    });
  },

  onCityPicker() {
    this.setData({ difficultyPickerVisible: true });
  },
  // 开始
  onStart() {
    this.setData({
      state: 'playing',
      startTime: Date.now(),
    });

    // 开始计时
    this.updateTimeDisplay(0);
    this.startTimer();
  },
  // 暂停
  onPause() {
    this.setData({
      state: 'pause',
    });
    this.data.pauseTime = Date.now();
    clearInterval(this.data.intervalId);
  },
  // 继续
  onContinue() {
    this.setData({
      state: 'playing',
    });
    this.data.elapsedTime += Date.now() - this.data.pauseTime;
    this.startTimer();
  },
  
  // 生成题目

  onJumpToRules() {
    wx.navigateTo({
      url: '/pages/schulte-grid/rules/index',
    });
  },
  // 开启秒表
  startTimer() {
    this.data.intervalId = setInterval(() => {
      const now = Date.now();
      const elapsed = now - this.data.startTime - this.data.elapsedTime;
      this.updateTimeDisplay(elapsed);
  }, 1000);
  },
  // 渲染秒表
  updateTimeDisplay(time: number) {
    if (time < 0) {
      this.setData({
        timeDesc: '-',
      });
    }
    const seconds = this.renderTime(Math.floor((time / 1000) % 60)),
        minutes = this.renderTime(Math.floor((time / (1000 * 60)) % 60)),
        hours = this.renderTime(Math.floor((time / (1000 * 60 * 60)) % 24));
    this.setData({
      timeDesc: `${hours}:${minutes}:${seconds}`
    });
  },
  // 时、分、秒变成2个数字，不足2个数字前面补0
  renderTime(time: number) {
    return time.toString().padStart(2, '0');
  },
});
