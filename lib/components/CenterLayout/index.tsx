import {CSSProperties, FC, useContext, useMemo} from 'react';
import {BannerContext} from '../Banner.tsx';
import RenderIf from '../RenderIf.tsx';
import GlassEffect from '../GlassEffect.tsx';
import {isTrue} from '../../utils';
import Button from '../Buttons/Button.tsx';
import Languages from '../Buttons/Languages.tsx';
import QuickCategories from '../QuickCategories.tsx';

const CenterLayout: FC = () => {
  const {
    metafield: {setting},
    onClick,
  } = useContext<any>(BannerContext);

  const position = useMemo(() => {
    return {
      background: isTrue(setting.advanced?.glass_effect?.enable)
        ? 'transparent'
        : setting.bgcolor_popup,
      width: `${setting.popup_width}%`,
      top: `30%`,
      left: `50%`,
      transform: `translate(-50%, -50%)`,
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
        <div className="cst-center">
          <Languages />
          <div className="cst-content">
            <div className="cst-title">
              <RenderIf cond={isTrue(setting.show_icon)}>
                <img
                  src={setting.advanced?.icon_banner_url}
                  alt={setting.title}
                  width={24}
                />
              </RenderIf>
              <span>{setting.title}</span>
            </div>
            <div className="cst-message">{setting.message}</div>
          </div>
          <RenderIf cond={isTrue(setting.advanced.quick_show_category)}>
            <QuickCategories />
          </RenderIf>
          <a className="cst-privacy-text" href={setting.privacy_link}>
            {setting.info_text}
          </a>
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
export default CenterLayout;
