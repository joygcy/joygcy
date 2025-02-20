import { OSSUploadHeaders } from './../../../miniprogram_npm/@alicloud/mpserverless-sdk/esm/file/index.d';
// app.js
import MPServerless from '@alicloud/mpserverless-sdk';
// AppID(小程序ID) wx3d216fe141150e70
// AppSecret 1f7a987b75c6c39f75778a5236642a1f

const mpserverless = new MPServerless(wx, {
    appId: 'wx3d216fe141150e70',
    spaceId: 'mp-fe8f06c8-77d5-4109-8b0f-e95b12ee328f',
    clientSecret: '3wBhTC0QaVG2LzjlucJmng==',
    endpoint: 'https://api.next.bspapp.com'
});

mpserverless.user.authorize({
  authProvider: 'wechat_openapi',
});

function handleResponse(res: any) {
  if (res.success) {
    return Promise.resolve(res.result);
  }
  return Promise.reject(res);
}

export async function updateOne(collectionName: string, query: any, newVal:any) {
  const res = await mpserverless.db.collection(collectionName).updateOne(query, {
    $set: newVal
  });
  return handleResponse(res);
}

export async function insertOne(collectionName: string, newVal:any) {
  const res = await mpserverless.db.collection(collectionName).insertOne(newVal);
  console.log('===== ~ insertOne res:', res);
  return handleResponse(res);
}

export async function request(collectionName: string) {
  const res = await mpserverless.db.collection(collectionName).find();
  return handleResponse(res);
}
