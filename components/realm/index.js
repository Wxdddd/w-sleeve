// components/realm/index.js
import {FenceGroup} from "../models/fence-group";

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    spu: Object
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 小程序组件生命周期函数
   */
  lifetimes: {

  },

  /**
   * 监听器
   */
  observers: {
    'spu': function (spu) {
      if (!spu) {
        return;
      }
      const fenceGroup = new FenceGroup(spu);
      fenceGroup.initFences();
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
