<template>
  <!-- 地區歷史紀錄 -->
  <ul v-if="historyList.length" class="grid grid-cols-3 gap-3 pb-4">
    <li v-for="(history, index) in historyList" :key="index">
      <div class="relative pb-2 text-sky-200">
        <div
          @click="updateFromHistory(history)"
          class="rounded-full duration-150 cursor-pointer border border-sky-200"
        >
          <span
            v-if="$i18n.locale === 'en'"
            class="flex text-sm py-1.5 px-2 justify-start md:justify-center hover:font-bold duration-150"
            :title="`${$t(history.region)}` + ', ' + `${$t(history.city)}`"
          >
            <p class="truncate">
              {{ $t(history.region) }}, {{ $t(history.city) }}
            </p>
          </span>
          <span
            v-else
            class="flex text-sm py-1.5 justify-center hover:font-bold duration-150"
          >
            <p class="truncate">{{ history.city }}{{ history.region }}</p>
          </span>
        </div>
        <MinusCircleIcon
          @click="historyStore.deleteFromHistory(index)"
          class="h-[19px] w-auto mr-[-2px] mb-[-2px] duration-150 cursor-pointer absolute bottom-0 right-0 hover:scale-125"
        />
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { useHistory } from '@/store/history';
import type { History } from '@/types';
import { MinusCircleIcon } from '@heroicons/vue/24/solid';
import { debounce } from '@/utils/debounce';

const historyStore = useHistory();
const historyList = historyStore.history;

// 防抖函式
const debouncedFetchWeather = debounce(historyStore.onFetchWeather, 5000); // 延遲時間為5秒

// 點擊歷史紀錄中的地區，更新該地區天氣
const updateFromHistory = (history: History) => {
  const { city, region, dataId } = history;
  historyStore.setUpdateRegions(city);
  historyStore.setSelectedLocation(city, region, dataId);
  debouncedFetchWeather(city, region, dataId); // 調用防抖函式
};
</script>

<style scoped></style>
