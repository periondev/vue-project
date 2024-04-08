<template>
  <footer class="container mx-auto p-4 mt-8 text-center text-white/60">
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
    <a
      href="https://www.flaticon.com/free-icons/weather"
      title="weather icons"
      target="_blank"
      class="text-xs"
      >Weather icons created by fjstudio - Flaticon</a
    >
  </footer>
</template>
