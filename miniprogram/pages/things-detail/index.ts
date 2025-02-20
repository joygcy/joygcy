Page({
  data: {
    dataSource: {},
  },
  onLoad(opt: {
    info: string;
  }) {
    try {
      const dataSource = JSON.parse(opt.info);
      this.setData({ dataSource });
    } catch (error) {
      
    }
  },
  onJumpTo(e: WechatMiniprogram.TouchEvent) {
    const { page } = e.currentTarget.dataset as { page: string };
    wx.navigateTo({
      url: page,
    });
  }
});
