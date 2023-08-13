<template>
  <div class="relative my-6 flex w-full flex-wrap items-stretch">
    <input
      type="text"
      class="bg-white h-12 w-full px-4 rounded-lg focus:outline-none hover:cursor-pointer"
      name="search bar"
      aria-label="搜尋框"
      placeholder="選擇縣市"
      @click="toggleDropdown"
    />
    <span class="absolute top-3 right-4 border-l pl-4"
      ><i
        class="fa fa-search text-gray-600 hover:text-weather-secondary hover:cursor-pointer"
      ></i
    ></span>
    <div
      v-if="showDropdown"
      class="w-full px-4 bg-white border border-gray-300 rounded-md"
    >
      <a href="#" class="block px-4 py-2 hover:bg-gray-100">menu-1</a>
      <a href="#" class="block px-4 py-2 hover:bg-gray-100">menu-2</a>
      <a href="#" class="block px-4 py-2 hover:bg-gray-100">menu-3</a>
      <a href="#" class="block px-4 py-2 hover:bg-gray-100">menu-4</a>
      <a href="#" class="block px-4 py-2 hover:bg-gray-100">menu-5</a>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const showDropdown = ref(false);

    const toggleDropdown = () => {
      showDropdown.value = !showDropdown.value;
    };

    return {
      showDropdown,
      toggleDropdown,
    };
  },
});
</script>

<style scoped></style>
