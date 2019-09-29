// 主题

import {Http} from "../utils/http";
import {config} from "../config/config";

class Theme {

    /**
     * 获取首页顶部图片
     * @returns {Promise<void>}
     */
    static async getHomeLocationA() {
        return await Http.request({
            url: `theme/by/names`,
            data: {
                name: config.home.locationA
            }
        });
    }
}

// 导出
export {
    Theme
}