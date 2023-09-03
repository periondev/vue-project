import { defineStore } from 'pinia';
import type { History } from '@/types';

export const useLocationStore = defineStore('store', {
  state: () => {
    return {
      historyList: <History[]>[],
    };
  },
  persist: true,
});
