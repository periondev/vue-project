import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import App from './App.vue';
import router from './router';
import i18n from './utils/vue-i18n';
import { useLanguage } from '@/store/language';
import './assets/tailwind.css';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia.use(piniaPluginPersistedstate));
app.use(router);
app.use(i18n);

const languageStore = useLanguage();

// 訂閱 store 語言設置的變更，並動態更新 i18n 的 locale
languageStore.$subscribe((mutation, state) => {
  i18n.global.locale.value = state.selectedLang;
});
i18n.global.locale.value = languageStore.selectedLang; // 初始化 i18n 的 locale 為 store 中保存的值

app.mount('#app');
