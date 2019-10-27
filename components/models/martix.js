/**
 * 矩阵函数库
 * @auth winn
 * @date 2019/10/27 2:22 PM
 */

class Martix {

  m

  constructor(martix) {
    this.m = martix;
  }

  /**
   * 获取当前矩阵的行数
   * @returns {*}
   */
  get rowsNum() {
    return this.m.length;
  }

  /**
   * 获取当前矩阵的列数
   * @returns {*}
   */
  get colsNum() {
    return this.m[0].length;
  }

  /**
   * 矩阵遍历
   * @param cb 回调函数
   */
  forEach(cb) {
    for (let j=0; j<this.colsNum; j++){
      for (let i=0; i<this.rowsNum; i++){
        const  element = this.m[i][j];
        cb(element, i, j);
      } //i 行
    } //j 列
  }

  /**
   * 矩阵转置
   * @returns {Array}
   */
  transpose() {
    const desArr = [];
    for (let j=0; j<this.colsNum; j++){
      desArr[j] = [];
      for (let i=0; i<this.rowsNum; i++){
        desArr[j].push(this.m[i][j]);
      }
    }
    return desArr;
  }
}

export {
  Martix
}