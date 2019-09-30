import {Http} from "../utils/http";

class Category {

    /**
     * 获取宫格
     * @returns {Promise<*>}
     */
    static async getHomeLocationC() {
        return await Http.request({
            url: "category/grid/all",
            data:{

            },
            method: "GET"
        })
    }

}

export {
    Category
}