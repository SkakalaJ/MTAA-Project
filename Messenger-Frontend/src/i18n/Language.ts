import i18n from 'i18n-js';
import * as RNLocalize from 'react-native-localize';
import memoize from 'lodash.memoize';

const translationGetters = {
  en: () => require('./translations/en.json')
};

export const translate = memoize((key, opt?) => i18n.t(key, opt));

export const currentLanguage = () => {
  const fallback = { languageTag: 'en' };
  const { languageTag } = fallback;

  return languageTag;
};

export const setI18nConfig = () => {
  const languageTag = currentLanguage();

  // @ts-ignore
  translate.cache.clear();

  // @ts-ignore
  i18n.translations = { [languageTag]: translationGetters[languageTag]() };
  i18n.locale = languageTag;
};
