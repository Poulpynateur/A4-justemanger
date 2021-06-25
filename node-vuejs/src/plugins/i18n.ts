import Vue from 'vue';
import VueI18n, { LocaleMessageObject } from 'vue-i18n';

import en from "../assets/translations/en.json";
import fr from "../assets/translations/fr.json";

/**
 * Tuto :
 * https://medium.com/js-dojo/manage-vue-i18n-with-typescript-958b2f69846f
 */

Vue.use(VueI18n);

export enum Locales {
    EN = 'en',
    FR = 'fr',
}

export const LOCALES = [
    { value: Locales.EN, caption: 'English' },
    { value: Locales.FR, caption: 'Français' }
]

export const messages = {
    [Locales.EN as string]: en as LocaleMessageObject,
    [Locales.FR as string]: fr as LocaleMessageObject
};

export const defaultLocale = Locales.FR;

export const i18n = new VueI18n({
    messages,
    locale: defaultLocale,
    fallbackLocale: defaultLocale
});