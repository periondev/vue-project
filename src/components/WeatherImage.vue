<template>
  <img
    :src="getImageUrl(weather as string)"
    :alt="weather"
    width="85"
    height="auto"
  />
</template>

<script setup lang="ts">
// 定義組件的 props
defineProps({
  weather: String, // 天氣描述資料
});
// 根據天氣現象回傳圖檔名，僅供參考，以文字描述為準。
// 天氣現象描述資訊參考: https://opendata.cwa.gov.tw/opendatadoc/MFC/A0012-001.pdf
// icons created by fjstudio - Flaticon
const getImage = (wx: string) => {
  if (wx.includes('雷陣雨')) {
    return 'thunderstorm';
  }
  if (wx.includes('短暫雨')) {
    return 'rainy';
  }
  if (wx.includes('短暫陣雨')) {
    return 'rainy';
  }
  if (wx.includes('雪')) {
    return 'snowy';
  }
  switch (wx) {
    case '晴':
      return 'sunny';
    case '多雲':
      return 'cloudy';
    case '陰天':
      return 'cloudy';
    case '陰時多雲':
      return 'cloudy';
    case '多雲時陰':
      return 'cloudy';
    case '多雲時晴':
      return 'cloudy-sun';
    case '晴時多雲':
      return 'cloudy-sun';
    default:
      return 'cloudy'; // 預設圖檔名
  }
};

// 取得圖檔路徑
const getImageUrl = (name: string) => {
  const ImageUrl = getImage(name);
  return new URL(`../assets/weather-images/${ImageUrl}.png`, import.meta.url)
    .href;
};
</script>
