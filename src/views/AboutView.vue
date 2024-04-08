<template>
  <main class="container mx-auto px-4 mt-14 tracking-wide">
    <article
      class="prose prose-invert max-w-none prose-h1:text-2xl my-6 p-6 md:p-10 rounded-lg bg-black/20"
    >
      <h1>{{ $t('AboutTitle') }}</h1>
      <p>
        {{ $t('AboutInfo') }}
      </p>
      <h2>{{ $t('referenceLink') }}</h2>
      <ul>
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
    </article>
  </main>
</template>

<script setup lang="ts"></script>
