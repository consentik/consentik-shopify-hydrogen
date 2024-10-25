import {LoaderFunctionArgs} from '@shopify/remix-oxygen';

export const CST_KEY = {
  LANGUAGE: '_consentik_s_lang',
  ALLOW_KEY: 'cookiesNotification',
};
export const convertOpacityToHex = (opacity: any) => {
  if (opacity < 0 || opacity > 1) {
    return '00';
  }
  const hexOpacity = Math.round(opacity * 255).toString(16);
  return hexOpacity.padStart(2, '0');
};

export const isTrue = (
  field: string | number | boolean | undefined,
): boolean => {
  return field == '1' || field == 'true';
};

export function getCookie(key: string) {
  const keyValue = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');
  return keyValue ? keyValue[2] : null;
}

export const setCookie = (name: string, value: any, days?: number) => {
  let expires = '';
  if (typeof value !== 'string') {
    value = JSON.stringify(value);
  }
  let expiredDate = window.CACHE_TIME;
  if (days) {
    expiredDate = days;
  }
  const date = new Date();
  date.setTime(date.getTime() + expiredDate * 24 * 60 * 60 * 1000);
  expires = '; expires=' + date.toUTCString();
  document.cookie = name + '=' + value + expires + '; path=/';
};
export const clearCookie = () => {};

export async function loadMetaObject({context}: LoaderFunctionArgs) {
  try {
    const {storefront, env} = context;
    const metaID = env.PUBLIC_METAOBJECT_ID;
    const OBJECT_QUERY = `#graphql
        query {
            metaobject(id: "${metaID}") {
                field(key: "consentik_data") {
                    value
                }
            }
            localization {
                language {
                    endonymName
                    name
                    isoCode
                }
            }
        }`;
    const {metaobject, localization} = await storefront.query(OBJECT_QUERY, {
      cache: storefront.CacheNone(),
    });
    const metafield = metaobject.field?.value
      ? JSON.parse(metaobject.field.value)
      : {};
    const storeLang = localization.language.isoCode.toLowerCase();
    return {banner: metafield, storeLang};
  } catch (e) {
    console.log('ERROR', e);
    return {};
  }
}
