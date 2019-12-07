import {getSystemSize} from "../../utils/system";
import {px2rpx} from "../../miniprogram_npm/lin-ui/utils/util";

Page({

    /**
     * 页面的初始数据
     */
    data: {},

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: async function (options) {
        const res = await getSystemSize();
        const windowHeightRpx = px2rpx(res.windowHeight);
        const h = windowHeightRpx - 60 - 20 - 2
        this.setData({
            segHeight:h
        })
    },

    onGotoSearch() {
        wx.navigateTo({
            url: `/pages/search/search`
        })
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})