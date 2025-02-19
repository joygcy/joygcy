import { queryList, updateThing } from '../../utils/emas/things';

Page({
  data: {
    list: [],
    showMenuId: '',
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
  touchStart(e) {
    this.touchStartX = e.changedTouches?.[0]?.clientX;
  },
  touchMove(e) {

  },
  touchEnd(e) {
    const { id } = e.currentTarget.dataset;
    this.touchEndX = e.changedTouches?.[0]?.clientX;
    if (this.touchStartX && this.touchEndX) {
      console.log('===== ~ touchEnd:', e);
      if (this.touchStartX - this.touchEndX > 200) {
        this.setData({ showMenuId: id })
      } else if (this.touchEndX - this.touchStartX > 200) {
        this.setData({ showMenuId: '' })

      }
    }
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
