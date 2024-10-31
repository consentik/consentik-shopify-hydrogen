import * as React from 'react';
import {AutoBlockOption} from '../utils/types.ts';

interface TProp {
  nonce?: string;
  option?: AutoBlockOption;
}

const CstAutoBlock: React.FC<TProp> = ({nonce, option}): React.JSX.Element => {
  if (!option) {
    return;
  }
  return (
    <script
      nonce={nonce}
      dangerouslySetInnerHTML={{
        __html: ``,
      }}
    />
  );
};
export default CstAutoBlock;
