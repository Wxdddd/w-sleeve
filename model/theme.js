// 主题

import {Http} from "../utils/http";
import {config} from "../config/config";

class Theme {

    themes = []

    /**
     * 获取首页E
     * @returns {Promise<*>}
     */
    getHomeLocationE() {
        return this.themes.find(t => t.name === `${config.home.locationE}`)
    }

    /**
     * 获取首页顶部图片
     * @returns {Promise<void>}
     */
    getHomeLocationA() {
        return this.themes.find(t => t.name === `${config.home.locationA}`)
    }

    /**
     * 根据names 获取所有主题
     * @returns {Promise<void>}
     */
    async getAllThemes() {
        const names = `${config.home.locationA},${config.home.locationE},${config.home.locationF},${config.home.locationH}`
        this.themes = await Http.request({
            url: `theme/by/names`,
            data: {
                names
            }
        })
    }

    static getHomeLocationESpu() {
         return Theme.getThemeSpuByName(`${config.home.locationE}`);
    }

    static getThemeSpuByName(name) {
        return this.themes = Http.request({
        url: `theme/name/${name}/with_spu`,
      })
    }
}

// 导出
export {
    Theme
}