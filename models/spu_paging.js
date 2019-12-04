import {Paging} from "../utils/paging";
import {Http} from "../utils/http";

class SpuPaging {

  static getLatestPaging() {
    return new Paging({
      url: `spu/latest`
    },5)
  }

}

export {
  SpuPaging
}