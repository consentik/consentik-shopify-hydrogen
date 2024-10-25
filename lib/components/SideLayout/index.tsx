import {CSSProperties, FC, useContext, useMemo} from 'react';
import {BannerContext} from '../Banner.tsx';
import RenderIf from '../RenderIf.tsx';
import GlassEffect from '../GlassEffect.tsx';
import {isTrue} from '../../utils';
import Button from '../Buttons/Button.tsx';
import CategoryListItem from '../CategoryListItem.tsx';
import Languages from '../Buttons/Languages.tsx';
import {ICategory, ICookie} from '../../utils/types.ts';

const SideLayout: FC = () => {
  const {
    metafield: {setting, cookieGroup},
    onClick,
    allowList,
    setAllowList,
    onSelection,
  } = useContext<any>(BannerContext);
  const {cookies, category} = cookieGroup;

  const position = useMemo(() => {
    return {
      [setting.side_position]: '0',
      background: isTrue(setting.advanced?.glass_effect?.enable)
        ? 'transparent'
        : setting.bgcolor_popup,
      height: '100%',
      top: 0,
      '--cst-max-width': '25%',
      width: '23%',
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
        <div className="cst-side">
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
            <div className="cst-message">{setting.mess_popup}</div>
            <div className="cst-categories">
              <div className="cst-heading">{setting.preferences_title}</div>
              {category &&
                category.map((item: ICategory, index: number) => {
                  const cookieItems =
                    cookies &&
                    cookies.filter((c: ICookie) => c.category_id === item.id);
                  return (
                    <CategoryListItem
                      opts={{
                        bg: setting.popup_textcolor,
                        label: setting.bgcolor_popup,
                      }}
                      checked={allowList.includes(item.category_name)}
                      onClick={onSelection}
                      key={`list_item_${index}`}
                      cookies={cookieItems}
                      item={item}
                      showCount={isTrue(
                        setting.advanced?.preferences_opts?.show_table,
                      )}
                      showTable={isTrue(
                        setting.advanced?.preferences_opts?.show_table,
                      )}
                    />
                  );
                })}
            </div>
          </div>

          <div className="cst-buttons-group">
            <RenderIf cond={isTrue(setting.show_dismiss_popup)}>
              <Button
                onClick={() => onClick('dismiss')}
                className="cst-decline"
              >
                {setting.dismiss_text}
              </Button>
            </RenderIf>
            <Button
              onClick={() => onClick('preferences')}
              className="cst-preference"
            >
              {setting.accept_selected_text}
            </Button>
            <Button onClick={() => onClick('accept')} className="cst-submit">
              {setting.accept_all_text}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SideLayout;
