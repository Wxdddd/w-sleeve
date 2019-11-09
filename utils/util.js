/**
 * @auth winn
 * @date 2019/11/9 10:14 PM
 */

/**
 * promisic封装ajax
 * @param func
 * @returns {function(*=): Promise<any>}
 */
const promisic = function (func) {
    return function (params = {}) {
        return new Promise((resolve, reject) => {
            const args = Object.assign(params, {
                success: (res) => {
                    resolve(res);
                },
                fail: (error) => {
                    reject(error);
                }
            });
            func(args);
        });
    };
};

/**
 * 排列组合
 * @param arr 数组
 * @param size  排列组合的大小
 * @returns {Array}
 * 例如arr[1,2,3] size为2 返回[1,2] [2,3] [1,3]
 */
const combination = function (arr, size) {
    var r = [];

    function _(t, a, n) {
        if (n === 0) {
            r[r.length] = t;
            return;
        }
        for (var i = 0, l = a.length - n; i <= l; i++) {
            var b = t.slice();
            b.push(a[i]);
            _(b, a.slice(i + 1), n-1);
        }
    }
    _([], arr, size);
    return r;
}

export {
    promisic,
    combination
}
