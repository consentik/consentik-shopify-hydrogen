import * as React from 'react';
import {Fragment} from 'react';
const ConsentikHead: React.FC<any> = ({banner}): React.JSX.Element => {
  return (
    <Fragment>
      <style>{banner.setting.custom_css || ''}</style>
    </Fragment>
  );
};
export default ConsentikHead;
