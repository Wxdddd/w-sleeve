/**
 * @auth winn
 * @date 2019/10/27 4:39 PM
 */
import {CellStatus} from "../../core/enum";

class Cell {

    title;
    id;
    status = CellStatus.WAITING

    constructor(spec) {
        this.title = spec.value;
        this.id = spec.value_id;
    }
}

export {
    Cell
}

