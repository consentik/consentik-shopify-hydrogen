import * as React from 'react';
import {Fragment} from 'react';
import RenderIf from './RenderIf.tsx';
import {IMetaField} from '../utils/types.ts';
import CstGCM from './CstGCM.tsx';
import CstSklik from './CstSklik.tsx';
import CstUET from './CstUET.tsx';
import CstAutoBlock from './CstAutoBlock.tsx';

interface IProps {
  nonce?: string;
  banner: IMetaField;
}

const CstScript: React.FC<IProps> = ({nonce, banner}): React.JSX.Element => {
  return (
    <Fragment>
      <style>{banner.setting.custom_css || ''}</style>
      <CstGCM {...banner} nonce={nonce} />
      <CstSklik sklikId={banner.integration?.sklik} nonce={nonce} />
      <CstUET UET={banner.integration?.uet} nonce={nonce} />
      <script
        nonce={nonce}
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
               new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
               j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
               'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
               })(window,document,'script','dataLayer','GTM-T535TVSJ');`,
        }}
      />
    </Fragment>
  );
};
export default CstScript;
