/**
 * @auth winn
 * @date 2019/10/27 1:14 PM
 */
import {Cell} from "./cell";

class Fence {

    cells = []; //一组规格值
    specs;
    title; //规格名名字
    id; //规格名id

    constructor(specs) {
        this.specs = specs;
        this.title = specs[0].key;
        this.id = specs[0].key_id;
    }

    init() {
        this._initCells();
    }

    _initCells() {
        // some 与 every 都会循环这个数组
        // some 只要求这个数组下面的某一个元素符合这个表达式就会立即返回true
        // every 要求这个数组下面所有元素全部都符合这个表达式才会返回true 否则返回false
        this.specs.forEach(p => {
            const existed = this.cells.some(c => {
                return c.id === p.value_id;
            })
            if (existed) {
                return;
            }
            const cell = new Cell(p);
            this.cells.push(cell);
        })
    }

    /**
     * 可视规格赋值
     * @param skuList
     */
    setFenceSketch(skuList) {
        this.cells.forEach(c=>{
            this._setCellSkuImg(c, skuList)
        })
    }

    _setCellSkuImg(cell, skuList) {
        const specCode = cell.getCellCode();
        const matchedSku = skuList.find(s=>s.code.includes(specCode));
        if(matchedSku){
            cell.skuImg = matchedSku.img
        }
    }

}

export {
    Fence
}