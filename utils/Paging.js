import {Http} from "./http";

class Paging {

  start;
  count;
  req;
  locker = false;
  url;
  moreData = true;
  accumulator = [];



  /**
   *
   * @param req 请求 url?data=data等
   * @param start 从第几条开始
   * @param count 每页条数
   */
  constructor(req, count=10, start=0) {
    this.start = start;
    this.count = count;
    this.req = req;
    this.url = req.url;
  }

  /**
   * 获取数据
   */
  async getMoreData() {
    // getLocker
    // request
    // releseLocker

    if (!this.moreData) { //判断是否有更多数据
      return;
    }
    if (!this._getLocker()) {
      return;
    }
    const data = await this._actualGetData();

    this._releseLocker();
    return data;
  }

  /**
   * 发送请求
   * @returns {Promise<*>}
   * @private
   */
  async _actualGetData() {
    const req = this._getCurrentReq();
    console.log(req)
    let paging = await Http.request(req);
    if (!paging) {  //获取失败
      return null;
    }
    if (paging.total === 0) { //数据为空
      return {
        empty: true,
        items: [],
        moreData: false,
        accumulator: []
      }
    }
    this.moreData = this._isMoreData(paging.total_page,paging.page);
    if (this.moreData) {
      this.start += this.count;//记录count
    }
    this._accumulate(paging.items); //累加
    return {
      empty: false,
      items: paging.items,
      moreData: this.moreData,
      accumulator: this.accumulator
    }
  }

  _accumulate(items) {
    this.accumulator = this.accumulator.concat(items);
  }

  _getCurrentReq() {
    let url = this.url
    const params = `start=${this.start}&count=${this.count}`
    if (url.includes('?')) {
      url += '&' + params;
    } else {
      url += '?' + params;
    }
    this.req.url = url;
    return this.req;
  }

  /**
   * 判断是否有更多数据
   * @param totalPage 总页数
   * @param pageNum 当前页数 从0开始
   * @returns {boolean}
   * @private
   */
  _isMoreData(totalPage,pageNum) {
    return pageNum < totalPage - 1;
  }

  /**
   * 获取锁, 加锁
   * @returns {boolean}
   */
  _getLocker() {
    if (this.locker) {
      return false;
    }
    this.locker = true;
    return true;
  }

  /**
   * 释放锁
   */
  _releseLocker() {
    this.locker = false;
  }
}

export {
  Paging
}