import { handleOperate, updateThing } from '../../../../utils/emas/things';

Component({
  touchStartX: undefined,
  touchEndX: undefined,
  behaviors: [],
  properties: {
    info: {},
  },
  data: {
    showMenu: false
  },
  lifetimes: {
    created() {

    },
    attached() {

    },
    moved() {

    },
    detached() {

    },
  },
  methods: {
    touchStart: function(e: any) {
      this.touchStartX = e.changedTouches?.[0]?.clientX;
    },
    touchMove: function(e: any) {

    },
    touchEnd: function(e: any) {
      this.touchEndX = e.changedTouches?.[0]?.clientX;
      if (this.touchStartX && this.touchEndX) {
        if (this.touchStartX - this.touchEndX > 200) {
          this.setData({ showMenu: true })
        } else if (this.touchEndX - this.touchStartX > 200) {
          this.setData({ showMenu: false })

        }
      }
    },

    onClick: function() {
      this.triggerEvent('click', this.properties.info)
    },

    onUpdateOperationTime: function() {
      handleOperate(this.properties.info).then((res) => {
        console.log('===== ~onUpdateOperationTime res:', res);
        this.triggerEvent('update');
        this.setData({ showMenu: false });
      });
    },
  },
});