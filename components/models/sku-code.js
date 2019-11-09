/**
 * @auth winn
 * @date 2019/11/9 10:08 PM
 */
import {combination} from "../../utils/util";

class SkuCode {

    code
    spuId
    totalSegments = []

    constructor(code) {
        this.code = code;
        this._spiltToSegments();
    }

    _spiltToSegments() {
        // 2$1-44#3-9#4-14
        const spuAndSpec = this.code.split("$");
        this.spuId = spuAndSpec[0];

        const specCodeArray = spuAndSpec[1].split("#");
        const length = specCodeArray.length;

        for (let i = 1; i <= length; i++) {
            const segments = combination(specCodeArray, i);//sku规格进行排列组合
            const newSegments = segments.map(seg=>{
                return seg.join("#");
            }) ;
            console.log(newSegments);
            this.totalSegments = this.totalSegments.concat(newSegments)
        }
    }
}

export {
    SkuCode
}