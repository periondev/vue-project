<template>
  <header
    class="fixed top-0 z-10 w-full shadow-lg tracking-wide bg-weather-primary/60 backdrop-blur"
  >
    <nav class="container flex flex-row items-center text-white py-3 px-4">
      <RouterLink :to="{ name: 'home' }">
        <div class="flex items-center gap-2">
          <img
            src="../assets/icons/logo.png"
            alt="weather"
            width="30"
            height="auto"
          />
          <p class="text-2xl font-bold">{{ $t('weatherForecast') }}</p>
        </div>
      </RouterLink>
      <div class="flex flex-1 gap-2 justify-end">
        <div class="relative">
          <LanguageIcon
            class="h-[28px] w-auto hover:scale-110 duration-150 cursor-pointer"
            @click="toggleMenu"
          />
          <div class="dropdown-menu" v-if="menuActive">
            <span class="dropdown-menu-item" @click="changeLang('zhTW')">
              繁體中文
            </span>
            <span class="dropdown-menu-item" @click="changeLang('en')">
              English
            </span>
          </div>
        </div>
        <InformationCircleIcon
          class="h-[30px] w-auto hover:scale-110 duration-150 cursor-pointer"
          @click="toggleBaseModel"
        />
      </div>

      <BaseModel :modelActive="modelActive" @close-model="toggleBaseModel">
        <div class="text-black text-sm leading-relaxed">
          <h1 class="text-2xl mb-2">{{ $t('infoTitle') }}</h1>
          <p class="mb-4">
            {{ $t('infoAbout') }}
          </p>
          <h2 class="text-xl my-2">{{ $t('howToUse.title') }}</h2>
          <ol class="list-decimal list-inside mb-4">
            <li>
              {{ $t('howToUse.ol1') }}
            </li>
            <li>
              {{ $t('howToUse.ol2') }}
            </li>
            <li>
              {{ $t('howToUse.ol3') }}
            </li>
          </ol>
          <h2 class="text-xl my-2">{{ $t('referenceLink') }}</h2>
          <ul class="list-disc list-inside">
            <li>
              <a
                href="https://www.cwa.gov.tw/V8/C/"
                target="_blank"
                class="text-weather-secondary"
                >{{ $t('CWAWeb') }}</a
              >
            </li>
            <li>
              <a
                href="https://opendata.cwa.gov.tw/index"
                target="_blank"
                class="text-weather-secondary"
                >{{ $t('openWeatherDataWeb') }}</a
              >
            </li>
          </ul>
        </div>
      </BaseModel>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import BaseModel from './BaseModel.vue';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { InformationCircleIcon } from '@heroicons/vue/24/solid';
import { LanguageIcon } from '@heroicons/vue/24/solid';
const { locale } = useI18n();
const menuActive = ref(false);
const modelActive = ref(false);

const toggleMenu = () => {
  menuActive.value = !menuActive.value;
};

const toggleBaseModel = () => {
  modelActive.value = !modelActive.value;
};

// 語言切換
const changeLang = (val: string) => {
  locale.value = val;
  toggleMenu();
};
</script>
