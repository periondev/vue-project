// 定義歷史紀錄的類型
export interface History {
  city: string;
  region: string;
  dataId: string;
}

// 定義天氣預報的介面 from weatherElement
// 每隔12小時資料，每個天氣元素都有2*7=14筆資料(查詢時間區段跨夜(after 18:00)造成多出第一筆資料)
// 依照時間序排列早、晚天氣元素
export interface WeatherData {
  cityName: string;
  regionName: string;
  date: string[];
  dayPoP: string[];
  dayT: string[];
  dayWx: string[];
}

// startTime: string; // 預報開始時間
// endTime: string; // 預報結束時間
// description: string; // 天氣現象描述
// weatherIcon: number; // 天氣圖示代碼
// parameterName: string; // 天氣現象描述
// temperature: number; // 溫度

// T: string[]; // 平均溫度
// MaxT: string[]; // 最高溫度
// MinT: string[]; // 最低溫度
// RH: string[]; // 相對濕度
// Wx: string[]; // 天氣現象
// PoP12h: string[]; // 降雨機率
