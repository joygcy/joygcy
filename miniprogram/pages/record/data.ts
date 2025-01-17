import { IScore } from "../../common/interface/score";

export const getScoresByStringArray:(stringArray: String[]) => IScore[] = (stringArray: String[]) => {
  const result:ISection[] = [];
  let key = 1;
  for (let sectionIndex = 0; sectionIndex < stringArray.length; sectionIndex++) {
    const currentSection = [];
    const section = stringArray[sectionIndex];
    for (let beatIndex = 0; beatIndex < section.length; beatIndex++) {
      const currentBeat = [];
      const beat = section[beatIndex];
      for (let scoreIndex = 0; scoreIndex < beat.length; scoreIndex++) {
        const score = beat[scoreIndex];
        const scoreArr = score.split(' ');
        currentBeat.push({
          key: key++,
          ...parseNote(scoreArr[0]),
          scaleNote: scoreArr[0],
          half: score.includes('half'),
          extend: score.includes('extend'),
          quarter: score.includes('quarter'),
          linking: parseLinking(score),
        })
      }
      currentSection.push(currentBeat);
    }
    result.push(currentSection);
  }
  return result;
}

// 将形如++1 -5这种分解成数字和音域
const parseNote: (str: string) => {note: any, scale: string } = (str: string) => {
  if (str.includes('++')) return {note: Number(str.replace('++', '')), scale: 'treble'}
  if (str.includes('+')) return {note: Number(str.replace('+', '')), scale: 'high'}
  if (str.includes('--')) return {note: Number(str.replace('--', '')), scale: 'doubleBass'}
  if (str.includes('-') && str !== '-') return {note: Number(str.replace('-', '')), scale: 'bass'}
  if (Number(str)) return {note: Number(str), scale: ''}
  return {note: str, scale: ''};
}

const parseLinking: (str: string) => 'start' | 'middle' | 'stop' | false = (str: string) => {
  if (str.includes('linkStart')) return 'start';
  if (str.includes('linkMiddle')) return 'middle';
  if (str.includes('linkEnd')) return 'stop';
  return false;
}
