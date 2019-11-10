/**
 * 已选中cell
 * @auth winn
 * @date 2019/11/10 12:00 PM
 */

class SkuPending {
    pending = [];

    constructor() {

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