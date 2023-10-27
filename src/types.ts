// 定義歷史紀錄的類型
export interface History {
  city: string;
  region: string;
  dataId: string;
}
// 大致天氣資料
export interface WeatherData {
  cityName: string;
  regionName: string;
  elements: Elements[];
}
// 以一天為單位重新組合後的天氣元素資料格式，每個天氣元素皆有白天(06:00~18:00)、晚上(18:00~隔天06:00)2筆資料
export interface Elements {
  dayOfWeek: string;
  date: string;
  pop: string[]; // PoP12h 降雨機率
  t: string[]; // T 平均溫度
  rh: string[]; // RH 相對濕度
  wx: string[]; // Wx 天氣現象
}
