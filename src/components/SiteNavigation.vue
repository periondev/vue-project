<template>
  <header class="sticky top-0 z-20 shadow-lg bg-weather-primary">
    <nav class="container flex flex-row items-center text-white p-4">
      <RouterLink :to="{ name: 'home' }">
        <div class="flex items-center gap-3">
          <i class="fa-solid fa-cloud-sun text-2xl"></i>
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
            "天氣預報"網頁讓您可以觀察所選台灣地區的未來一週天氣狀況，資訊來自交通部中央氣象署氣象資訊開放資料。
          </p>
          <h2 class="text-xl my-2">使用方法</h2>
          <ol class="list-decimal list-inside mb-4">
            <li>在左側下拉式選單欄中選取縣市名稱以查詢您想要的台灣縣市。</li>
            <li>
              選取縣市之後，在右側下拉式選單欄中選擇鄉鎮或市區，並點擊查詢按鈕，即可顯示該地區的最新天氣預報資訊。
            </li>
            <li>
              點擊查詢按鈕之後，搜尋過的地區會自動儲存歷史紀錄，最多儲存6組地區，方便之後追蹤查看，點擊地區名稱即可顯示該地區天氣最新預報資訊。
            </li>
          </ol>
          <h2 class="text-xl my-2">刪除地區紀錄</h2>
          <p class="mb-4">
            如果您不想再追蹤某個地區，只需點擊地區名稱旁邊的'-'符號，即可刪除該地區。
          </p>
          <h2 class="text-xl my-2">參考連結</h2>
          <a href="https://www.cwa.gov.tw/V8/C/" target="_blank"><p class="text-weather-secondary">交通部中央氣象署</p></a>
          <a href="https://opendata.cwa.gov.tw/index" target="_blank"><p class="text-weather-secondary">氣象資料開放平台</p></a>
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
