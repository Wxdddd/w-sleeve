/**
 * @auth winn
 * @date 2019/11/9 10:02 PM
 */
import {SkuCode} from "./sku-code";

class Judger {

    fengceGroup
    pathDict = [];//所有路径

    constructor(fengceGroup) {
        this.fengceGroup = fengceGroup;
        this.initPathDict();
    }

    /**
     * 初始化路径字典
     */
    initPathDict() {
        this.fengceGroup.spu.sku_list.forEach(s=>{
            const skuCode = new SkuCode(s.code);
            this.pathDict = this.pathDict.concat(skuCode.totalSegments);
        });
        console.log(this.pathDict);
    }
}

export {
    Judger
}