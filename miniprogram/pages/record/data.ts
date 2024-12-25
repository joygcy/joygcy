import { ISection } from "./interface";

// 谱子
const A = [
  [['-5 half', '-6 half']],
  [['1 extend'], ['2 half']],
  [['3 half extend linkStart', '-7 quarter linkStop'],['-6 quarter linkStart', '-7 quarter linkMiddle', '-5 half linkStop']],
  [['-6 linkStart'], ['- linkMiddle']],
  [['-6 linkStop'], ['1 half', '2 half']],
  [['3 extend'], ['5 half'],],
  [['6 half linkStart', '1 half linkStop'], ['2 quarter linkStart', '3 quarter linkMiddle', '4 half linkStop']],
  [['3 linkStart'], ['- linkMiddle']],
  [['3 linkStop'], ['3 half', '5 half']],
  [['6 extend'], ['5 half']],
  [['6'], ['-6 half', '3 half']],
  [['2 extend'], ['1 half']],
  [['2'], ['3']],
  [['-5 extend linkStart'], ['-6 half linkStop']],
  [['-7 half linkStart', '3 linkStop', '-6 half']],
  [['-6 half linkStart', '1 extend linkMiddle']],
  [['1 linkStop'], ['-']],
];
const B = [
  [['0 half', '5 half'], ['5 half', '6 half']],
  [['+1 half', '7'], ['6 quarter linkStart', '5 quarter linkStop']],
  [['6 linkStart'], ['- linkMiddle']],
  [['6 linkStop'], ['-']],
  [['0 half', '5 half'], ['5 half', '6 half']],
  [['+1 half', '7'], ['6 quarter linkStart', '5 quarter linkStop']],
  [['3 linkStart'], ['- linkMiddle']],
  [['3 linkStop'], ['-5 half', '-6 half']],
  [['1 extend'], ['2 half']],
  [['3 half linkStart', '-7 half linkMiddle'], ['-6 quarter linkMiddle', '-7 quarter linkMiddle', '-5 half linkStop']],
  [['-6 linkStart'], ['- linkMiddle']],
  [['-6 linkStop'], ['1 half', '2 half']],
  [['3 extend', '5 half']],
  [['6 half', '1 half'], ['2 quarter linkStart', '3 quarter linkStop', '4 half']],
  [['3 linkStart'], ['- linkMiddle']],
  [['3 linkStop'], ['3 half linkStart', '5 half linkStop']],
  [['6 extend linkStart'], ['5 half linkStop']],
  [['6'], ['-6 half linkStart', '3 half linkStop']],
  [['2 extend linkStart', '1 half linkStop']],
  [['2'], ['3']],
  [['-5 extend', '-6 half']],
  [['-7 half linkStart', '3 linkStop', '-6 half']],
];
const C = [
  [['-6 half linkStart', '1 extend linkMiddle']],
  [['1 linkStop'], ['-']],
];

const D = [
  [['-6 half linkStart', '1 extend linkMiddle']],
  [['1 linkStop'], ['3']],
  [['-5 extend'], ['-6 half']],
  [['-7 half linkStart', '3 linkStop'], ['-6 half']],
  [['-6 half linkStart', '1 extend linkMiddle']],
  [['1 linkMiddle'], ['- linkMiddle']],
  [['1 linkMiddle'], ['- linkMiddle']],
  [['1 linkStop'], ['-']],
]

export const sectionStringArray = [
  { key: 'A', sections: A },
  { key: 'B', sections: B },
  { key: 'C', sections: C },
  { key: 'D', sections: D },
];

// 演奏顺序
export const scorePlayOrder = [
  'music1', 'A', 'B', 'C', 'music2', 'A', 'B', 'C', 'B', 'D',
]
// 间奏时长
export const musicTimeObj = {
  music1: 33500,
  music2: 3000,
}
// 一节拍=多少ms
export const beatTime = 833;
// 伴奏地址
export const accompanyUrl = 'https://res.wx.qq.com/voice/getvoice?mediaid=MzI1MDUxMDQwMV8yMjQ3NTAxMDA0'; 

// 曲子名
export const name = '女儿情';

export const getSectionsByStringArray:(stringArray: String[][]) => ISection[] = (stringArray: String[][]) => {
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
  if (str.includes('linkStop')) return 'stop';
  return false;
}
