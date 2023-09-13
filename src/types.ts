// 定義歷史紀錄的類型
export interface History {
  city: string;
  region: string;
  dataId: string;
}

// 定義天氣預報的介面 from weatherElement
export interface Weather {
  locationName: string; // 鄉鎮市區名稱
  dataTime: string; // 資料時間
  startTime: string; // 預報開始時間
  endTime: string; // 預報結束時間
  weatherIcon: number; // 天氣圖示代碼
  parameterName: string; // 天氣現象描述
  temperature: number; // 溫度
  parameter: {
    T: string; // 溫度
    MaxT: string; // 最高溫度
    MinT: string; // 最低溫度
    RH: string; // 相對濕度
    Wx: string; // 天氣現象
    PoP: string; // 降雨機率
  };
}
