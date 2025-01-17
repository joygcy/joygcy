import Score from "../../utils/score"
import { IScore } from "../../common/interface/score";
import { beatNumPerSection, beatTime, musicInfo, scorePlayOrder, paragraphs, name, accompanyUrl } from "../../data/nvErQing";

Page({
  backgroundAudioManager: wx.getBackgroundAudioManager(),
  recorderManager: wx.getRecorderManager(),
  animation: {},
  interval: 0,
  showInterlude: false, // 是否播放间奏
  interludeRest: 0, // 间奏还剩多少秒
  /**
   * 页面的初始数据
   */
  data: {
    state: 'free', // free-无录音；busy-正在录音；
    tempFilePath: '', // 录音后的文件
    animationData: {},
    scores: [] as IScore[],

    activeKey: null as number | null,
    playOrder: [] as any,
    // 以下是应该从服务端获取的
    sections: [] as any,
    time: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.initPage();
    this.initBackgroundAudio();
    this.initRecord();
  },
  // 初始化页面
  initPage() {
    wx.setNavigationBarTitle({
      title: `${name}-录制`,
    });
    const myScore = new Score({
      playOrder: scorePlayOrder,
      beatTime: beatTime,
      musicInfo: musicInfo,
      beatNumPerSection: beatNumPerSection,
      paragraphs: paragraphs
    });
    console.log('===== ~  myScore：', myScore.scores);
    this.setData({scores: myScore.scores})

    this.animation = wx.createAnimation({
      duration: beatTime,
      timingFunction: 'linear'
    });
  },

  // 准备录音器
  initRecord() {
    this.recorderManager = wx.getRecorderManager();
    this.recorderManager.onStart(() => {
      this.startPlay();
    });
    this.recorderManager.onStop((res) => {
      console.log('recorder stop', res);
      const { tempFilePath } = res
      this.setData({
        tempFilePath,
      })
    })
  },
  // 准备播放背景
  initBackgroundAudio() {
    this.backgroundAudioManager = wx.getBackgroundAudioManager();
    this.backgroundAudioManager.title = '背景音乐';
    this.backgroundAudioManager.epname = '示例';
    this.backgroundAudioManager.singer = '未知';
    this.backgroundAudioManager.onPlay((e) => {
      console.log('===== ~ backgroundAudioManager:onPlay', e);
      this.startPlaySections();
    })
    this.backgroundAudioManager.onPause(() => {
      this.stopRecord();
    })
  },

  startPlay() {
    if(!this.backgroundAudioManager.src) {
      this.backgroundAudioManager.src = accompanyUrl;
    } else {
      this.backgroundAudioManager.play() // 播放
    }
  },
  stopPlay() {
    this.backgroundAudioManager.pause() // 暂停
    this.backgroundAudioManager.seek(0) // 停止
  },

  startRecord() {
    const options = {
      // duration: 10000,
      sampleRate: 44100,
      numberOfChannels: 1,
      encodeBitRate: 192000,
      format: 'mp3',
      frameSize: 50
    }
    
    this.recorderManager.start(options);
  },

  stopRecord() {
    this.recorderManager.stop();
  },

  shareRecord() {
    wx.shareFileMessage({
      filePath: this.data.tempFilePath,
      success() {
      },
      fail: console.error,
    })
  },

  startPlayRecord() {
    this.startRecord();
    this.setData({
      state: 'busy',
    });
  },

  stopPlayRecord() {
    this.stopPlaySections();
    this.stopPlay();
    this.setData({
      state: 'free',
    });
  },

  startPlaySections() {
    let i = 1;
    clearInterval(this.interval);
    this.interval = setInterval(() => {
      this.animation.translateX(`${-400 * i++}rpx`).step();
      this.setData({
        animationData: this.animation.export()
    });
    }, beatTime);
    
  },


  stopPlaySections() {
    console.log('===== ~  stopPlaySections',  this.interval);
    clearInterval(this.interval);
      this.animation.translateX(0).step();
      this.setData({ animationData: this.animation.export() })
  },
})
