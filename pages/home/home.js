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

        // let that = this;
        // wx.request({
        //     url: `${config.apiBaseUrl}theme/by/names`,
        //     method: "GET",
        //     data: {
        //       names: "t-1"
        //     },
        //     header: {
        //       "appKey": config.appKey
        //     },
        //     success: res=> {
        //       this .setData({
        //           topTheme: res.data[0]
        //       });
        //     }
        // })
    },

    async initAllData() {
        const themes = await Theme.getAllThemes();
        console.log(themes)
        const themeA = themes.find(t=>t.name === "t-1");
        const themeE = themes.find(t=>t.name === "t-2");

        //const themeA = await Theme.getHomeLocationA();
        const bannerB = await Banner.getHomeLocationB();
        const grid = await Category.getHomeLocationC();
        const activity = await Activity.getHomeLocationD();
        //themeA[0].entrance_img = "/images/3.jpg"

        this.setData({
            themeA: themeA,
            bannerB: bannerB,
            grid: grid,
            activityD: activity
        });
    },

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