import moment from 'moment';
import { request, updateOne, insertOne } from "./index";

moment.locale('zh-cn');

function parseTime(timestamp?: number) {
  if (!timestamp) return '';
  const mo = moment(timestamp);
  return `${mo.format('YYYY-MM-DD')}(${mo.fromNow()})`
}

export const queryList = async () => {
  const data = await request('things');
  return data.map((item: any) => ({
    ...item,
    latestOperationTime: parseTime(item.latestOperationTime),
  }));
}

export const updateThing = async (_id: string, newVal: any) => updateOne('things', { _id }, newVal);

export const addThing = async (newVal: any) => insertOne('things', newVal);
