import { queryList, updateThing, addThing } from '../../utils/emas/things';

Page({
  touchStartX: undefined,
  touchEndX: undefined,
  data: {
    list: [],
    showMenuId: '',
    visible: false,
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
  showCreatePop() {
    this.setData({ visible: true });
  },
  touchStart(e: any) {
    this.touchStartX = e.changedTouches?.[0]?.clientX;
  },
  touchMove(e: any) {

  },
  touchEnd(e: any) {
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
  onUpdateOperationTime(e: WechatMiniprogram.TapEvent) {
    const { id } = e.currentTarget.dataset;
    const newVal = {
      latestOperationTime: new Date().getTime(),
    };
    updateThing(id, newVal).then(() => {
      this.loadData();
    });
  },
  onCreate(e: { detail: { value: any; }; }) {
    console.log('===== ~ e:', e);
    const values = e.detail.value;

    // 非空判断
    if(!values.title) {
      wx.showToast({
        title: '请输入事项标题',
        icon: 'error',
        duration: 2000
      })
      return;
    }
    if(!values.description) {
      wx.showToast({
        title: '请输入事项描述',
        icon: 'error',
        duration: 2000
      })
      return;
    }

    addThing(values).then(() => {
      this.loadData();
      this.setData({ visible: false });
    })
  },
});
