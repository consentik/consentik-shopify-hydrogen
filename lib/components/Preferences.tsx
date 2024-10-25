import RenderIf from './RenderIf.tsx';
import {isTrue} from '../utils';
import Button from './Buttons/Button.tsx';
import {
  CSSProperties,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from 'react';
import {BannerContext} from './Banner.tsx';
import GlassEffect from './GlassEffect.tsx';
import CategoryListItem from './CategoryListItem.tsx';
import {EFullLayout, ICategory, ICookie} from '../utils/types.ts';
import Languages from './Buttons/Languages.tsx';

const Preferences = () => {
  const {
    metafield: {
      setting,
      cookieGroup: {cookies, category},
    },
    onClick,
    allowList,
    setAllowList,
    onSelection,
  } = useContext<any>(BannerContext);

  const position = useMemo(() => {
    return {
      background: isTrue(setting.advanced?.glass_effect?.enable)
        ? 'transparent'
        : setting.bgcolor_popup,
      top: '10%',
      left: 0,
      right: 0,
      margin: 'auto',
      animationName: 'slideDown',
      animationDuration: '.7s',
      minWidth: '35%',
      minHeight: '35%',
      width: '50%',
      boxShadow: 'rgb(0 0 0 / 35%) 0 5px 15px',
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
        <div className="cst-layout-preference">
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
            <div className="cst-heading">{setting.title_popup}</div>
            <div className="cst-scroll-area">
              <div className="cst-message">{setting.mess_popup}</div>
              <div className="cst-categories">
                <div className="cst-heading">{setting.preferences_title}</div>
                {category &&
                  category.map((item: ICategory) => {
                    const cookieItems =
                      cookies &&
                      cookies.filter(
                        (c: ICookie) =>
                          c.category_id === item.id ||
                          c.category_id === item.base_on,
                      );
                    return (
                      <CategoryListItem
                        showTable={isTrue(
                          setting.advanced.preferences_opts?.show_table,
                        )}
                        showCount={isTrue(
                          setting.advanced.preferences_opts?.show_count,
                        )}
                        opts={{
                          bg: setting.bgcolor_popup,
                          label: setting.popup_textcolor,
                        }}
                        checked={allowList.includes(item.name_consent)}
                        onClick={onSelection}
                        key={`category-${item.id}`}
                        cookies={cookieItems}
                        item={item}
                      />
                    );
                  })}
              </div>
            </div>
          </div>
          <div
            className="cst-buttons-group"
            style={{
              justifyContent:
                setting.popup_layout === EFullLayout.CENTER ? 'center' : 'end',
            }}
          >
            <RenderIf cond={isTrue(setting.show_dismiss_popup)}>
              <Button
                onClick={() => onClick('dismiss')}
                className="cst-decline"
              >
                {setting.dismiss_text}
              </Button>
            </RenderIf>
            <Button onClick={() => onClick('allow')} className="cst-allow">
              {setting.accept_selected_text}
            </Button>
            <Button
              onClick={() => onClick('allow_all')}
              className="cst-allow-all"
            >
              {setting.accept_all_text}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Preferences;
