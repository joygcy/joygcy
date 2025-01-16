import { IScore } from "../../common/interface/score";

// 谱子
const A = [
  [['6 half linkStart', '1 half linkEnd'], ['2 quarter linkStart', '3 quarter linkMiddle', '4 half linkEnd']],
  [['3 linkStart'], ['- linkMiddle']],
  [['3 linkEnd'], ['3 half', '5 half']],
  [['6 extend'], ['5 half']],
  [['6'], ['-6 half', '3 half']],
  [['2 extend'], ['1 half']],
  [['2'], ['3']],
  [['-5 extend linkStart'], ['-6 half linkEnd']],
  [['-7 half linkStart', '3 linkEnd', '-6 half']],
  [['-6 half linkStart', '1 extend linkMiddle']],
  [['1 linkEnd'], ['-']],
];
const B = [
  [['0 half', '5 half'], ['5 half', '6 half']],
  [['+1 half', '7'], ['6 quarter linkStart', '5 quarter linkEnd']],
  [['6 linkStart'], ['- linkMiddle']],
  [['6 linkEnd'], ['-']],
  [['0 half', '5 half'], ['5 half', '6 half']],
  [['+1 half', '7'], ['6 quarter linkStart', '5 quarter linkEnd']],
  [['3 linkStart'], ['- linkMiddle']],
  [['3 linkEnd'], ['-5 half', '-6 half']],
  [['1 extend'], ['2 half']],
  [['3 half linkStart', '-7 half linkMiddle'], ['-6 quarter linkMiddle', '-7 quarter linkMiddle', '-5 half linkEnd']],
  [['-6 linkStart'], ['- linkMiddle']],
  [['-6 linkEnd'], ['1 half', '2 half']],
  [['3 extend', '5 half']],
  [['6 half', '1 half'], ['2 quarter linkStart', '3 quarter linkEnd', '4 half']],
  [['3 linkStart'], ['- linkMiddle']],
  [['3 linkEnd'], ['3 half linkStart', '5 half linkEnd']],
  [['6 extend linkStart'], ['5 half linkEnd']],
  [['6'], ['-6 half linkStart', '3 half linkEnd']],
  [['2 extend linkStart', '1 half linkEnd']],
  [['2'], ['3']],
  [['-5 extend', '-6 half']],
  [['-7 half linkStart', '3 linkEnd', '-6 half']],
];
const C = [
  [['-6 half linkStart', '1 extend linkMiddle']],
  [['1 linkEnd'], ['-']],
];

const D = [
  [['-6 half linkStart', '1 extend linkMiddle']],
  [['1 linkEnd'], ['3']],
  [['-5 extend'], ['-6 half']],
  [['-7 half linkStart', '3 linkEnd'], ['-6 half']],
  [['-6 half linkStart', '1 extend linkMiddle']],
  [['1 linkMiddle'], ['- linkMiddle']],
  [['1 linkMiddle'], ['- linkMiddle']],
  [['1 linkEnd'], ['-']],
]

export const sectionStringArray = [
  { key: 'A', sections: A },
  { key: 'B', sections: B },
  { key: 'C', sections: C },
  { key: 'D', sections: D },
];

export const paragraphs = {
  A: ['-5 halfStart', '-6 halfEnd', '1 extend sectionStart', '2 half',
      '3 halfStart extend linkStart sectionStart', '-7 halfEnd quarter linkEnd', '-6 quarterStart linkStart', '-7 quarterEnd linkMiddle halfMiddle', '-5 halfEnd linkEnd',
      '-6 linkStart sectionStart', '- linkMiddle', '-6 linkEnd sectionStart', '1 halfStart', '2 halfEnd',
      '3 extend sectionStart', '5 half',
      '6 halfStart linkStart sectionStart', '1 halfEnd linkEnd', '2 quarterStart linkStart', '3 quarterEnd halfMiddle linkMiddle', '4 halfEnd linkEnd',
      '3 linkStart sectionStart', '- linkMiddle',
      '3 linkEnd sectionStart', '3 halfStart', '5 halfEnd',
      '6 extend sectionStart', '5 half',
      '6 sectionStart', '-6 halfStart', '3 halfEnd',
      '2 extend sectionStart', '1 half',
      '2 sectionStart', '3',
      '-5 extend linkStart sectionStart', '-6 half linkEnd',
      '-7 half linkStart sectionStart', '3 linkEnd', '-6 half',
      '-6 half linkStart sectionStart', '1 extend linkMiddle',
      '1 linkEnd sectionStart', '-',
  ],
  B: [
    '0 halfStart sectionStart', '5 halfEnd', '5 halfStart', '6 halfEnd',
    '+1 half sectionStart', '7', '6 quarterStart linkStart', '5 quarterEnd linkEnd',
    '6 linkStart sectionStart', '- linkMiddle',
    '6 linkEnd sectionStart', '-',
    '0 halfStart sectionStart', '5 halfEnd', '5 halfStart', '6 halfEnd',
    '+1 half sectionStart', '7', '6 quarterStart linkStart', '5 quarterEnd linkEnd',
    '3 linkStart sectionStart', '- linkMiddle',
    '3 linkEnd sectionStart', '-5 halfStart', '-6 halfEnd',
    '1 extend sectionStart', '2 half',
    '3 halfStart linkStart sectionStart', '-7 halfEnd linkMiddle', '-6 quarterStart halfStart linkMiddle', '-7 quarterEnd halfMiddle linkMiddle', '-5 halfEnd linkEnd',
    '-6 linkStart sectionStart', '- linkMiddle',
    '-6 linkEnd sectionStart', '1 halfStart', '2 halfEnd',
    '3 extend sectionStart', '5 half',
    '6 halfStart sectionStart', '1 halfEnd', '2 halfStart quarterStart linkStart', '3 quarterEnd halfMiddle linkEnd', '4 halfEnd',
    '3 linkStart sectionStart', '- linkMiddle',
    '3 linkEnd sectionStart', '3 halfStart linkStart', '5 halfEnd linkEnd',
    '6 extend linkStart sectionStart', '5 half linkEnd',
    '6 sectionStart', '-6 halfStart linkStart', '3 halfEnd linkEnd',
    '2 extend linkStart sectionStart', '1 half linkEnd',
    '2 sectionStart', '3',
    '-5 extend sectionStart', '-6 half',
    '-7 half linkStart sectionStart', '3 linkEnd', '-6 half',
  ],
  C: [
    '-6 half linkStart sectionStart', '1 extend linkMiddle',
    '1 linkEnd sectionStart', '-',
  ],
  D: [
    '-6 half linkStart sectionStart', '1 extend linkMiddle',
    '1 linkEnd sectionStart', '3',
    '-5 extend sectionStart', '-6 half',
    '-7 half linkStart sectionStart', '3 linkEnd', '-6 half',
    '-6 half linkStart sectionStart', '1 extend linkMiddle',
    '1 linkMiddle sectionStart', '- linkMiddle',
    '1 linkMiddle sectionStart', '- linkMiddle',
    '1 linkEnd sectionStart', '-',
  ],
}

// 演奏顺序
export const scorePlayOrder = [
  'music1', 'A', 'B', 'C', 'music2', 'A', 'B', 'C', 'B', 'D',
]
// 间奏时长
export const musicInfo = {
  music1: {
    head: 4,
    foot: 1,
  },
  music2: 8,
}
// 一节拍=多少ms
export const beatTime = 833;
export const beatNumPerSection = 2;
// 伴奏地址
export const accompanyUrl = 'https://res.wx.qq.com/voice/getvoice?mediaid=MzI1MDUxMDQwMV8yMjQ3NTAxMDA0'; 

// 曲子名
export const name = '女儿情';


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
