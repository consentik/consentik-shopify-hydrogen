import * as React from 'react';
import {Gcm, IMetaField} from '../utils/types.ts';
import {GCM_DEFAULT_GRANTED_EVENT, REGULATION_CONSENT} from '../utils/data.ts';

interface IProps {
  nonce?: string;
  setting: IMetaField['setting'];
  integration: IMetaField['integration'];
}

const CstGCM: React.FC<IProps> = ({
  nonce,
  setting,
  integration,
}): React.JSX.Element => {

  if (!setting) {
    return;
  }

  const scriptList = {
    ad_user_data: integration.gcm.adUserData,
    ad_personalization: integration.gcm.adPersonalization,
    ad_storage: integration.gcm.adStorage,
    analytics_storage: integration.gcm.analyticsStorage,
    functionality_storage: integration.gcm.functionalityStorage,
    personalization_storage: integration.gcm.personalizationStorage,
    security_storage: integration.gcm.securityStorage,
    url_passthrough: integration.gcm.urlPassthrough,
    ads_data_redaction: integration.gcm.adsDataRedaction,
  };
  let regions = Object.keys(REGULATION_CONSENT)
    .filter((key) => (setting.show_specific_region || []).includes(key))
    .reduce((obj, key) => {
      obj[key] = REGULATION_CONSENT[key];
      return obj;
    }, {});

  regions = Object.values(regions).flat();
  const region = setting.show_all ? '' : `region: ${JSON.stringify(regions)}`;
  const consentTemplate = `function otValidateDefault(e){const t=e[0]??!1,o=e[1]??!1;if(t&&"consent"==t&&o&&"default"==o){const t=e[2]??{};if(Object.values(t).length){const e=Object.keys(t),o=Object.values(t).some((e=>"granted"==e)),n=e.includes("cst_default");return!o||o&&n}return!0}if(t&&"consent"==t&&o&&"update"==o){return Object.keys(e[2]).includes("cst_update")}return!0}function gtag(){dataLayer.push(arguments)}window.dataLayer=[],window.dataLayer.push=function(...e){e.forEach((e=>{if(otValidateDefault(e)){const t=e[0]??!1,o=e[1]??!1,n=e[2]??[];if(t&&"consent"==t&&o&&"update"==o&&n&&Object.keys(n).includes("cst_update")){const{cst_update:t,...o}=n;e[2]={...o},Array.prototype.push.call(this,e)}if(t&&"consent"==t&&o&&"default"==o&&n&&Object.keys(n).includes("cst_default")){const{cst_default:t,...o}=n;e[2]={...o},Array.prototype.push.call(this,e)}else Array.prototype.push.call(this,e)}else console.log("gr d",e)}))},window.OMG_CONSENT_EXTENSION_ENABLED=!1;const otConsentObserver=new MutationObserver((function(e){for(const t of e)if("childList"===t.type){const e=Array.from(t.addedNodes).filter((e=>"SCRIPT"===e.tagName&&1===e.nodeType));for(const t of e){const e=t.getAttribute("src");if(e&&e.includes("consentik-ex"))return window.OMG_CONSENT_EXTENSION_ENABLED=!0,void otConsentObserver.disconnect()}}}));otConsentObserver.observe(document.documentElement,{childList:!0,subtree:!0}),window.dataLayer=window.dataLayer||[],function(e,t){e.otCookiesGCM={},e.otCookiesGCM={url_passthrough:!1,ads_data_redaction:!1,config:{ad_user_data:"denied",ad_personalization:"denied",ad_storage:"denied",analytics_storage:"denied",functionality_storage:"denied",personalization_storage:"denied",security_storage:"denied",wait_for_update:500,REGION_PLACEMENT}},gtag("consent","default",e.otCookiesGCM.config),DEFAULT_EVENT,addEventListener("DOMContentLoaded",(function(){const o=e.otkConsent;let n=function(e,t){const o=e+"=",n=decodeURIComponent(t.cookie),a=n.split(";");for(let e=0;e<a.length;e++){let t=a[e];for(;" "===t.charAt(0);)t=t.substring(1);if(0===t.indexOf(o))return t.substring(o.length,t.length)}return""}("cookiesNotification",t),a=!0;if(n){n=JSON.parse(n);const t=n[0].categoriesSelected;a=!t.includes("marketing"),e.otCookiesGCM.config={ad_user_data:o.ad_user_data&&t.includes("marketing")?"granted":"denied",ad_personalization:o.ad_personalization&&t.includes("marketing")?"granted":"denied",ad_storage:o.ad_storage&&t.includes("marketing")?"granted":"denied",analytics_storage:o.analytics_storage&&t.includes("analytics")?"granted":"denied",functionality_storage:o.functionality_storage&&t.includes("necessary")?"granted":"denied",personalization_storage:o.personalization_storage&&t.includes("preferences")?"granted":"denied",security_storage:o.security_storage&&t.includes("necessary")?"granted":"denied"},gtag("consent","update",{...e.otCookiesGCM.config,cst_update:"granted"})}e.otCookiesGCM.ads_data_redaction=e.otkConsent.ads_data_redaction&&a,e.otCookiesGCM.url_passthrough=e.otkConsent.url_passthrough,e.otCookiesGCM.ads_data_redaction&&gtag("set","ads_data_redaction",e.otCookiesGCM.ads_data_redaction),e.otCookiesGCM.url_passthrough&&gtag("set","url_passthrough",e.otCookiesGCM.url_passthrough)}))}(window,document);`;
  const consentScript = consentTemplate
    .replace('REGION_PLACEMENT', `${region}`)
    .replace('DEFAULT_EVENT,', !!region ? GCM_DEFAULT_GRANTED_EVENT + ',' : '');

  return (
    <script
      nonce={nonce}
      dangerouslySetInnerHTML={{
        __html: `window['otkConsent']=${JSON.stringify(
          scriptList,
        )};${consentScript}`,
      }}
    />
  );
};
export default CstGCM;
