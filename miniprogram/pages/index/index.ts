Page({
  data: {
    list: [
      {
        key: 'record',
        label: '陶笛录音',
        page: '/pages/record/index',
      },
      {
        key: 'things',
        label: '办事记录',
        page: '/pages/things/index',
      },
      {
        key: 'schulte-grid',
        label: '舒尔特方格',
        page: '/pages/schulte-grid/index',
      }
    ],
  },
  onLoad() {},
  onJumpTo(e: WechatMiniprogram.TouchEvent) {
    const { page } = e.currentTarget.dataset as { page: string };
    wx.navigateTo({
      url: page,
    });
  }
});
