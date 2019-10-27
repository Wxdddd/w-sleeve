import {Http} from "../utils/http";
import {config} from "../config/config";

class Banner {

  static async getHomeLocationB() {
    return await Http.request({
      url: `banner/name/${config.home.locationB}`,
      data: {}
    })
  }

  static async getHomeLocationG() {
    return await Http.request({
      url: `banner/name/${config.home.locationG}`,
      data: {}
    })
  }
}

export {
  Banner
}