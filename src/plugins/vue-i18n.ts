import { createI18n } from 'vue-i18n';
import en from '../locale/en';
import zhTW from '../locale/zh_tw';
import { type I18nOptions } from 'vue-i18n';

const datetimeFormats: I18nOptions['datetimeFormats'] = {
  en: {
    short: {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    },
    long: {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      weekday: 'long',
      hour: 'numeric',
      minute: 'numeric',
    },
    dayOfWeek: {
      weekday: 'short',
    },
  },
  zh: {
    short: {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    },
    long: {
      year: 'numeric',
      month: 'long',
      day: '2-digit',
      weekday: 'long',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    },
    dayOfWeek: {
      weekday: 'short',
    },
  },
};

const i18n = createI18n({
  legacy: false,
  locale: 'zhTW',
  missingWarn: false,
  fallbackLocale: 'zh',
  fallbackWarn: false,
  formatFallbackMessages: true, // 找不到KEY則回退原本字串(keys of weather ci & weather wx NOT exist in 'zhTW' locale messages)
  globalInjection: true,
  datetimeFormats,
  messages: {
    zhTW,
    en,
  },
});

export default i18n;
