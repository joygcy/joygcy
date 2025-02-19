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

export default async function request(collectionName: string) {
  const res = await mpserverless.db.collection(collectionName).find();
  if (res.success) {
    return Promise.resolve(res.result);
  }
  return Promise.reject(res);
}
