import {CSSProperties, FC, memo, useContext, useMemo} from 'react';
import {BannerContext} from '../Banner';
import {EPosition} from '../../utils/types.ts';
import RenderIf from '../RenderIf.tsx';
import Button from '../Buttons/Button.tsx';
import {isTrue} from '../../utils';
import GlassEffect from '../GlassEffect.tsx';
import Languages from '../Buttons/Languages.tsx';

const FullLayout: FC = () => {
  const {
    metafield: {setting},
    onClick,
  } = useContext<any>(BannerContext);

  const position = useMemo(() => {
    const vertical =
      setting.fullwidth_position === EPosition.TOP ? 'top' : 'bottom';
    const space = setting[`position_${vertical}`];
    return {
      margin: 'auto',
      [vertical]: `${space}${setting.unit_space}`,
      background: isTrue(setting.advanced?.glass_effect?.enable)
        ? 'transparent'
        : setting.bgcolor_popup,
      width: `${setting.popup_width}%`,
      left: 0,
      right: 0,
    } as CSSProperties;
  }, [setting]);

  return (
    <div className="cst-layout" style={{...position}}>
      <RenderIf cond={isTrue(setting.advanced?.glass_effect?.enable)}>
        <GlassEffect
          background={setting.bgcolor_popup}
          {...setting.advanced?.glass_effect}
        />
      </RenderIf>
      <div className="cst-container">
        <div
          className="cst-full"
          style={{
            paddingBottom: setting.popup_width > 50 ? 0 : 10,
          }}
        >
          <Languages />
          <div
            className="cst-content"
            style={{
              paddingBottom: setting.popup_width > 50 ? 0 : 10,
              marginTop: 0,
            }}
          >
            <RenderIf cond={!!setting.title || isTrue(setting.show_icon)}>
              <div className="cst-title">
                <RenderIf cond={isTrue(setting.show_icon)}>
                  <img
                    src={setting.advanced.icon_banner_url}
                    alt={setting.title}
                    width={24}
                  />
                </RenderIf>
                <span>{setting.title}</span>
              </div>
            </RenderIf>
            <div className="cst-message">
              <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
                {setting.message}
              </div>
              <a className="cst-privacy-text" href={setting.privacy_link}>
                {setting.info_text}
              </a>
            </div>
          </div>
          <div className="cst-buttons-group">
            <RenderIf cond={isTrue(setting.show_dismiss)}>
              <Button
                onClick={() => onClick('dismiss')}
                className="cst-decline"
              >
                {setting.dismiss_text}
              </Button>
            </RenderIf>
            <RenderIf cond={isTrue(setting.show_prefrences)}>
              <Button
                onClick={() => onClick('preferences')}
                className="cst-preference"
              >
                {setting.prefrences_text}
              </Button>
            </RenderIf>
            <Button onClick={() => onClick('accept')} className="cst-submit">
              {setting.submit_text}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default memo(FullLayout);
