import * as React from 'react';
import {IMetaField} from '../utils/types.ts';
import {GCM_DEFAULT_GRANTED_EVENT, REGULATION_CONSENT} from '../utils/data.ts';
interface IProps {
  nonce?: string;
  setting: IMetaField['setting'];
  integration: IMetaField['integration'];
}
export type TRegulationType = typeof REGULATION_CONSENT

const CstGCM: React.FC<IProps> = ({
  nonce,
  setting,
  integration,
}): React.JSX.Element | undefined => {
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
    .reduce((obj: any, key: string) => {
      obj[key] = REGULATION_CONSENT[key as keyof TRegulationType];
      return obj;
    }, {});

  regions = Object.values(regions).flat();
  const region = setting.show_all ? '' : `region: ${JSON.stringify(regions)}`;
  const consentTemplate = `function otValidateDefault(e){const t=e[0]??!1,a=e[1]??!1;if(t&&"consent"==t&&a&&"default"==a){const t=e[2]??{};if(Object.values(t).length){const e=Object.keys(t),a=Object.values(t).some((e=>"granted"==e)),n=e.includes("cst_default");return!a||a&&n}return!0}if(t&&"consent"==t&&a&&"update"==a){return Object.keys(e[2]).includes("cst_update")}return!0}function gtag(){dataLayer.push(arguments)}window.dataLayer=[],window.dataLayer.push=function(...e){e.forEach((e=>{if(otValidateDefault(e)){const t=e[0]??!1,a=e[1]??!1,n=e[2]??[];if(t&&"consent"==t&&a&&"update"==a&&n&&Object.keys(n).includes("cst_update")){const{cst_update:t,...a}=n;e[2]={...a},Array.prototype.push.call(this,e)}if(t&&"consent"==t&&a&&"default"==a&&n&&Object.keys(n).includes("cst_default")){const{cst_default:t,...a}=n;e[2]={...a},Array.prototype.push.call(this,e)}else Array.prototype.push.call(this,e)}else console.log("gr d",e)}))},window.dataLayer=window.dataLayer||[],function(e,t){e.otCookiesGCM={},e.otCookiesGCM={url_passthrough:!1,ads_data_redaction:!1,config:{ad_user_data:"denied",ad_personalization:"denied",ad_storage:"denied",analytics_storage:"denied",functionality_storage:"denied",personalization_storage:"denied",security_storage:"denied",wait_for_update:500,REGION_PLACEMENT}},gtag("consent","default",e.otCookiesGCM.config),DEFAULT_EVENT,addEventListener("DOMContentLoaded",(function(){const a=e.otkConsent;let n=function(e,t){const a=e+"=",n=decodeURIComponent(t.cookie),o=n.split(";");for(let e=0;e<o.length;e++){let t=o[e];for(;" "===t.charAt(0);)t=t.substring(1);if(0===t.indexOf(a))return t.substring(a.length,t.length)}return""}("cookiesNotification",t),o=!0;if(n){n=JSON.parse(n);const t=n.categoriesSelected;o=!t.includes("marketing"),e.otCookiesGCM.config={ad_user_data:a.ad_user_data&&t.includes("marketing")?"granted":"denied",ad_personalization:a.ad_personalization&&t.includes("marketing")?"granted":"denied",ad_storage:a.ad_storage&&t.includes("marketing")?"granted":"denied",analytics_storage:a.analytics_storage&&t.includes("analytics")?"granted":"denied",functionality_storage:a.functionality_storage&&t.includes("necessary")?"granted":"denied",personalization_storage:a.personalization_storage&&t.includes("preferences")?"granted":"denied",security_storage:a.security_storage&&t.includes("necessary")?"granted":"denied"},gtag("consent","update",{...e.otCookiesGCM.config,cst_update:"granted"})}e.otCookiesGCM.ads_data_redaction=e.otkConsent.ads_data_redaction&&o,e.otCookiesGCM.url_passthrough=e.otkConsent.url_passthrough,e.otCookiesGCM.ads_data_redaction&&gtag("set","ads_data_redaction",e.otCookiesGCM.ads_data_redaction),e.otCookiesGCM.url_passthrough&&gtag("set","url_passthrough",e.otCookiesGCM.url_passthrough)}))}(window,document);`;
  const consentScript = consentTemplate
    .replace('REGION_PLACEMENT', `${region}`)
    .replace('DEFAULT_EVENT,', !!region ? GCM_DEFAULT_GRANTED_EVENT + ',' : '');

  return (
    <script
      strategy="beforeInteractive"
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
