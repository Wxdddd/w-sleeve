// components/hot-list/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    banner: Object
  },

  /**
   * 属性监听器
   */
  observers: {
    // 可监听多个属性
    // 'banner, theme': function (banner, theme) {
    //
    // }
    'banner': function (banner) {
      if (!banner) {
        return;
      }
      if (banner.items.length === 0) {
        return;
      }
      const left = banner.items.find(b => b.name === 'left');
      const rightTop = banner.items.find(b => b.name === 'right-top');
      const rightBottom = banner.items.find(b => b.name === 'right-bottom');
      this.setData({
        left,
        rightTop,
        rightBottom
      });
    }
  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {}
})
