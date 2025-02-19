import { queryList, updateThing } from '../../utils/emas/things';

Page({
  data: {
    list: [],
  },
  onLoad() {
    this.loadData();
  },
  loadData() {
    queryList().then((res) => {
      console.log('===== ~ res:', res);
      this.setData({
        list: res,
      });
    });
  },
  onUpdateOperationTime(e) {
    const { _id } = e.currentTarget.dataset;
    const newVal = {
      latestOperationTime: new Date().getTime(),
    };
    updateThing(_id, newVal).then((res) => {
      console.log('===== ~ updateThing:', res);
      this.loadData();
    });
  }
});
