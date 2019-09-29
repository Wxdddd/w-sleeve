import {config} from "../config/config";
import {promisic} from '../miniprogram_npm/lin-ui/utils/util.js'

class Http {

    /**
     * wx.request promisic封装
     * @param url   地址
     * @param data  参数
     * @param method    请求方式
     * @returns {Promise<void>}
     */
    static async request({url, data, method="GET"}) {
        const res = await promisic(wx.request)({
            url: `${config.apiBaseUrl}${url}`,
            data,
            method,
            header: {
                appkey: config.appKey
            }
        })
        return res.data;
    }
}

export {
    Http
}