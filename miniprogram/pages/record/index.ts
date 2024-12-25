import { 
  sectionStringArray, 
  getSectionsByStringArray, 
  scorePlayOrder,
  musicTimeObj,
  beatTime,
  accompanyUrl,
  name,
} from './data';
import { getPlayOrder } from './util';

import cax from '../../components/cax/index'

Page({
  backgroundAudioManager: wx.getBackgroundAudioManager(),
  recorderManager: wx.getRecorderManager(),
  timeout: 0,
  showInterlude: false, // 是否播放间奏
  interludeRest: 0, // 间奏还剩多少秒
  /**
   * 页面的初始数据
   */
  data: {
    state: 'free', // free-无录音；busy-正在录音；
    tempFilePath: '', // 录音后的文件
    activeKey: null as number | null,
    playOrder: [] as any,
    // 以下是应该从服务端获取的
    sections: [] as any,
    time: [],
    sectionStringArray,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.initPage();
    const sections = sectionStringArray.map(o => 
      ({key: o.key, sections: getSectionsByStringArray(o.sections)}) );
      
      console.log('===== ~  sections：', sections);
    this.setData({sections});
    this.backgroundAudioManager = wx.getBackgroundAudioManager();
    this.backgroundAudioManager.title = '背景音乐';
    this.backgroundAudioManager.epname = '示例';
    this.backgroundAudioManager.singer = '未知';

    this.recorderManager = wx.getRecorderManager();

    this.recorderManager.onStop((res) => {
      console.log('recorder stop', res);
      const { tempFilePath } = res
      this.setData({
        tempFilePath,
      })
    })

    const playOrder = getPlayOrder({
      paragraphArr: sections,
      order: scorePlayOrder,
      musicTimeObj,
      beatTime,
    });
    console.log('===== ~  playOrder：', playOrder);
    this.setData({
      playOrder,
    })

  },
  initPage() {
    wx.setNavigationBarTitle({
      title: `${name}-录制`,
    })
  },

  startPlay() {
      console.log('startPlay', this.backgroundAudioManager.src);
    if(!this.backgroundAudioManager.src) {
      console.log('startPlay2', this.backgroundAudioManager.src);
      this.backgroundAudioManager.src = accompanyUrl;
    } else {
      console.log('startPlay3', this.backgroundAudioManager.src);
      this.backgroundAudioManager.play() // 播放
    }
  },
  pausePlay() {
    this.backgroundAudioManager.pause() // 暂停
  },
  stopPlay() {
    this.backgroundAudioManager.seek(0) // 停止
    this.pausePlay();
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
    this.startPlay();

    this.startPlaySections();
    this.setData({
      state: 'busy',
    });
  },

  stopPlayRecord() {
    this.stopPlaySections();
    this.stopPlay();
    this.stopRecord();
    this.setData({
      state: 'free',
    });
  },

  startPlaySections(i= 0) {
    const playOrder = this.data.playOrder;
    const current = playOrder[i++];
    console.log('===== ~  startPlaySections： time[i]：',current);

    this.setData({
      showInterlude: false,
    });
    clearInterval(this.interval);
    
    if (typeof current.key === 'string') {
      this.setData({
        showInterlude: true,
      });
      this.showMusicLoading(current.time);
    } else {
      this.setData({ activeKey: current.key });
      wx.pageScrollTo({
        selector: `.section-container >>> #score${current.key}`,
        offsetTop: -200,
        duration: 200
      });
    }

    this.timeout = setTimeout(() => {
      if (playOrder[i]) {
        this.startPlaySections(i)
      } else {
        this.stopPlaySections();
      }
    }, current.time);
  },

  // 间奏读秒播放
  showMusicLoading(time: number) {
    let i = 0;
    const interludeRest = time/1000 - i++;
    this.setData({
      interludeRest,
    })
    this.interval = setInterval(() => {
      console.log('===== ~  interval：');
      const interludeRest = time/1000 - i++;
      this.setData({
        interludeRest,
      })
    }, 1000);
  },

  stopPlaySections() {
    console.log('===== ~  stopPlaySections',  this.timeout);
    clearTimeout(this.timeout);
    this.setData({ activeKey: null })
    wx.pageScrollTo({
      selector: `.section-container >>> #score1`,
      offsetTop: -200,
      duration: 200
    });
  },
})
