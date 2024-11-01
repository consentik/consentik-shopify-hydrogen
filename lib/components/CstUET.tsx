import * as React from 'react';

interface IProps {
  nonce?: string;
  UET?: string;
}

const CstUET: React.FC<IProps> = ({UET, nonce}): React.JSX.Element => {
  let content = `function _otkBingConsent(){const t=("cookiesNotification",e=["marketing","analytics"],document.cookie.split(";").some((t=>(t=t.trim()).startsWith("cookiesNotification=")&&e.some((e=>t.includes(e))))));var e;!function(t,e,o){let i="";"string"!=typeof e&&(e=JSON.stringify(e));let n=window.otCookiesExpiredDate,s=new Date;s.setTime(s.getTime()+24*n*60*60*1e3),i="; expires="+s.toUTCString(),document.cookie="_uetmsdns="+e+i+"; path=/"}(0,t?0:1),window.uetq.push("consent","default",{ad_storage:"denied"}),t&&window.uetq.push("consent","update",{ad_storage:"granted"})}window.uetq=window.uetq||[],_otkBingConsent();`;
  if (UET) {
    content = `!function(e,a,n,t,o){var c,r,d;e[o]=e[o]||[],c=function(){var a={ti:123,enableAutoSpaTracking:!0};a.q=e[o],e[o]=new UET(a),e[o].push("pageLoad")},(r=a.createElement(n)).src="//bat.bing.com/bat.js",r.async=1,r.onload=r.onreadystatechange=function(){var e=this.readyState;e&&"loaded"!==e&&"complete"!==e||(c(),r.onload=r.onreadystatechange=null)},(d=a.getElementsByTagName(n)[0]).parentNode.insertBefore(r,d)}(window,document,"script",0,"uetq");${content}`;
  }
  return (
    <script
      strategy="beforeInteractive"
      nonce={nonce}
      dangerouslySetInnerHTML={{
        __html: content,
      }}
    />
  );
};
export default CstUET;
