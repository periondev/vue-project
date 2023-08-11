<template>
  <main class="container">
    <div class="relative my-6 flex w-full flex-wrap items-stretch">
      <input
        type="text"
        class="bg-white h-12 w-full px-4 rounded-lg focus:outline-none hover:cursor-pointer"
        name="search bar"
        aria-label="搜尋框"
        placeholder="選擇縣市"
      />
      <span class="absolute top-3 right-4 border-l pl-4"
        ><i
          class="fa fa-search text-gray-600 hover:text-weather-secondary hover:cursor-pointer"
        ></i
      ></span>
    </div>
  </main>
</template>

<script setup lang="ts"></script>
