// 定義一個防抖函式，避免頻繁呼叫 fetchWeather 函式
export const debounce = (fn: Function, delay: number) => {
  let timer: any = null; // 定時器
  let lastCity = ''; // 上一次選擇的城市
  let lastRegion = ''; // 上一次選擇的鄉鎮市區
  return (...args: any[]) => {
    const [city, region] = args; // 獲取當前選擇的城市、鄉鎮市區
    if (city !== lastCity || region !== lastRegion) {
      // 選擇地區與上一次不同
      clearTimeout(timer); // 清除定時器
      fn(...args); // 立即執行回調函式
      lastCity = city; // 更新上一次選擇的城市
      lastRegion = region; // 更新上一次選擇的鄉鎮市區
    } else {
      // 選擇地區與上一次相同
      clearTimeout(timer); // 清除定時器
      timer = setTimeout(() => {
        // 重新設置一個新的定時器
        fn(...args); // 延遲執行回調函式
      }, delay); // 延遲時間
    }
  };
};
