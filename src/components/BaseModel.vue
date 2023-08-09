<template>
  <Transition name="model-outer">
    <div
      v-show="modelActive"
      class="flex absolute top-0 left-0 w-full h-screen justify-center px-8 bg-black bg-opacity-30"
    >
      <Transition name="model-inner">
        <div
          v-if="modelActive"
          class="p-4 mt-32 max-w-screen-md self-start bg-white"
        >
          <slot />
          <button
            class="mt-8 py-2 px-6 text-white bg-weather-primary"
            @click="$emit('close-model')"
          >
            關閉說明
          </button>
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<script setup lang="ts">
defineEmits(['close-model']);
defineProps({
  modelActive: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped></style>
