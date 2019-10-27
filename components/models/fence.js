/**
 * @auth winn
 * @date 2019/10/27 1:14 PM
 */

class Fence {

  specs;
  valueTitles = [];

  constructor(specs) {
    this.specs = specs;
  }

  init() {
    const fence = [];
    this.specs.forEach(p => {
      this.pushValueTitle(p.value);
    })
  }

  pushValueTitle(title) {
    this.valueTitles.push(title);
  }

}

export {
  Fence
}