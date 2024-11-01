import * as React from 'react';
import {AutoBlockOption} from '../utils/types.ts';
interface TProp {
  nonce?: string;
  option?: AutoBlockOption;
}

const CstAutoBlock: React.FC<TProp> = ({
  nonce,
  option,
}): React.JSX.Element | undefined => {
  if (!option) {
    return;
  }
  const scriptList = {
    youtube: option.youtube,
    google_tag: option.googleTag,
    google_analytics: option.googleAnalytics,
    fb_pixel: option.fbPixel,
    tiktok: option.tiktok,
    twitter: option.twitter,
    pinterest: option.pinterest,
    shopify: option.shopify,
    web_pixel: option.webPixel,
    custom: option.custom,
    custom_include: option.customInclude
      ? option.customInclude
          .split(',')
          .map((item: string) => item.replace('\n', '').trim())
          .filter((item: string) => item !== '')
      : [],
  };
  const autoBlockTemplate = `function otHasMatch(t){const e=Object.entries(window.omegaBlockScopes).reduce(((t,[e,o])=>(o&&"custom"===e?t.push(...window.omegaBlockScopes.custom_include):o&&window.OMG_BLOCK_URL[e]&&t.push(...window.OMG_BLOCK_URL[e]),t)),[]),o=t.getAttribute("src"),i=t.textContent;return e.some((t=>{const e=new RegExp(t);return e.test(o)||e.test(i)}))}window.OMG_BLOCK_URL={google_tag:["googletagmanager.com/gtag/destination","googletagmanager.com/gtag/js","googletagmanager.com/gtag/","https://www.googletagmanager.com/gtm.js","googletagmanager.com/gtag/js"],google_analytics:["google-analytics.com"],fb_pixel:["connect.facebook.net","facebook-pixel.js","facebook-pixel-worker.js","infinite-fb-tiktok-pixels","https://optiapps.xyz/resources/js/optiapp-fb-p.js","one-pixel.js"],shopify:["trekkie.storefront"],web_pixel:["/web-pixel"],tiktok:["analytics.tiktok.com/i18n/pixel","tiktok-multi-pixels.js","tiktok-pixel.js"],pinterest:["https://s.pinimg.com/ct/core.js"],youtube:["www.youtube.com","www.youtube-nocookie.com"],vimeo:["player.vimeo.com"],twitter:["static.ads-twitter.com/uwt.js","static.ads-twitter.com/oct.js"],custom:[]},window.otBlockedStorage={scripts:[],iframes:[]};const otObserver=new MutationObserver((function(t){for(const e of t)if("childList"===e.type){const t=Array.from(e.addedNodes),o=t.filter((t=>"IFRAME"===t.tagName)),i=t.filter((t=>"SCRIPT"===t.tagName&&1===t.nodeType));for(const t of i)otHasMatch(t)&&(window.otBlockedStorage.scripts.push(t),t.parentElement&&t.parentElement.removeChild(t));for(const t of o)otHasMatch(t)&&(window.otBlockedStorage.iframes.push(t),t.setAttribute("data-src",t.src),t.removeAttribute("src"),t.style.display="none")}}));function otCheckAllowTracking(){if(void 0===t)function t(t){const e=t+"=",o=decodeURIComponent(document.cookie).split(";");for(let t=0;t<o.length;t++){let i=o[t];for(;" "===i.charAt(0);)i=i.substring(1);if(0===i.indexOf(e))return i.substring(e.length,i.length)}return""}let e=t("cookiesNotification",document);if(e){e=JSON.parse(e)||[];const o=e?e.categoriesSelected:[];return o.includes("marketing")||o.includes("analytics")}}function otDeniedScript(){otObserver.observe(document.documentElement,{childList:!0,subtree:!0})}function otUnlockScript(){if(window.otBlockedStorage.scripts.length>0){for(const[t,e]of window.otBlockedStorage.scripts.entries()){const t=document.createElement("script");t.type=e.type||"application/javascript",e.src?t.src=e.src:t.textContent=e.textContent,document.head.appendChild(t)}window.otBlockedStorage.scripts=[]}window.otBlockedStorage.iframes.length>0&&(window.otBlockedStorage.iframes.forEach((t=>{t.style.display="block",t.src=t.dataset.src,t.removeAttribute("data-src")})),window.otBlockedStorage.iframes=[])}!otCheckAllowTracking()&&otObserver.observe(document.documentElement,{childList:!0,subtree:!0});`;
  const config = `window['omegaBlockScopes']=${JSON.stringify(
    scriptList,
  )};${autoBlockTemplate}`;
  return (
    <script
      strategy="beforeInteractive"
      nonce={nonce}
      dangerouslySetInnerHTML={{
        __html: config,
      }}
    />
  );
};
export default CstAutoBlock;
