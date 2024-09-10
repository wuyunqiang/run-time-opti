
/**
 * promise缓存机制，一段时间内，重复执行的Promise可以复用先前的结果，一段时间后会自动清理缓存。
 * @param task 
 * @returns 
 */
export const cachePromise = (time = 3 * 1000) => {
    let _cacheP: Promise<any> | null = null;
    return (task: () => Promise<any>,) => {
        if (!_cacheP) {
            _cacheP = new Promise((_res, _rej) => {
                task().then((res) => {
                    _res(res)
                }).catch((err) => {
                    _rej(err)
                }).finally(() => {
                    setTimeout(() => {
                        _cacheP = null;
                    }, time);
                })
            });
        }
        return _cacheP;
    };
};