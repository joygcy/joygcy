Page({
  onReady: function () {
    const myCanvas = wx.createSelectorQuery().in(this).select('#myCanvas');
    console.log('===== ~  myCanvas：', myCanvas);
    const createPath2D = myCanvas.createPath2D();
    console.log('===== ~  createPath2D：', createPath2D);
    
  }
});

