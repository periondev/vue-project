<template>
  <Teleport to="body">
    <Transition name="fade-outer">
      <div
        v-show="modelActive"
        class="flex absolute top-0 left-0 w-full h-screen justify-center px-8 bg-black bg-opacity-30"
      >
        <Transition name="fade-inner">
          <div
            v-if="modelActive"
            class="p-4 mt-32 max-w-screen-md self-start bg-white"
          >
            <slot />
            <div class="flex justify-end">
              <button
                class="mt-8 py-2 px-6 rounded-full text-white bg-weather-primary"
                @click="$emit('close-model')"
              >
                關閉說明
              </button>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
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

<style scoped>
.fade-outer-enter-from,
.fade-outer-enter-active,
.fade-outer-leave-active {
  transition: opacity 0.3s cubic-bezier(0.55, 0.15, 0.68, 0.8);
}
.fade-outer-leave-to {
  opacity: 0;
}
.fade-inner-enter-from {
  opacity: 0;
  transform: scale(0.85);
}
.fade-inner-enter-active {
  transition: all 0.25s cubic-bezier(0.47, 0.1, 0.75, 0.71);
}
.fade-inner-leave-active {
  transition: all 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
.fade-inner-leave-to {
  transform: scale(0.85);
}
</style>
