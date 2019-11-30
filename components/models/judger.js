/**
 * @auth winn
 * @date 2019/11/9 10:02 PM
 */
import {SkuCode} from "./sku-code";
import {CellStatus} from "../../core/enum";
import {SkuPending} from "./sku-pending";
import {Joiner} from "../../utils/joiner";
import {FenceGroup} from "./fence-group";

class Judger {

    fenceGroup;
    pathDict = [];//所有路径
    SkuPending;

    constructor(fenceGroup) {
        this.fenceGroup = fenceGroup;
        this._initPathDict();
        this._initSkuPending();
    }

    /**
     * 初始化路径字典
     */
    _initPathDict() {
        this.fenceGroup.spu.sku_list.forEach(s => {
            const skuCode = new SkuCode(s.code);
            this.pathDict = this.pathDict.concat(skuCode.totalSegments);
        });
    }

    _initSkuPending() {
        const specaLength = this.fenceGroup.fences.length;
        this.SkuPending = new SkuPending(specaLength);
        // 获取默认sku
        const defaultSku = this.fenceGroup.getDefaultSku();
        if (!defaultSku) {
            return;
        }
        // 初始化默认选中的规格
        this.SkuPending.init(defaultSku);
        this._initDefaultSelectedCell();
        // 更改其他规格的状态
        this.judge(null, null, null, true);
    }

    isSkuIntact() {
        console.log( this.SkuPending.isIntact())
        return this.SkuPending.isIntact();
    }

    /**
     * 初始化默认规格状态
     * @param sku
     * @private
     */
    _initDefaultSelectedCell() {
        this.SkuPending.pending.forEach(cell => {
            this.fenceGroup.setCellStatusById(cell.id, CellStatus.SELECTED);
        });
    }

    judge(cell, x, y, isInit = false) {
        if (!isInit) {
            this._changeCurrentCellStatus(cell, x, y);
        }
        // 处理其他cell 遍历所有cell（规格） 再遍历fence（每一行）
        this.fenceGroup.eachCell((cell, x, y) => {
            if (this.SkuPending.isSelected(cell, x)) { //不处理已选中的cell
                return;
            }
            const path = this._findPotentialPath(cell, x, y);
            const isIn = this._isInDict(path);
            if (isIn) {
                this.fenceGroup.setCellStatusByXY(x, y, CellStatus.WAITING);
            } else {
                this.fenceGroup.setCellStatusByXY(x, y, CellStatus.FORBIDDEN);
            }
        });
    }

    _isInDict(path) {
        return this.pathDict.includes(path);
    }

    /**
     * 查找潜在路径
     * @private
     */
    _findPotentialPath(cell, x, y) {
        const joiner = new Joiner("#");
        for (let i = 0; i < this.fenceGroup.fences.length; i++) {
            const selected = this.SkuPending.findSelectedCellByX(i); //当前行是否有选中的
            if (x === i) { //当前行 直接添加
                const cellCode = this._getCellCode(cell.spec);
                joiner.join(cellCode);
            } else { //非当前行 加入选中行已选中的
                if (selected) {
                    const selectedCellCode = this._getCellCode(selected.spec);
                    joiner.join(selectedCellCode);
                }
            }
        }
        return joiner.getStr();
    }

    _getCellCode(spec) {
        return `${spec.key_id}-${spec.value_id}`;
    }

    /**
     * 处理当前选中cell
     * @param cell
     * @param x
     * @param y
     * @private
     */
    _changeCurrentCellStatus(cell, x, y) {
        if (cell.status === CellStatus.WAITING) {
            this.fenceGroup.setCellStatusByXY(x, y, CellStatus.SELECTED);
            this.SkuPending.insertCell(cell, x);
        }
        if (cell.status === CellStatus.SELECTED) {
            this.fenceGroup.setCellStatusByXY(x, y, CellStatus.WAITING);
            this.SkuPending.removeCell(x);
        }
    }
}

export {
    Judger
}