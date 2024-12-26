// 生成演奏用的

import { IScore, IMusic } from "../common/interface/score";

export default class Score {
  playOrder: string[]; // 演奏顺序
  musicInfo: {[key:string]: IMusic}; // 间奏占用几拍
  beatTime: number;
  beatNumPerSection: number;
  beatTotal: number;

  scores: IScore[];

  constructor({
    playOrder,
    musicInfo,
    beatTime,
    beatNumPerSection,
  }: {
    playOrder: string[];
    musicInfo: {[key:string]: IMusic};
    beatTime: number;
    beatNumPerSection: number;
  }) {
    this.playOrder = playOrder;
    this.musicInfo = musicInfo;
    this.beatTime = beatTime;
    this.beatNumPerSection = beatNumPerSection;

    this.beatTotal = 0;
    this.scores = this.getScoresForPlay();
  }

  // 生成间奏的曲谱
  private getMusicScoreByBeatNum(beatNum?: number): IScore[] {
    const result: IScore[] = [];
    if (!beatNum) return [];
    let index = 0;
    do {
      result.push({
        note: 0,
        key: this.beatTotal++,
      });
      index++;
    } while (index < beatNum);
    return result
  }
  private getMusicScores(musicKey: string): IScore[] {
    let result: IScore[] = [];
    const music = this.musicInfo[musicKey];
    if (!music) return [];
    if (typeof music === 'number') {
      return this.getMusicScoreByBeatNum(music);
    }
    // 有可能间奏不是一整节
    result = result.concat(this.getMusicScoreByBeatNum(music.head))
    result = result.concat(this.getMusicScoreByBeatNum(music.middle))
    result = result.concat(this.getMusicScoreByBeatNum(music.foot))
    return result;
  }
  // 遍历演奏顺序，生成曲谱
  getScoresForPlay(): IScore[] {
    let result: IScore[] = [];
    // 遍历演奏顺序
    for (let playIndex = 0; playIndex < this.playOrder.length; playIndex++) {
      const play = this.playOrder[playIndex];
      // music开头代表伴奏
      if (play.startsWith('music')) {
        result = result.concat(this.getMusicScores(play))
      } else {
        result.push()
      }
    }
    return result;
  }


}
