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
                names: config.home.locationA
            }
        });
    }

    /**
     * 根据names 获取所有主题
     * @returns {Promise<void>}
     */
    static async getAllThemes() {
        const names = `${config.home.locationA},${config.home.locationE},${config.home.locationF},${config.home.locationH}`
        return await Http.request({
            url: `theme/by/names`,
            data: {
                names
            }
        })
    }
}

// 导出
export {
    Theme
}