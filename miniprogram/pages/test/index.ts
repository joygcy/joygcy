import Score from "../../utils/score"
import { beatNumPerSection, beatTime, musicInfo, scorePlayOrder, paragraphs } from "./data";

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
      beatNumPerSection: beatNumPerSection,
      paragraphs: paragraphs
    });
    console.log('===== ~  myScore：', myScore.scores);
    this.setData({scores: myScore.scores})

  },
})
