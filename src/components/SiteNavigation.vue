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
        <div class="relative" ref="langMenu">
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
      <!-- Info Page -->
      <BaseModel :modelActive="modelActive" @close-model="!modelActive">
        <article class="prose prose-h1:text-2xl" ref="infoModel">
          <h1>{{ $t('howToUse.title') }}</h1>
          <ol>
            <li>
              {{ $t('howToUse.ol1') }}
            </li>
            <li>
              {{ $t('howToUse.ol2') }}
            </li>
            <li>
              {{ $t('howToUse.ol3') }}
            </li>
            <li>
              {{ $t('howToUse.ol4') }}
            </li>
          </ol>
        </article>
      </BaseModel>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import BaseModel from './BaseModel.vue';
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { InformationCircleIcon } from '@heroicons/vue/24/solid';
import { LanguageIcon } from '@heroicons/vue/24/solid';
import { onClickOutside } from '@vueuse/core';
const { locale } = useI18n();
const modelActive = ref(false);
const menuActive = ref(false);
const langMenu = ref(null);
const infoModel = ref(null);

const toggleBaseModel = () => {
  modelActive.value = !modelActive.value;
};

const toggleMenu = () => {
  menuActive.value = !menuActive.value;
};

onMounted(() => {
  onClickOutside(langMenu, () => {
    menuActive.value = false;
  });

  onClickOutside(infoModel, () => {
    modelActive.value = false;
  });
});

// 語言切換
const changeLang = (val: string) => {
  locale.value = val;
  toggleMenu();
};
</script>
