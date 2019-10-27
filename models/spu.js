/**
 * @auth winn
 * @date 2019/10/27 1:20 PM
 */
import {Http} from "../utils/http";

class Spu {

  static getDetail(id) {
    return Http.request({
      url: `spu/id/${id}/detail`
    })

  }
}

export {
  Spu
}