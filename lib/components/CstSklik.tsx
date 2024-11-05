import * as React from 'react';
import {Fragment} from 'react';
import {Script} from '@shopify/hydrogen';

const CstSKlik: React.FC<{nonce?: string; sklikId?: string}> = ({
  sklikId,
  nonce,
}): React.JSX.Element | undefined => {
  if (!sklikId) {
    return;
  }
  return (
    <Fragment>
      <Script
        nonce={nonce}
        type="text/javascript"
        src="https://c.seznam.cz/js/rc.js"
      />
      <script
        // strategy="beforeInteractive"
        nonce={nonce}
        dangerouslySetInnerHTML={{
          __html: `var retargetingConf={rtgId:${sklikId},consent:0};function _otkSklikConsent(t=0){window.sznIVA?.IS.updateIdentities({eid:null});var n,e;const i=(n="cookiesNotification",e=["marketing","analytics"],document.cookie.split(";").some((t=>(t=t.trim()).startsWith(n+"=")&&e.some((n=>t.includes(n))))))?1:t;retargetingConf={...retargetingConf,consent:i},window.rc?.retargetingHit(retargetingConf)}_otkSklikConsent();`,
        }}
      />
    </Fragment>
  );
};
export default CstSKlik;
