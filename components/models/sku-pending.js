/**
 * 已选中cell
 * @auth winn
 * @date 2019/11/10 12:00 PM
 */
import {Cell} from "./cell";

class SkuPending {
    pending = [];

    constructor() {

    }

    init(sku) {
        for (let i = 0; i < sku.specs.length; i++) {
            const cell = new Cell(sku.specs[i]);
            this.insertCell(cell, i);
        }
    }

    // x 行号 不能重复
    insertCell(cell, x) {
        this.pending[x] = cell;
    }

    removeCell(x) {
        this.pending[x] = null;
    }

    /**
     * 查找某一行已选中的元素
     */
    findSelectedCellByX(x) {
        return this.pending[x];
    }

    isSelected(cell, x) {
        const pendingCell = this.pending[x]; //选中的cell
        if (!pendingCell) {
            return false;
        }
        return cell.id === pendingCell.id;
    }
}

export {
    SkuPending
}