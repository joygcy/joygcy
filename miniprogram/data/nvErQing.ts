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
  'music1', 'A', 'B', 'C', 'music1', 'A', 'B', 'C', 'B', 'D',
]
// 间奏时长
export const musicInfo = {
  music1: [
    '0 sectionStart', '0',
    '0 sectionStart', '0',
    '0 sectionStart', '0',
    '0 sectionStart', '0',
    '0 sectionStart', '0',
    '0 sectionStart', '0',
    '0 sectionStart', '0',
    '0 sectionStart', '0',
    '0 sectionStart', '0',
    '0 sectionStart', '0',
    '0 sectionStart', '0',
    '0 sectionStart', '0',
    '0 sectionStart', '0',
    '0 sectionStart', '0',
    '0 sectionStart', '0',
    '0 sectionStart', '0',
    '0 sectionStart', '0',
    '0 sectionStart', '0',
    '0 sectionStart',
  ],
  music2: [
    '0 sectionStart', '0',
    '0 sectionStart', '0',
    '0 sectionStart', '0',
    '0 sectionStart', '0',
    '0 sectionStart', '0',
    '0 sectionStart', '0',
    '0 sectionStart', '0',
    '0 sectionStart', '0',
    '0 sectionStart', '0',
    '0 sectionStart', '0',
    '0 sectionStart', '0',
    '0 sectionStart', '0',
    '0 sectionStart', '0',
    '0 sectionStart', '0',
    '0 sectionStart', '0',
    '0 sectionStart',
  ],
}
// 一节拍=多少ms
export const beatTime = 60 * 1000 / 72;
export const beatNumPerSection = 2;
// 伴奏地址
export const accompanyUrl = 'https://res.wx.qq.com/voice/getvoice?mediaid=MzI1MDUxMDQwMV8yMjQ3NTAxMDA0'; 
// 曲子名
export const name = '女儿情';
export const finterWidth = 72; // 指法宽度，太宽了走太快看不清曲谱，太窄了4分音符装不下