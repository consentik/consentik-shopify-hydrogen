import {LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {GeoLocationInfo, ImpressionData, OptionalImpression} from './types.ts';
import {CST_EU_COUNTRIES} from './data.ts';

export const CST_KEY = {
  LANGUAGE: '_consentik_s_lang',
  ALLOW_KEY: 'cookiesNotification',
};
const EU = 'eu';
const CALIFORNIA = 'california';
const COLORADO = 'colorado';
const JAPAN = 'japan';
const BRAZIL = 'brazil';
const SINGAPORE = 'singapore';

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

export const getGeoRegion = async (shop: string): Promise<GeoLocationInfo> => {
  try {
    const response = await fetch(`https://get.geojs.io/v1/ip/geo.json`);
    const data = await response.json();
    return {
      ip: data.ip,
      country_code: data.country_code,
      country_name: data.country,
      region: data.region,
      city_name: data.city,
      latitude: data.latitude,
      longitude: data.longitude,
      zip_code: '',
      time_zone: data.timezone,
      language_code: '',
      userIf: {
        country_code: data.country_code,
        region: data.region,
      },
    };
  } catch (e) {
    return getGeoRegionServer(shop);
  }
};
export const getGeoRegionFromIp = async (ip: string): Promise<string> => {
  const response = await fetch(`https://get.geojs.io/v1/ip/geo/${ip}.json`);
  const data = await response.json();
  return data.region;
};
export const getGeoRegionServer = async (
  shop: string,
): Promise<GeoLocationInfo> => {
  const response = await fetch(
    `${window.CST_ROOT_LINK}/api/consent/userInfo?shop=${shop}`,
  );
  return response.json();
};

export function getDeviceType() {
  const userAgent = navigator.userAgent,
    platform = navigator.platform,
    macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
    windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
    iosPlatforms = ['iPhone', 'iPad', 'iPod'],
    android = /Android/i,
    ipad = /iPad/i;

  if (iosPlatforms.indexOf(platform) !== -1 || android.test(userAgent)) {
    return 'm';
  } else if (ipad.test(userAgent)) {
    return 't';
  } else if (
    macosPlatforms.indexOf(platform) !== -1 ||
    windowsPlatforms.indexOf(platform) !== -1
  ) {
    return 'd';
  } else {
    return 'unk';
  }
}

function getBrowser() {
  let userAgent = navigator.userAgent;
  if (userAgent.indexOf('Firefox') !== -1) {
    return 'Firefox';
  } else if (userAgent.indexOf('OPR/') !== -1) {
    return 'Opera';
  } else if (userAgent.indexOf('Chrome') !== -1) {
    return 'Chrome';
  } else if (userAgent.indexOf('Safari') !== -1) {
    return 'Safari';
  } else if (userAgent.indexOf('Edg/') !== -1) {
    return 'Edge';
  } else if (
    userAgent.indexOf('MSIE') !== -1 ||
    userAgent.indexOf('Trident/') !== -1
  ) {
    return 'Internet Explorer';
  }
  return 'unk';
}

function uid(info: {ip: string; bw: string; dv: string}) {
  const text = info.ip + info.bw + info.dv;
  let hash = 0;
  if (text.length === 0) return hash.toString(16);
  for (let i = 0; i < text.length; i++) {
    let char = text.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return hash.toString(16).substring(0, 8);
}

export function getUserAgent(ip: string) {
  const dv = getDeviceType();
  const bw = getBrowser();
  return {
    dv,
    bw,
    uid: uid({ip, dv, bw}),
  };
}

export async function sendImpression(data: OptionalImpression) {
  try {
    const params = new URLSearchParams({...data, dateCreated: new Date()});
    return fetch(window.CST_ROOT_LINK + `/api/impression?${params}`);
  } catch (e) {
    console.log('CONSENTIK : Error sent impression');
  }
}

export function otUpdateDuration() {
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
      window.otDurationDiff += Date.now() - window.otLastVisibleTime;
    } else {
      window.otLastVisibleTime = Date.now();
    }
  });
}

export async function loadMetaObject({context}: LoaderFunctionArgs) {
  try {
    const {storefront, env} = context as any;
    const metaID = env.PUBLIC_METAOBJECT_ID;
    const shopId = env.SHOP_ID;
    const OBJECT_QUERY = `#graphql
        query {
            node(id: "gid://shopify/Shop/${shopId}"){
                ...on Shop{
                    id
                    primaryDomain {
                        host
                    }
                }
            }
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
    const {metaobject, localization, node} = await storefront.query(
      OBJECT_QUERY,
      {
        cache: storefront.CacheNone(),
      },
    );
    const shop = node.primaryDomain.host;
    const metafield = metaobject.field?.value
      ? JSON.parse(metaobject.field.value)
      : {};

    const geo = await getGeoRegion(metafield.setting?.shop);
    const storeLang = localization.language.isoCode.toLowerCase();

    const appEnabled = isTrue(metafield.setting?.app_enable);
    const isShowAllRegion = isTrue(metafield.setting.show_all);
    const listRegions = metafield.setting.show_specific_region || [];

    if (
      (!geo.region && listRegions?.includes(CALIFORNIA)) ||
      listRegions?.includes(COLORADO)
    ) {
      geo.region = await getGeoRegionFromIp(geo.ip || '');
    }
    const isInRegion =
      isShowAllRegion ||
      (!isShowAllRegion &&
        listRegions.some((region: string) => isMatchRegion(geo, region)));
    const bannerCanShow = isInRegion && appEnabled;
    return {banner: metafield, bannerCanShow, storeLang, geo, shop};
  } catch (e) {
    console.log('ERROR', e);
    return {};
  }
}

export const isMatchRegion = (geo: GeoLocationInfo, region: string) => {
  switch (region) {
    case EU:
      return CST_EU_COUNTRIES.includes(geo.country_code);
    case CALIFORNIA:
      return geo.region === 'California';
    case COLORADO:
      return geo.region === 'Colorado';
    case JAPAN:
      return geo.country_code === 'JP';
    case BRAZIL:
      return geo.country_code === 'BR';
    case SINGAPORE:
      return geo.country_code === 'SG';
    default:
      return false; // Default case if none of the regions match.
  }
};
export const loadConsentSaved = (): {
  categoriesSelected: string[];
} | null => {
  const allowed = getCookie(CST_KEY.ALLOW_KEY);
  if (!allowed) {
    return null;
  }
  return JSON.parse(allowed);
};
