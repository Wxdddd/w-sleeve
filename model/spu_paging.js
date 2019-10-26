import {Paging} from "../utils/Paging";
import {Http} from "../utils/http";

class SpuPaging {

  static getLatestPaging() {
    return new Paging({
      url: `spu/latest`
    },3)
  }

}

export {
  SpuPaging
}