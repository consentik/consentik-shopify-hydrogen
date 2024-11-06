import * as React from 'react';
import {Fragment} from 'react';
import {IMetaField} from '../utils/types.ts';
import RenderIf from './RenderIf.tsx';

interface IProps {
  nonce?: string;
  banner: IMetaField | undefined | null;
}

const CstScript: React.FC<IProps> = ({banner}): React.JSX.Element => {
  return (
    <Fragment>
      <RenderIf cond={!!banner}>
        <style>{banner?.setting?.custom_css || ''}</style>
        {/*<CstAutoBlock*/}
        {/*  option={banner.integration.autoBlock}*/}
        {/*  nonce={nonce}*/}
        {/*/>*/}
        {/*<CstGCM {...banner} nonce={nonce} />*/}
        {/*<CstSklik sklikId={banner.integration?.sklik} nonce={nonce} />*/}
        {/*<CstUET UET={banner.integration?.uet} nonce={nonce} />*/}
      </RenderIf>
    </Fragment>
  );
};
export default CstScript
