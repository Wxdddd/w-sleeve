/**
 * @auth winn
 * @date 2019/10/27 1:20 PM
 */
import {Http} from "../utils/http";

class Spu {

    /**
     * 判断spu是否有规格
     * @param spu
     * @returns {boolean}
     */
    static isNoSpec(spu) {
        if (spu.sku_list.length === 1 && spu.sku_list[0].specs.length === 0) {
            return true;
        }
        return false;
    }

    static getDetail(id) {
        return Http.request({
            url: `spu/id/${id}/detail`
        })

    }
}

export {
    Spu
}