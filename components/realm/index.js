// components/realm/index.js
import {FenceGroup} from "../models/fence-group";
import {Judger} from "../models/judger";

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
        fences: []
    },

    /**
     * 小程序组件生命周期函数
     */
    lifetimes: {},

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
            const judger = new Judger(fenceGroup);
            this.bindInitData(fenceGroup);
        }
    },

    /**
     * 组件的方法列表
     */
    methods: {
        bindInitData(fenceGroup) {
            this.setData({
                fences: fenceGroup.fences
            });
        },

        onCellTap(event) {
            console.log(event);
        }
    }
})
