// components/cell/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        cell: Object,
        x: Number,   //行号
        y: Number    //列号
    },

    /**
     * 组件的初始数据
     */
    data: {},

    /**
     * 组件的方法列表
     */
    methods: {
        onTap(event) {
            /**
             * 向父组件(事件冒泡，fence不捕捉直接传递到realm中)传递数据
             * celltap 传递事件名称
             * detail 传递的数据
             * options 跨组件传递需要开启的属性
             */
            this.triggerEvent("celltap", {
                cell: this.properties.cell,
                x: this.properties.x,
                y: this.properties.y
            }, {
                bubbles: true, //开启事件冒泡
                composed: true  //跨越组件的边界
            });
        }
    }
})