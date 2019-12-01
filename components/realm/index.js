// components/realm/index.js
import {FenceGroup} from "../models/fence-group";
import {Judger} from "../models/judger";
import {Spu} from "../../models/spu";
import {Cell} from "../models/cell";

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
        fences: [],
        judger: Object,
        previewImage: String,
        title: String,
        price: null,
        discountPrice: null,
        stock: null,
        noSpec: false,
        skuIntact: true,
        currentValues: [],
        missingKeys: []
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
            // 无规格判断
            if (Spu.isNoSpec(spu)) {
                this.processNoSpec(spu);
            } else {
                this.processHasSpec(spu);
            }
        }
    },

    /**
     * 组件的方法列表
     */
    methods: {

        processNoSpec(spu) {
            this.setData({
                noSpec: true,
            });
            this.bindSkuData(spu.sku_list[0]);
        },

        processHasSpec(spu) {
            const fenceGroup = new FenceGroup(spu);
            fenceGroup.initFences();
            const judger = new Judger(fenceGroup);
            this.data.judger = judger;
            const defaultSku = fenceGroup.getDefaultSku();
            if (defaultSku) {
                this.bindSkuData(defaultSku);
            } else {
                this.bindSpuData(spu);
            }
            this.bindTipData();
            this.bindFenceGroupData(fenceGroup);
        },

        bindSpuData(spu) {
            this.setData({
                previewImage: spu.img,
                title: spu.title,
                price: spu.price,
                discountPrice: spu.discount_price
            });
        },

        bindSkuData(sku) {
            this.setData({
                previewImage: sku.img,
                title: sku.title,
                price: sku.price,
                discountPrice: sku.discount_price,
                stock: sku.stock
            });
        },

        bindTipData() {
            this.setData({
                skuIntact: this.data.judger.isSkuIntact(),
                currentValues: this.data.judger.getCurrentValues(),
                missingKeys: this.data.judger.getMissingKeys()
            })
        },

        bindFenceGroupData(fenceGroup) {
            this.setData({
                fences: fenceGroup.fences
            });
        },

        onCellTap(event) {
            const data = event.detail.cell;
            const x = event.detail.x;
            const y = event.detail.y;

            const cell = new Cell(data.spec);
            cell.status = data.status;

            const judger = this.data.judger;
            judger.judge(cell, x, y);
            const isSkuIntact = judger.isSkuIntact();
            if (isSkuIntact) {
                const currentSku = judger.getDeterminateSku();
                this.bindSkuData(currentSku);
            }
            this.bindTipData();
            this.bindFenceGroupData(judger.fenceGroup);
        }
    }
})
