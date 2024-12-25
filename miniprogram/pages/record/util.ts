import { ISection } from "./interface";

/**
 * 计算播放顺序和时长，入参都应该存数据库的
 * @param paragraphArr 谱子的和弦Object，key以A、B、C。。。计
 * @param order 整首曲子下来，和弦和间奏的顺序
 * @param musicTimeObj 间奏时长
 * @param beatTime 小节时长
 * @returns 播放的key和对应的时长
 */

export const getPlayOrder: (obj: {
  paragraphArr: {
    key: string;
    sections: ISection[];
  }[];
  order: string[];
  musicTimeObj: {
    [key: string]: number;
  };
  beatTime: number;
}) => {key: string | number, time: number}[] = ({
  paragraphArr,
  order,
  musicTimeObj,
  beatTime,
}) => {
  const result = [];
  for (let index = 0; index < order.length; index++) {
    const current = order[index];
    if (current.startsWith('music')) {
      // 代表间奏
      result.push({
        key: current,
        time: musicTimeObj[current],
      })
    } else {
      const paragraph = paragraphArr.find(o => o.key === current).sections || [];
      for (let sectionIndex = 0; sectionIndex < paragraph.length; sectionIndex++) {
        const beats = paragraph[sectionIndex];
        for (let beatIndex = 0; beatIndex < beats.length; beatIndex++) {
          const scores = beats[beatIndex];
          for (let scoreIndex = 0; scoreIndex < scores.length; scoreIndex++) {
            const score = scores[scoreIndex];
            let myTime = beatTime;
            if (score.half) myTime *= 0.5;
            if (score.quarter) myTime *= 0.25;
            if (score.extend) myTime *= 1.5;
            result.push({
              key: score.key,
              time: myTime,
            });
          }
        }
      }
    }
  }
  return result;
}
