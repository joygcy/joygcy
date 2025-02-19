import { queryList } from '../../utils/emas/things';

Page({
  data: {
    list: [],
  },
  onLoad() {
    queryList().then((res) => {
      console.log('===== ~ res:', res);
      this.setData({
        list: res,
      });
    });
  },
});
