import {Http} from "../utils/http";
import {config} from "../config/config";

class Activity{

    /**
     * 首页获取活动（不包含优惠券数据）
     * @returns {Promise<void>}
     */
    static async getHomeLocationD(){
        return await Http.request({
            url: `activity/name/${config.home.locationC}`,
            data: {}
        })
    }
}

export{
    Activity
}