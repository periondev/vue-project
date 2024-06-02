<template>
  <footer class="container p-4 mt-8 text-center text-white/60">
    <p class="mb-3">
      <RouterLink to="/" class="underline hover:font-bold">
        {{ $t('HomeTitle') }}
      </RouterLink>
      {{ '  |  ' }}
      <RouterLink to="/about" class="underline hover:font-bold">
        {{ $t('AboutTitle') }}
      </RouterLink>
    </p>
    <p>
      Developed by
      <a href="https://github.com/periondev" title="github" target="_blank"
        >Peri🐚</a
      >
      © 2024
    </p>
    <span class="text-xs">
      Weather icons created by
      <a
        href="https://www.flaticon.com/free-icons/weather"
        title="weather icons"
        target="_blank"
      >
        fjstudio - Flaticon</a
      >,
      <a
        href="https://www.iconfinder.com/iconsets/the-weather-is-nice-today"
        title="weather icons"
        target="_blank"
      >
        Laura Reen - Iconfinder</a
      >
    </span>
  </footer>
</template>
