/**
 * @auth winn
 * @date 2019/12/7 2:17 PM
 */
import {promisic} from "./util";
import {px2rpx} from "../miniprogram_npm/lin-ui/utils/util";

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

const getWindowHeight = async function() {
    const res = await getSystemSize();
    return px2rpx(res.windowHeight);
}

export {
    getSystemSize,
    getWindowHeight
}