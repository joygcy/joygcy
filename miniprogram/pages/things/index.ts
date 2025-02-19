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
      if (this.touchStartX - this.touchEndX > 200) {
        this.setData({ showMenuId: id })
      } else if (this.touchEndX - this.touchStartX > 200) {
        this.setData({ showMenuId: '' })

      }
    }
  },
  onUpdateOperationTime(e) {
    const { id } = e.currentTarget.dataset;
    const newVal = {
      latestOperationTime: new Date().getTime(),
    };
    updateThing(id, newVal).then((res) => {
      this.loadData();
    });
  }
});
