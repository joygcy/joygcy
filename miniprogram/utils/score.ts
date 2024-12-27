// 生成演奏用的

import { IScore, IMusic } from "../common/interface/score";

export default class Score {
  playOrder: string[]; // 演奏顺序
  musicInfo: {[key:string]: IMusic}; // 间奏占用几拍
  paragraphs: {[key:string]: string[]}; // 各段落
  beatTime: number;
  beatNumPerSection: number;
  beatTotal: number;

  scores: IScore[];

  constructor({
    playOrder,
    musicInfo,
    beatTime,
    beatNumPerSection,
    paragraphs,
  }: {
    playOrder: string[];
    musicInfo: {[key:string]: IMusic};
    beatTime: number;
    beatNumPerSection: number;
    paragraphs: {[key:string]: string[]};
  }) {
    this.playOrder = playOrder;
    this.musicInfo = musicInfo;
    this.beatTime = beatTime;
    this.beatNumPerSection = beatNumPerSection;
    this.paragraphs = paragraphs;

    this.beatTotal = 0;
    this.scores = this.getScoresForPlay();
  }

  // 生成间奏的曲谱
  private getMusicScoreByBeatNum(beatNum?: number, type?: 'head' | 'middle' | 'foot'): IScore[] {
    const result: IScore[] = [];
    if (!beatNum) return [];
    let index = 0;
    let isSectionStart = false;
    switch (type) {
      case 'head':
        isSectionStart = index === beatNum;
        break;
      case 'middle':
        isSectionStart = index % this.beatNumPerSection === 0;
        break;
      case 'foot':
        isSectionStart = index === 0;
        break;
    
      default:
        break;
    }
    do {
      result.push({
        note: '0',
        key: this.beatTotal++,
        sectionStart: index % this.beatNumPerSection === 0,
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
    result = result.concat(this.getMusicScoreByBeatNum(music.head, 'head'))
    result = result.concat(this.getMusicScoreByBeatNum(music.middle, 'middle'))
    result = result.concat(this.getMusicScoreByBeatNum(music.foot, 'foot'))
    return result;
  }
  // 将形如['half', 'halfEnd']的字符串数组解析成{half: true, halfEnd: true}
  private getScoreItemsByArr (arr: string[]): {[key: string]: true} {
    const result: {[key: string]: true} = {};
    if (!arr || arr.length === 0) return result;
    for (let index = 0; index < arr.length; index++) {
      const element = arr[index];
      result[element] = true;
    }
    return result;
  }
  private getScore(key:string): IScore[] {
    let result: IScore[] = [];
    if (!key) return result;
    let play = this.paragraphs[key];
    if (!play || play.length === 0) return result;
    
    for (let index = 0; index < play.length; index++) {
      const str = play[index];
      const arr = str.split(' ');
      if (arr.length === 0) break;

      result.push({
        note: arr[0],
        key: this.beatTotal++,
        ...this.getScoreItemsByArr(arr.splice(1))
      })
    }
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
        result = result.concat(this.getScore(play))
      }
    }
    return result;
  }


}
