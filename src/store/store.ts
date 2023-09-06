import { defineStore, getActivePinia } from 'pinia';
import type { History } from '@/types';

export const useLocationStore = defineStore('store', {
  // 定義狀態
  state: () => ({
    history: <History[]>[],
  }),
  // 定義方法
  actions: {
    // 添加一筆紀錄到狀態中
    addHistory(city: string, region: string) {
      // 檢查是否已經存在相同的紀錄
      const exist = this.history.find(
        (r) => r.city === city && r.region === region
      );
      if (!exist) {
        // 如果不存在，則將紀錄推入陣列的開頭
        this.history.unshift({ city, region });
        // 如果紀錄超過7筆，則移除最後一筆
        if (this.history.length > 7) {
          this.history.pop();
        }
      }
    },
    // 重設全局store狀態的方法
    resetAllStores() {
      const activepinia = getActivePinia();
      if (activepinia) {
        Object.entries(activepinia.state.value).forEach(
          ([storeName, state]) => {
            const storeDefinition = defineStore(storeName, state);
            const store = storeDefinition(activepinia);
            store.$reset();
          }
        );
      }
    },
  },
  persist: true,
});
