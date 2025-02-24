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
    // this.setData({
    //   list: [
    //     {
    //       _id: "67b5624d3f1a473be222894a",
    //       "title": "奶茶甜品来一份",
    //       "description": "7天吃一次，吃过抵一顿正餐",
    //       "latestOperationTime": 1739970392039
    //     },
    //     {
    //       _id: "67b6a13409664cc2d439b943",
    //       "title": "给跳跳剃毛",
    //       "description": "暂定2周一次，14天"
    //     }
    //   ],
    // });

    queryList().then((res) => {
      this.setData({
        list: res,
      });
    });
  },
  showCreatePop() {
    this.setData({ visible: true });
  },

  onCreate(e: { detail: { value: any; }; }) {
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
    if(!values.cycleNum) {
      wx.showToast({
        title: '请输入重复周期',
        icon: 'error',
        duration: 2000
      })
      return;
    }

    values.cycleUnit = '天';

    addThing(values).then(() => {
      this.loadData();
      this.setData({ visible: false });
    })
  },
  onJump2Detail(e: any) {
    const item = e.detail;
    wx.navigateTo({
      url: `/pages/things/things-detail/index?info=${JSON.stringify(item)}`,
    });
  },
});
