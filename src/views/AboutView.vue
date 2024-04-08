<template>
  <main class="container mx-auto px-4 mt-14 tracking-wide leading-relaxed">
    <div
      class="flex flex-col justify-between my-6 p-6 md:p-10 rounded-lg bg-black/20 text-white"
    >
      <h1 class="text-2xl mb-2">{{ $t('AboutTitle') }}</h1>
      <p class="mb-4">
        {{ $t('AboutInfo') }}
      </p>
      <h2 class="text-xl my-2">{{ $t('referenceLink') }}</h2>
      <ul class="list-disc list-inside">
        <li>
          <a
            href="https://www.cwa.gov.tw/V8/C/"
            target="_blank"
            class="text-weather-secondary"
            >{{ $t('CWALink') }}</a
          >
        </li>
        <li>
          <a
            href="https://opendata.cwa.gov.tw/index"
            target="_blank"
            class="text-weather-secondary"
            >{{ $t('openWeatherDataLink') }}</a
          >
        </li>
        <li>
          <a
            href="https://opendata.cwa.gov.tw/opendatadoc/MFC/A0012-001.pdf"
            target="_blank"
            class="text-weather-secondary"
            >{{ $t('weatherDataTranslationLink') }}</a
          >
        </li>
      </ul>
    </div>
  </main>
</template>

<script setup lang="ts"></script>
