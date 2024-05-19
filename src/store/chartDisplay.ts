import { defineStore } from 'pinia';
export const useChartDisplay = defineStore('chartDisplay', {
  state: () => ({
    chartDisplayActive: true, // 控制顯示折線圖區塊
  }),
  actions: {
    toggleChartDisplay() {
      this.chartDisplayActive = !this.chartDisplayActive;
    },
  },
  persist: true,
});
