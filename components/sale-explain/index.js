// components/sale-explain/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        texts: Array
    },

    /**
     * 组件的初始数据
     */
    data: {
        _texts: Array
    },

    observers:{
        'texts': function (texts) {
            console.log("1111")
            // 这里不要直接setData texts 会导致死循环内存泄漏
            this.setData({
                _texts: texts
            })
        }
    },

    /**
     * 组件的方法列表
     */
    methods: {

    }
})
