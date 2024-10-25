import {CSSProperties, useContext, useMemo} from 'react';
import {BannerContext} from '../Banner.tsx';
import RenderIf from '../RenderIf.tsx';
import {Reopenconf} from '~/components/lib/utils/types.ts';

const CookieButton = () => {
  const {
    onClick,
    metafield: {setting},
  } = useContext(BannerContext);
  const config: Reopenconf = setting.advanced.reopen_conf || {
    displayAs: 'icon',
    verticalMargin: 0,
    horizontalMargin: 0,
    position: 'bottom-right',
    btnText: '',
    btnColor: '',
    btnBg: '',
  };
  const isGif =
    setting.advanced.button_icon_url &&
    setting.advanced.button_icon_url.includes('.gif');
  const properties = useMemo(() => {
    const [vertical, horizontal] = config.position.split('-');
    const radius = vertical === 'bottom' ? '10px 10px 0 0' : '0 0 10px 10px';
    return {
      [vertical]: config.displayAs == 'text' ? 0 : `${config.verticalMargin}px`,
      [horizontal]: `${config.horizontalMargin}px`,
      borderRadius: radius,
    } as CSSProperties;
  }, [config]);

  return (
    <div
      onClick={() => onClick('reopen')}
      className="cst-cookie-btn"
      style={properties}
    >
      <RenderIf cond={config.displayAs === 'icon'}>
        <img
          className="cst-icon"
          src={setting.advanced?.button_icon_url}
          alt=""
          data-gif={isGif ? 'true' : ''}
        />
      </RenderIf>
      <RenderIf cond={config.displayAs !== 'icon'}>
        <div
          className="cst-btn-text"
          style={{color: config.btnColor, background: config.btnBg}}
        >
          {config.btnText}
        </div>
      </RenderIf>
    </div>
  );
};
export default CookieButton;
