/**
 * @auth winn
 * @date 2019/10/27 1:14 PM
 */
import {Martix} from "martix";
import {Fence} from "./fence";

class FenceGroup {

    spu;
    skuList = [];
    fences = [];

    /**
     * 构造器
     * @param spu
     */
    constructor(spu) {

        this.spu = spu;
        this.skuList = spu.sku_list;
    }

    /**
     * 获取默认sku
     */
    getDefaultSku() {
        const defaultSkuId = this.spu.default_sku_id;
        if (!defaultSkuId) {
            return;
        }
        return this.skuList.find(s => s.id === defaultSkuId);
    }

    /**
     * 通过规格id改变规格状态
     * @param cellId
     * @param status
     */
    setCellStatusById(cellId, status) {
        this.eachCell((cell) => {
            if (cell.id === cellId) {
                cell.status = status;
            }
        });
    }

    /**
     * 通过行列号改变规格状态
     * @param x
     * @param y
     * @param status
     */
    setCellStatusByXY(x, y, status) {
        this.fences[x].cells[y].status = status;
    }

    /**
     * matrix 数组 实例并不是真正的格式
     * 金属灰 七龙珠 小号S
     * 青芒色 灌篮高手 中号M
     * 青芒色 圣斗士 大号L
     * 橘黄色 七龙珠 小号S
     */
    initFences1() {
        const matrix = this._createMatrix(this.skuList);
        const fences = [];
        let currentJ = -1;  //当前列号
        matrix.forEach((element, i, j) => {
            if (currentJ !== j) {  // 如果当前列号不等于j
                currentJ = j;
                // new一个新的Fence 并使fences[currentJ]赋值为一个新的fence对象
                fences[currentJ] = this._createFeance();
            }
            // 将当前规格值push到fence对象
            fences[currentJ].pushValueTitle(element.value);
        });
    }

    /**
     * 矩阵转置方式
     */
    initFences() {
        const matrix = this._createMatrix(this.skuList);
        const fences = [];
        const AT = matrix.transpose();
        AT.forEach(r => {
            const fence = new Fence(r);
            fence.init();
            fences.push(fence);
        });
        this.fences = fences;
    }

    eachCell(cb) {
        for (let i = 0; i < this.fences.length; i++) {
            for (let j = 0; j < this.fences[i].cells.length; j++) {
                const cell = this.fences[i].cells[j];
                cb(cell, i, j);
            }
        }
    }

    /**
     * 创建fence对象
     * @param element
     * @returns {Fence}
     * @private
     */
    _createFeance() {
        const fence = new Fence();
        return fence;
    }

    /**
     * 获取规格值数组矩阵对象
     * @param skuList
     * @returns {Martix}
     * @private
     */
    _createMatrix(skuList) {
        const m = [];
        skuList.forEach(sku => {
            m.push(sku.specs);
        });
        return new Martix(m);
    }
}

export {
    FenceGroup
}