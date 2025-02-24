import moment from 'moment';
import { request, updateOne, insertOne } from "./index";

moment.locale('zh-cn');

function parseTime(timestamp?: number) {
  if (!timestamp) return '';
  const mo = moment(timestamp);
  return `${mo.format('YYYY-MM-DD')}(${mo.fromNow()})`
}

export const queryList = async () => {
  const data = await request('things', {}, {
    sort: {
      nextOperateTime: 1,
    }
  });
  return data.map((item: any) => ({
    ...item,
    latestOperationTime: parseTime(item.latestOperationTime),
    cycleDesc: `${item.cycleNum} ${item.cycleUnit}`
  }));
}

export const updateThing = async (_id: string, newVal: any) => updateOne('things', { _id }, newVal);

export const addThing = async (newVal: any) => insertOne('things', newVal);

export async function handleOperate(info, newInfo) {
  if (!info || !info._id) {
    return Promise.reject(new Error('入参不正确'));
  }
  const now = Date.now();
  const { cycleNum = 0, _id } = info;
  const nextOperateTime = now + cycleNum*24*60*60*100;
  const newVal = {
    latestOperationTime: now,
    nextOperateTime,
    ...newInfo,
  };
  try {
    await updateThing(_id, newVal);
    return Promise.resolve({
      ...info,
      ...newVal
    })
  } catch (error) {
    return Promise.reject(error)
  }
}