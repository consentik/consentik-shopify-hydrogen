import {ILanguage, IMetaField, TMetaObject} from "./types.ts";

export const CST_KEY = {
    LANGUAGE: '_consentik_s_lang',
    ALLOW_KEY: 'cookiesNotification'
}
export const convertOpacityToHex = (opacity: any) => {
    if (opacity < 0 || opacity > 1) {
        return '00'
    }
    const hexOpacity = Math.round(opacity * 255).toString(16);
    return hexOpacity.padStart(2, '0');
};

export const isTrue = (field: string | number | boolean): boolean => {
    return field === '1' || field === 'true'
}

export function getCookie(key: string) {
    let keyValue = document.cookie.match("(^|;) ?" + key + "=([^;]*)(;|$)");
    return keyValue ? keyValue[2] : null;
}

export const setCookie = (name: string, value: any, days?: number) => {
    let expires = "";
    if (typeof value !== "string") {
        value = JSON.stringify(value);
    }
    let expiredDate = window.CACHE_TIME;
    if (days) {
        expiredDate = days;
    }
    let date = new Date();
    date.setTime(date.getTime() + expiredDate * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
    document.cookie = name + "=" + value + expires + "; path=/";
}
export const clearCookie = () => {
}
export const onGetMetaField = async (shop: string): Promise<IMetaField | Record<string, any>> => {
    try {
        const response = await fetch(`https://dev.consentik.com/consentik/api/setting/example-metafield?shop=${shop}`);
        const metaField = await response.json();
        const setting = metaField.setting.find((field: TMetaObject) => field.key === 'otck_app_data');
        const cookies = metaField.setting.find((field: TMetaObject) => field.key === 'otck_cookies');
        const languages = metaField.setting.find((field: TMetaObject) => field.key === 'otck_languages');
        // let defaultLanguage = multipleLang.config.default_language;
        // switch (multipleLang.config.language_detection_method) {
        //     case "browser":
        //         break;
        //     case "geo":
        //         break;
        //     case "store":
        //         break;
        //     case "url":
        //         break;
        //     default:
        //         break;
        // }
        // const cookieTrans = multipleLang.cookies.filter(item => item.language === defaultLanguage);
        // const categoriesTrans = multipleLang.categories.filter(item => item.language === defaultLanguage);
        // const bannerTextTrans = multipleLang.bannerText.find(item => item.language === defaultLanguage);
        // const cookieGroups = !multipleLang.config.enable ? JSON.parse(cookies.value) : {
        //     category: categoriesTrans,
        //     cookies: cookieTrans
        // }
        const settingBanner = JSON.parse(setting.value);
        const cookieGroups = JSON.parse(cookies.value);
        const multipleLang = JSON.parse(languages.value) as ILanguage;

        return {
            setting: settingBanner,
            cookieGroup: cookieGroups,
            languages: multipleLang,
        }
    } catch (e) {
        return {}
    }
}