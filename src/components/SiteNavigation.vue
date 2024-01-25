<template>
  <header class="fixed top-0 z-10 w-full shadow-lg bg-weather-primary">
    <nav class="container flex flex-row items-center text-white py-3 px-4">
      <RouterLink :to="{ name: 'home' }">
        <div class="flex items-center gap-3">
          <img
            src="../assets/weather-images/cloudy-sun.png"
            alt="weather"
            width="32"
            height="auto"
          />
          <p class="text-2xl font-bold">天氣預報</p>
        </div>
      </RouterLink>
      <div class="flex flex-1 gap-3 justify-end">
        <i
          class="fa-solid fa-circle-info text-2xl hover:scale-110 duration-150 cursor-pointer"
          @click="toggleBaseModel"
        ></i>
      </div>
      <BaseModel :modelActive="modelActive" @close-model="toggleBaseModel">
        <div class="text-black">
          <h1 class="text-2xl mb-2">關於本網頁</h1>
          <p class="mb-4">
            "天氣預報"網頁讓您可以觀察所選台灣地區的目前天氣及未來一週天氣狀況，資訊來自交通部中央氣象署氣象資訊開放資料。
          </p>
          <h2 class="text-xl my-2">使用方法</h2>
          <ol class="list-decimal list-inside mb-4">
            <li>在左側下拉式選單中選取您想查詢的台灣縣市名稱。</li>
            <li>
              選取縣市之後，在右側下拉式選單中選擇鄉鎮或市區，並點擊查詢按鈕，即可顯示該地區的天氣資訊。
            </li>
            <li>
              查詢過的地區會自動儲存歷史紀錄，最多儲存6組地區，方便之後追蹤查看，點擊地區名稱即可顯示該地區天氣最新資訊。
            </li>
          </ol>
          <h2 class="text-xl my-2">管理地區紀錄</h2>
          <p class="mb-4">
            若要刪減地區紀錄，只需點擊地區名稱旁邊的'-'符號，即可刪除該地區。
          </p>
          <h2 class="text-xl my-2">參考連結</h2>
          <a href="https://www.cwa.gov.tw/V8/C/" target="_blank"
            ><p class="text-weather-secondary">交通部中央氣象署</p></a
          >
          <a href="https://opendata.cwa.gov.tw/index" target="_blank"
            ><p class="text-weather-secondary">氣象資料開放平台</p></a
          >
        </div>
      </BaseModel>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import BaseModel from './BaseModel.vue';
import { ref } from 'vue';

const modelActive = ref(false);
const toggleBaseModel = () => {
  modelActive.value = !modelActive.value;
};
</script>
