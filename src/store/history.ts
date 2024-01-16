import { defineStore } from 'pinia';
import type { History } from '@/types';

export const useHistory = defineStore('history', {
  state: () => ({
    history: <History[]>[],
  }),
  actions: {
    addHistory(city: string, region: string, dataId: string[]) {
      // 檢查紀錄是否已存在相同的地區
      const exist = this.history.find(
        (r) => r.city === city && r.region === region
      );
      if (!exist) {
        // 如果不存在，則將地區推入紀錄陣列的開頭
        this.history.unshift({ city, region, dataId });
        // 如果紀錄超過6筆，則移除最後一筆
        if (this.history.length > 6) {
          this.history.pop();
        }
      }
    },
    deleteFromHistory(index: any) {
      if (this.history.length > 0) {
        this.history.splice(index, 1);
      }
    },
  },
  persist: true,
});
