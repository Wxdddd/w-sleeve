/**
 * @auth winn
 * @date 2019/10/27 1:14 PM
 */
import {Martix} from "martix";
import {Fence} from "./fence";

class FenceGroup {

  spu;
  skuList = [];

  /**
   * 构造器
   * @param spu
   */
  constructor(spu) {

    this.spu = spu;
    this.skuList = spu.sku_list;
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

    console.log(fences)
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
    })
    console.log(fences)
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
    })
    return new Martix(m);
  }
}
export {
  FenceGroup
}