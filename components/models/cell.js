/**
 * @auth winn
 * @date 2019/10/27 4:39 PM
 */

class Cell {

  title;
  id;

  constructor(spec) {
    this.title = spec.value;
    this.id = spec.value_id;
  }
}

export {
  Cell
}

