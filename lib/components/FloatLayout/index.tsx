import {CSSProperties, FC, useContext, useMemo} from 'react';
import {BannerContext} from '../Banner.tsx';
import RenderIf from '../RenderIf.tsx';
import GlassEffect from '../GlassEffect.tsx';
import {isTrue} from '../../utils';
import Button from '../Buttons/Button.tsx';
import Languages from '../Buttons/Languages.tsx';
import QuickCategories from '../QuickCategories.tsx'

const CORNER_POSITION: Record<string | number, string[]> = {
  1: ['top', 'left'],
  2: ['bottom', 'left'],
  3: ['top', 'right'],
  4: ['bottom', 'right'],
};
const FloatBanner: FC = () => {
  const {
    metafield: {setting},
    onClick,
  } = useContext<any>(BannerContext);

  const position = useMemo(() => {
    const [vertical, horizontal] = CORNER_POSITION[setting.corner_position];
    const spaceY = setting[`position_${vertical}`];
    const spaceX = setting[`position_${horizontal}`];
    return {
      [horizontal]: `${spaceX || 0}${setting.unit_space}`,
      [vertical]: `${spaceY || 0}${setting.unit_space}`,
      background: setting.advanced?.glass_effect?.enable
        ? 'transparent'
        : setting.bgcolor_popup,
      width: 'fit-content',
      '--cst-max-width': '40%',
      '--cst-min-width': '30%',
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
        <div className="cst-float">
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
          <div
            className="cst-buttons-wrap"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              margin: '20px 10px 0',
            }}
          >
            <a className="cst-privacy-text" href={setting.privacy_link}>
              {setting.info_text}
            </a>
            <div className="cst-buttons-group" style={{flexDirection: 'row'}}>
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
    </div>
  );
};
export default FloatBanner;
