import { defineStore } from 'pinia';
import { defineAsyncComponent } from 'vue';
export const useChartDisplay = defineStore('chartDisplay', {
  state: () => ({
    chartDisplayActive: true, // 控制顯示折線圖區塊
    selectedChart: 'current',
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
          return defineAsyncComponent(
            () => import('@/components/CurrentChart.vue')
          );
        case 'weekly':
          return defineAsyncComponent(
            () => import('@/components/WeeklyChart.vue')
          );
      }
    },
  },
  persist: true,
});
