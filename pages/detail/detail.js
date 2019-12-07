// pages/detail/detail.js
import {Spu} from "../../models/spu";
import {ShoppingWay} from "../../core/enum";
import {SaleExplain} from "../../models/sale-explain";

Page({

    /**
     * 页面的初始数据
     */
    data: {
        spu: null,
        showRealm: false,
        orderWay: String,
        specs: Object,
        explain: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: async function (options) {
        const pid = options.pid;
        const spu = await Spu.getDetail(pid);
        const explain = await SaleExplain.getFixed();
        this.setData({
            spu,
            explain
        })
    },

    onAddToCart(event) {
        this.setData({
            showRealm: true,
            orderWay: ShoppingWay.CART
        })
    },

    onBuy(event) {
        this.setData({
            showRealm: true,
            orderWay: ShoppingWay.BUY
        })
    },

    onGotoHome(event) {
        wx.switchTab({
            url: "/pages/home/home"
        })
    },

    onGotoCart(event) {
        wx.switchTab({
            url: "/pages/cart/cart"
        })
    },

    onSpecChange(event) {
        this.setData({
            specs:event.detail
        })
    },

})