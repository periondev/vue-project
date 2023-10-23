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
            "天氣預報"讓您可以觀察台灣所選地區的未來一週天氣狀況。
          </p>
          <h2 class="text-2xl">使用方法</h2>
          <ol class="list-decimal list-inside mb-4">
            <li>在左側下拉式縣市選單欄中選取縣市名稱以搜索您想要的縣市。</li>
            <li>
              選取縣市之後，在右側下拉式鄉鎮市區選單欄中選擇鄉鎮或市區，並點擊確認按鈕，當前天氣頁面將會顯示該地區的最新天氣預報資訊。
            </li>
            <li>
              只要點擊確認按鈕之後，搜尋過的地區會自動儲存於主頁上方的歷史紀錄，最多儲存6組，方便之後追蹤查看，點擊即可顯示該地區天氣預報資訊。
            </li>
          </ol>
          <h2 class="text-2xl">取消追蹤城市</h2>
          <p>
            如果您不想再追蹤某個地區，只需點擊該地區旁邊的'-'符號，即可刪除該地區。
          </p>
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
