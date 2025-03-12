Page({
  data: {
    list: [
      {
        key: 'record',
        label: '陶笛录音',
        icon: 'music',
        color: "#FFCCCC",
        page: '/pages/record/index',
      },
      {
        key: 'things',
        label: '办事记录',
        icon: 'list',
        color: "#CCFFFF",
        page: '/pages/things/index',
      },
      {
        key: 'schulte-grid',
        label: '舒尔特方格',
        icon: 'component-grid',
        color: "#CCCCFF",
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
