/**
 * @auth winn
 * @date 2019/12/7 2:17 PM
 */
import {promisic} from "./util";

/**
 * 动态计算窗口高度
 * @returns {Promise<{windowHeight: *, windowWidth: *, screenWidth: *, screenHeight: *}>}
 */
const getSystemSize = async function () {
    const res = await promisic(wx.getSystemInfo)()
    return {
        windowHeight: res.windowHeight,
        windowWidth:res.windowWidth,
        screenWidth: res.screenWidth,
        screenHeight: res.screenHeight,
    }
}

export {
    getSystemSize
}