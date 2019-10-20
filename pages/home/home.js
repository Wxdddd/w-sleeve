// pages/home/home.js
// 引入config
import {Theme} from "../../model/theme";
import {Banner} from "../../model/banner";
import {Category} from "../../model/category";
import {Activity} from "../../model/activity";

Page({

    /**
     * 页面的初始数据
     */
    data: {
        themeA: null,
        themeE: null,
        themeESpu: [],
        bannerB: null,
        grid: [],
        activityD: null,
        themeAWidth: 0,
        themeAHeigth: 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: async function (options) {
        this.initAllData();
    },

    async initAllData() {
        const theme = new Theme();
        await theme.getAllThemes();
        const themeA = await theme.getHomeLocationA();
        const themeE = await theme.getHomeLocationE();
        let themeESpu = [];
        if (themeE.online) {
          const data = await Theme.getHomeLocationESpu();
          if (data) {
            themeESpu = data.spu_list.slice(0,8)
          }
        }
        console.log(themeESpu)
        const bannerB = await Banner.getHomeLocationB();
        const grid = await Category.getHomeLocationC();
        const activityD = await Activity.getHomeLocationD();

        this.setData({
            themeA,
            themeE,
            themeESpu,
            bannerB,
            grid,
            activityD
        });
    },

    /**
     * 重设图片高度
     * @param event
     */
    ithemeALoad(event) {
        //var width = event.detail.width;
        var height = event.detail.height;
        this.setData({
          // themeAWidth: width,
          themeAHeigth: height
        })

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})