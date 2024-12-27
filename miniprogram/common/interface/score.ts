export interface IScore {
  key: number;
  note: any, // 0|1|2|3|4|5|6|7 |'-',
  scale?: string; // high bass '' 
  scaleNote?: string; // --：倍低音;-：低音;+：高音;++：倍高音
  extend?: boolean; // 是否显示延长音
  half?: boolean; // 是否半音节
  quarter?: boolean; // 是否四分音节
  linking?: 'start' | 'stop' | 'middle' | false
  sectionStart?: boolean; // 是否一个小节的开始o
}
// 拍
type IBeat = IScore[];
// 小节
export type ISection = IBeat[];

// 间奏格式number表示占用几拍
export type IMusic = {
  head?: number;
  middle?: number;
  foot?: number;
} | number;