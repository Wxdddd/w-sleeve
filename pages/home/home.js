// pages/home/home.js
// 引入config
import {Theme} from "../../model/theme";
import {Banner} from "../../model/banner";
import {Category} from "../../model/category";
import {Activity} from "../../model/activity";
import {SpuPaging} from "../../model/spu_paging";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    themeA: null,
    themeE: null,
    themeF: null,
    themeH: null,
    themeESpu: [],
    bannerB: null,
    bannerG: null,
    grid: [],
    activityD: null,
    supPaging: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    this.initAllData();
    this.initBottomSpuList();
  },

  async initAllData() {
    const theme = new Theme();
    await theme.getAllThemes();
    const themeA = theme.getHomeLocationA();
    const themeE = theme.getHomeLocationE();
    const themeF = theme.getHomeLocationF();
    const themeH = theme.getHomeLocationH();
    let themeESpu = [];
    if (themeE.online) {
      const data = await Theme.getHomeLocationESpu();
      if (data) {
        themeESpu = data.spu_list.slice(0, 8)
      }
    }
    const bannerB = await Banner.getHomeLocationB();
    const bannerG = await Banner.getHomeLocationG();
    const grid = await Category.getHomeLocationC();
    const activityD = await Activity.getHomeLocationD();

    this.setData({
      themeA,
      themeE,
      themeF,
      themeH,
      themeESpu,
      bannerB,
      bannerG,
      grid,
      activityD
    });
  },

  async initBottomSpuList() {
    const paging = SpuPaging.getLatestPaging();
    this.data.supPaging = paging;
    const data = await paging.getMoreData();
    if (!data) {
      return;
    }
    // data 数组, refresh 清空元素, success 返回成功
    wx.lin.renderWaterFlow(data.items)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: async function () {
    const data = await this.data.supPaging.getMoreData();
    if (!data) {
      return
    }
    wx.lin.renderWaterFlow(data.items)
  },

  /**
   * 重设图片高度
   * @param event
   */
  ithemeALoad(event) {
    //var width = event.detail.width;
    var height = event.detail.height;
    // 保持比例 width/height = 340/h
    this.setData({
      // themeAWidth: width,
      themeAHeigth: height
    })

  },

})