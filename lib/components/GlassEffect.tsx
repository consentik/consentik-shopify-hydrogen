import {FC} from 'react';
import {Glasseffect} from '../utils/types.ts';
import {convertOpacityToHex} from '../utils';

interface TProps extends Omit<Glasseffect, 'enable'> {
  background: string;
}

const GlassEffect: FC<TProps> = ({opacity, background, blur}) => {
  const glassEffect = {
    backgroundColor: background + convertOpacityToHex(opacity),
    backdropFilter: `blur(${blur}px)`,
    WebkitBackdropFilter: `blur(${blur}px)`,
  };
  return (
    <div
      style={{
        ...glassEffect,
        position: 'absolute',
        left: 0,
        top: 0,
        zIndex: 0,
        width: '100%',
        height: '100%',
      }}
    />
  );
};
export default GlassEffect;