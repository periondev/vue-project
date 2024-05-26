import { defineStore } from 'pinia';

interface LanguageState {
  selectedLang: string;
}

export const useLanguage = defineStore('language', {
  state: (): LanguageState => ({
    selectedLang: 'zhTW', // 預設的語系名稱
  }),
  actions: {
    selectLang(lang: string) {
      this.selectedLang = lang;
    },
  },
  persist: true,
});
