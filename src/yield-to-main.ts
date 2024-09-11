/**
 * 让出主线程 
 * 用户可以手动分解长任务
 * 优先使用MessageChannel宏任务&无延迟 阻断执行让出主线程
 * 使用setTimeOut兼容
 * @returns Promise
 */
export const yieldToMain = async () => {
  if (typeof MessageChannel !== 'undefined') {
    let _resolve: (value?: any) => void;
    const p = new Promise(resolve => {
      _resolve = resolve;
    })
    const channel = new MessageChannel(); // 建立宏任务的消息通道
    const port1 = channel.port1;
    const port2 = channel.port2;

    port2.onmessage = () => {
      _resolve();
    }
    port1.postMessage('yield')
    return p;
  }

  return new Promise(resolve => {
    setTimeout(resolve, 0);
  });
};

/**
 * 延迟一定时间 不阻塞主线程
 * @param duration 
 * @returns 
 */
export const sleep = async (duration: number) => {
  return new Promise(resolve => {
    setTimeout(resolve, duration);
  });
};


/**
 * 阻塞主线程 卡死主线程一定时间
 * @param duration 毫秒
 */
export const block = (duration = 1 * 1000) => {
  const current = Date.now();
  while (Date.now() - current < duration) { }
}