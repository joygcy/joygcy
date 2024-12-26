import Score from "../../utils/score"
import { beatNumPerSection, beatTime, musicInfo, scorePlayOrder } from "./data";

const app = getApp()

Page({
  data: {
    scores: [],
  },

  onLoad: function () {
    const myScore = new Score({
      playOrder: scorePlayOrder,
      beatTime: beatTime,
      musicInfo: musicInfo,
      beatNumPerSection: beatNumPerSection
    });
    console.log('===== ~  myScore：', myScore.scores);
    this.setData({scores: myScore.scores})

  },
})
