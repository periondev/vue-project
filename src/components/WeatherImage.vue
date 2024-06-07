<template>
  <img
    :src="getImageUrl(weather as string, hours as number)"
    :alt="weather"
    :width="width"
    :height="height"
    :fetchpriority="fetchpriority"
  />
</template>

<script setup lang="ts">
defineProps({
  weather: { type: String, required: true },
  hours: { type: Number, required: true },
  width: {
    type: Number,
    default: 60,
  },
  height: {
    type: Number,
    default: 60,
  },
  fetchpriority: { type: String, default: 'auto' },
});

// 檢查白天時間方法
const isDayTime = (hours: number) => hours > 6 && hours < 18;

// 根據天氣現象回傳圖檔名，僅供參考，以文字描述為準。
// 天氣現象描述資訊參考: https://opendata.cwa.gov.tw/opendatadoc/MFC/A0012-001.pdf
const getImage = (wx: string, hours: number): string => {
  const dayTime = isDayTime(hours);

  if (wx.includes('雷陣雨') || wx.includes('雷雨')) {
    return 'thunderstorm';
  }
  if (wx.includes('陰') && wx.includes('短暫雨')) {
    return 'rainy';
  }
  if (wx.includes('陰') && wx.includes('陣雨')) {
    return 'shower';
  }
  if (wx.includes('短暫雨')) {
    return dayTime ? 'rainy-sun' : 'rainy-moon';
  }
  if (wx.includes('陣雨')) {
    return dayTime ? 'shower-sun' : 'shower-moon';
  }
  if (wx.includes('陰') && wx.includes('雨')) {
    return 'rainy';
  }
  if (wx.includes('晴') && wx.includes('雨')) {
    return dayTime ? 'rainy-sun' : 'rainy-moon';
  }
  if (wx.includes('雪')) {
    return 'snowy';
  }
  if (wx.includes('霧')) {
    if (wx.includes('晴')) {
      return dayTime ? 'mist-sun' : 'mist-moon';
    }
    return 'mist';
  }
  if (wx.includes('晴') && wx.includes('多雲')) {
    return dayTime ? 'cloudy-sun' : 'cloudy-moon';
  }
  if (wx.includes('雨')) {
    return 'rainy';
  }
  switch (wx) {
    case '晴':
      return dayTime ? 'sunny' : 'moon';
    case '多雲':
    case '陰天':
      return 'cloudy';
    default:
      return 'cloudy'; // 預設圖檔名
  }
};

// 取得圖檔路徑
const getImageUrl = (wx: string, hours: number) => {
  const ImageUrl = getImage(wx, hours);
  return new URL(`../assets/weather-images/${ImageUrl}.svg`, import.meta.url)
    .href;
};
</script>
