import {Cell} from "./cell";
import {Joiner} from "../../utils/joiner";

/**
 * 已选中cell
 * @auth winn
 * @date 2019/11/10 12:00 PM
 */
class SkuPending {
    pending = [];
    size;

    constructor(size) {
        this.size = size;
    }

    init(sku) {
        for (let i = 0; i < sku.specs.length; i++) {
            const cell = new Cell(sku.specs[i]);
            this.insertCell(cell, i);
        }
    }

    /**
     * 获取已选规格值
     */
    getCurrentSpecValues() {
        const values = this.pending.map(cell => {
            return cell ? cell.spec.value : null;
        })
        return values;
    }

    /**
     * 获取未选规格名序号
     */
    getMissingSpecKeysIndex() {
        const keysIndex = [];
        for (let i = 0; i <this.size; i++) {
            if (!this.pending[i]) {
                keysIndex.push(i);
            }
        }
        return keysIndex;
    }

    getSkuCode() {
        const joiner = new Joiner("#");
        this.pending.forEach(cell => {
            const cellCode = cell.getCellCode();
            joiner.join(cellCode);
        })
        return joiner.getStr();
    }

    /**
     * 是否选中完整的sku
     */
    isIntact() {
        if (this.size !== this.pending.length) {
            return false;
        }
        for (let i = 0; i < this.size; i++) {
            if (this._isEmptyPart(i)) {
                return false;
            }
        }
        return true;
    }

    _isEmptyPart(index) {
        return !this.pending[index];
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