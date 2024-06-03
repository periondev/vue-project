import { defineStore } from 'pinia';
import { defineAsyncComponent, markRaw } from 'vue';
export const useChartDisplay = defineStore('chartDisplay', {
  state: () => ({
    chartDisplayActive: true, // 控制顯示折線圖區塊
    selectedChart: 'current',
    currentChartComponent: markRaw(
      defineAsyncComponent(() => import('@/components/CurrentChart.vue'))
    ),
    weeklyChartComponent: markRaw(
      defineAsyncComponent(() => import('@/components/WeeklyChart.vue'))
    ),
  }),
  actions: {
    toggleChartDisplay() {
      this.chartDisplayActive = !this.chartDisplayActive;
    },
  },
  getters: {
    selectedChartComponent: (state) => {
      switch (state.selectedChart) {
        case 'current':
          return state.currentChartComponent;
        case 'weekly':
          return state.weeklyChartComponent;
      }
    },
  },
  persist: true,
});
