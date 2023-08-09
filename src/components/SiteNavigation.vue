<template>
  <header class="sticky top-0 shadow-lg bg-weather-primary">
    <nav
      class="container flex flex-col sm:flex-row items-center gap-4 text-white py-6"
    >
      <RouterLink :to="{ name: 'home' }">
        <div class="flex items-center gap-3">
          <i class="fa-solid fa-cloud-sun text-2xl"></i>
          <p class="text-2xl">天氣預報</p>
        </div>
      </RouterLink>
      <div class="flex flex-1 gap-3 justify-end">
        <i
          class="fa-solid fa-circle-info text-xl hover:text-weather-secondary duration-150 cursor-pointer"
          @click="toggleBaseModel"
        ></i>
        <i
          class="fa-solid fa-plus text-xl hover:text-weather-secondary duration-150 cursor-pointer"
        ></i>
      </div>
      <BaseModel :modelActive="modelActive" @close-model="toggleBaseModel">
        <div class="text-black">
          <h1 class="text-2xl mb-2">關於本網頁：</h1>
          <p class="mb-4">
            "天氣預報"讓您可以追蹤所選城市的當下和未來天氣狀況。
          </p>
          <h2 class="text-2xl">使用方法：</h2>
          <ol class="list-decimal list-inside mb-4">
            <li>在搜索欄中輸入城市名稱，搜索您想要的城市。</li>
            <li>在搜索結果中選擇一個城市，這將帶您到該城市的當前天氣頁面。</li>
            <li>
              只要點擊頁面右上角的"+"圖示，就可以把該城市保存到主頁並追蹤該城市，方便之後隨時查看。
            </li>
          </ol>
          <h2 class="text-2xl">取消追蹤城市:</h2>
          <p>
            如果您不想再追蹤某個城市，只需在主頁中選擇該城市，並點擊位在頁面底部刪除該城市的選項。
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
