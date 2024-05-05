// 定義歷史紀錄的類型
export interface History {
  city: string;
  region: string;
  dataId: string[];
}
// 當前即時天氣資料
export interface CurrentElements {
  cityName: string;
  regionName: string;
  pop: string; // PoP6h 降雨機率
  temp: string; // T 平均溫度
  rh: string; // RH 相對濕度
  wx: string; // Wx 天氣現象
  ci: string; // CI 舒適度指數
  ws: string; // WS 風速 公尺/秒
}

// 以一天為單位重新組合後的天氣元素資料格式，每個天氣元素皆有白天(06:00~18:00)、晚上(18:00~隔天06:00)2筆資料
export interface WeeklyElements {
  dayOfWeek: Date;
  date: string;
  pop: string[]; // PoP12h 早晚降雨機率
  temp: string[]; // T 早晚平均溫度
  rh: string[]; // RH 早晚相對濕度
  wx: string[]; // Wx 天氣現象、天氣圖標
}

export interface WeeklyChartData {
  date: string[];
  dayOfWeek: string[];
  tempDay: number[]; // T 早平均溫度
  tempNight: number[]; // T 晚平均溫度
}

export interface CurrentChartData {
  date: string[][];
  temp: number[]; // T
  at: number[]; // AT
}
