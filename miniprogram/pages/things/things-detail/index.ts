import { updateThing } from '../../../utils/emas/things';

Page({
  data: {
    today: new Date().getTime(),
    dataSource: {} as any,
    pickerVisible: false,
  },
  onLoad(opt: {
    info: string;
  }) {
    console.log('===== ~ opt.info:', opt.info);
    try {
      this.setData({ dataSource: JSON.parse(opt.info) });
    } catch (error) {
      
    }
  },
  showPicker(e: WechatMiniprogram.TapEvent) {
    this.setData({
      mode: 'date',
      pickerVisible: true,
    });
  },
  onConfirm(e: any) {
    const { value } = e.detail;
    console.log('===== ~ value:', value);
    const dataSource = this.data.dataSource;
    const newVal = {
      latestOperationTime: new Date(value).getTime(),
    };
    updateThing(dataSource._id, newVal).then(() => {
      this.setData({dataSource: {
        ...dataSource,
        ...newVal,
      }});
    });
  },
});
