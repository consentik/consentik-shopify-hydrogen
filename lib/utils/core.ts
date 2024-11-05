import {CustomerPrivacy} from '@shopify/hydrogen';
import {ETypeEvent, Gcm, GeoLocationInfo, IMetaField} from './types.ts';
import {
  getUserAgent,
  isTrue,
  otUpdateDuration,
  sendImpression,
} from './index.ts';
import {CSSProperties} from 'react';

const DENIED = 'denied';
const GRANTED = 'granted';
const MARKETING = 'marketing';
const ANALYTICS = 'analytics';
const NECESSARY = 'necessary';
const PREFERENCE = 'preferences';

function _gtag(...args: any[]) {
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push(args);
}

export function cstUpdateEUT(
  allowList: string[],
  isFromPremium = false,
  isFromAdvanced = false,
) {
  const isMarketingOrAnalyticsAccepted =
    allowList.includes(MARKETING) || allowList.includes(ANALYTICS);
  const isValidPlan = isFromPremium || isFromAdvanced;
  //@ts-ignore
  const isValidUET = window.uetq && isValidPlan && typeof _otkBingConsent != 'undefined';
  const adsStorage = {
    ad_storage: isMarketingOrAnalyticsAccepted ? 'granted' : 'denied',
  };
  const cookieVal = isMarketingOrAnalyticsAccepted ? 0 : 1;
  if (isValidUET) {
    window.uetq = window.uetq || [];
    window.uetq.push('consent', 'update', adsStorage);
    cstSetCookie('_uetmsdns', cookieVal);
  }
}

export function cstUpdateSklik(
  allowList: string[],
  sklikId: string,
  isFromPremium = false,
  isFromAdvanced = false,
) {
  const isMarketingOrAnalyticsAccepted =
    allowList.includes(MARKETING) || allowList.includes(ANALYTICS);
  const isValidPlan = isFromPremium || isFromAdvanced;
  //@ts-ignore
  const isValidSklik = window.rc?.retargetingHit && isValidPlan;
  const retargetId = sklikId || null;
  const consent = isMarketingOrAnalyticsAccepted ? 1 : 0;
  //@ts-ignore
  const retargetingConf = window.retargetingConf ? window.retargetingConf : {consent: consent, rtgId: retargetId}
  const appRetargetingConf = {
    ...retargetingConf,
    consent: consent,
    rtgId: retargetId,
  }
  if (isValidSklik) {
    //@ts-ignore
    window.rc.retargetingHit(appRetargetingConf);
  }
}

export function cstUpdateGCM(allowList: string[], gcm: Gcm) {
  window.cstCookiesGCM = {
    ad_user_data:
      gcm.adUserData && allowList.includes(MARKETING) ? 'granted' : 'denied',
    ad_personalization:
      gcm.adPersonalization && allowList.includes(MARKETING) ? GRANTED : DENIED,
    ad_storage:
      gcm.adStorage && allowList.includes(MARKETING) ? 'granted' : 'denied',
    analytics_storage:
      gcm.analyticsStorage && allowList.includes(ANALYTICS) ? GRANTED : DENIED,
    functionality_storage:
      gcm.functionalityStorage && allowList.includes(NECESSARY)
        ? GRANTED
        : DENIED,
    personalization_storage:
      gcm.personalizationStorage && allowList.includes(PREFERENCE)
        ? GRANTED
        : DENIED,
    security_storage:
      gcm.securityStorage && allowList.includes(NECESSARY) ? GRANTED : DENIED,
  };
  if (allowList.length === 0) {
    window.cstCookiesGCM = {
      ad_user_data: DENIED,
      ad_personalization: DENIED,
      ad_storage: DENIED,
      analytics_storage: DENIED,
      functionality_storage: DENIED,
      personalization_storage: DENIED,
      security_storage: DENIED,
      ads_data_redaction: gcm.adsDataRedaction,
      url_passthrough: gcm.urlPassthrough,
    };
  } else {
    window.cstCookiesGCM.ads_data_redaction =
      gcm.adsDataRedaction && !allowList.includes(MARKETING);
  }
  _gtag('consent', 'update', {cst_update: 'granted', ...window.cstCookiesGCM});
  window.cstCookiesGCM.ads_data_redaction &&
    _gtag('set', 'ads_data_redaction', window.cstCookiesGCM.ads_data_redaction);
  window.cstCookiesGCM.url_passthrough &&
    _gtag('set', 'url_passthrough', window.cstCookiesGCM.url_passthrough);
}

export function cstUnblockScript(
  allowed: string[],
  isFromPlus = false,
  isFromPremium = false,
) {
  const isAcceptedTracking =
    allowed.includes(MARKETING) || allowed.includes(MARKETING);
  if (
    window.otBlockedStorage?.scripts?.length > 0 &&
    (isFromPremium || isFromPlus) &&
    isAcceptedTracking
  ) {
    for (const [index, node] of window.otBlockedStorage.scripts.entries()) {
      const n = document.createElement('script');
      n.type = node.type || 'application/javascript';
      if (node.src) {
        n.src = node.src;
      } else {
        n.textContent = node.textContent;
      }
      document.head.appendChild(n);
    }
    window.otBlockedStorage.scripts = [];
  }
}

export function cstSetCookie(name: string, value: any, days?: number) {
  let expires = '';
  if (typeof value !== 'string') {
    value = JSON.stringify(value);
  }
  let expiredDate = window.CACHE_TIME;
  if (days) {
    expiredDate = days;
  }
  let date = new Date();
  date.setTime(date.getTime() + expiredDate * 24 * 60 * 60 * 1000);
  expires = '; expires=' + date.toUTCString();
  document.cookie = name + '=' + value + expires + '; path=/';
}

export function cstInitGPC(customerPrivacy: CustomerPrivacy) {
  if (!customerPrivacy) {
    return;
  }
  //@ts-ignore
  const isGPCSignal = navigator.globalPrivacyControl;
  const saleOfDataAllowed = customerPrivacy.saleOfDataAllowed();
  const saleData = !(isGPCSignal || saleOfDataAllowed);
  const currentConsent = customerPrivacy.currentVisitorConsent() || {
    marketing: undefined,
    analytics: undefined,
    preferences: undefined,
  };
  customerPrivacy.setTrackingConsent(
    {...currentConsent, sale_of_data: saleData},
    () => {},
  );
}

export async function cstSendTracking(
  type: ETypeEvent,
  shop: string,
  geo: GeoLocationInfo,
  page: string,
  allowList?: string[],
) {
  if (type === ETypeEvent.show) {
    window.otDurationDiff = 0;
    window.otImpressionStartTime = Date.now();
    window.otLastVisibleTime = window.otImpressionStartTime;
    otUpdateDuration();
  }
  const userAgent = getUserAgent(geo.ip);
  if (!document.hidden) {
    window.otDurationDiff += Date.now() - window.otLastVisibleTime;
  }
  const duration =
    window.otImpressionStartTime && !document.hidden
      ? (window.otDurationDiff / 1000).toFixed(2)
      : null;
  const extraInfo =
    type == ETypeEvent.show
      ? {}
      : {
          category: allowList?.length === 0 ? [] : allowList,
          ip: geo.ip,
          dur: duration,
        };
  await sendImpression({
    shop: shop,
    event: type,
    country: geo.country_code,
    p: page,
    ...userAgent,
    ...extraInfo,
  });
}

export function cstVariablesStyle(metaobject: IMetaField) {
  if (!metaobject.setting) {
    return {};
  }

  const {setting, languages} = metaobject;
  const isFullWidth = setting.popup_width > 50;
  const hasTitle = !!setting.title;

  const {mobile, desktop} = setting.advanced?.buttons_position || {
    mobile: {dismiss: 1, prefrences: 2, submit: 3},
    desktop: {dismiss: 1, prefrences: 2, submit: 3},
  };
  return {
    '--cst-table-bg-th': setting.popup_textcolor,
    '--cst-table-color-th': setting.bgcolor_popup,
    '--cst-bg': setting.bgcolor_popup,
    '--cst-text-color': setting.popup_textcolor,
    '--cst-banner-textcolor-fade': setting.popup_textcolor + '80',
    '--cst-banner-bg-fade': setting.popup_textcolor + '40',
    '--cst-text-size': `${setting.text_size}px`,
    '--cst-submit-color': setting.submit_textcolor,
    '--cst-submit-bg': setting.submit_bgcolor,
    '--cst-dismiss-bg': setting.dismiss_bgcolor,
    '--cst-dismiss-color': setting.dismiss_textcolor,
    '--cst-pref-color': setting.prefrences_textcolor,
    '--cst-privacy-color': setting.more_textcolor,
    '--cst-pref-bg': setting.prefrences_bgcolor,
    '--cst-allow-bg': setting.accept_selected_bgcolor,
    '--cst-allow-color': setting.accept_selected_text_color,
    '--cst-allow-all-color': setting.accept_all_text_color,
    '--cst-allow-all-bg': setting.accept_all_bgcolor,
    '--cst-btn-radius': `${
      setting.advanced?.border_style == 'sharp'
        ? 0
        : setting?.advanced?.border_style == 'rounded'
        ? 8
        : 25
    }px`,
    '--cst-text-direction': isFullWidth ? 'row' : 'column',
    '--cst-content-display': isFullWidth ? 'flex' : 'block',
    '--cst-content-direction': isFullWidth && hasTitle ? 'row' : 'column',
    '--cst-btn-direction':
      !isFullWidth || setting.popup_width > 60 ? 'row' : 'column',
    '--cst-dismiss-desktop-index': desktop.dismiss,
    '--cst-pref-desktop-index': desktop.prefrences,
    '--cst-submit-desktop-index': desktop.submit,
    '--cst-dismiss-mobile-index': mobile.dismiss,
    '--cst-pref-mobile-index': mobile.prefrences,
    '--cst-submit-mobile-index': mobile.submit,
    '--cst-full-padding':
      (isTrue(languages?.config?.enable) && !isFullWidth
        ? 25
        : isFullWidth
        ? 5
        : 0) + 'px',
  } as CSSProperties;
}
