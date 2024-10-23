import RenderIf from "./RenderIf.tsx";
import {isTrue} from "../utils";
import Button from "./Buttons/Button.tsx";
import {CSSProperties, useCallback, useContext, useMemo} from "react";
import {BannerContext} from "./Banner.tsx";
import GlassEffect from "./GlassEffect.tsx";
import CategoryListItem from "./CategoryListItem.tsx";
import {EFullLayout, ICategory, ICookie} from "../utils/types.ts";
import Languages from "./Buttons/Languages.tsx";

const Preferences = () => {
    const {
        metafield: {
            setting: {settings, advancedSetting},
            cookieGroup: {cookies, category}
        },
        onClick,
        allowList,
        setAllowList,
    } = useContext<any>(BannerContext);

    const onSelection = useCallback((name: string, checked: boolean) => {
        setAllowList((prev: string[]) => {
            if (!checked) {
                const names = prev.filter((i: string) => i !== name);
                return [...new Set(names)]
            }
            return [...new Set([...prev, name])]
        });
    }, [allowList]);

    const position = useMemo(() => {
        return {
            background: advancedSetting.glass_effect.enable ? 'transparent' : settings.bgcolor_popup,
            top: '10%',
            left: 0,
            right: 0,
            margin: 'auto',
            animationName: 'slideDown',
            animationDuration: '.7s',
            minWidth: '35%',
            minHeight: '35%',
            width: '50%',
            boxShadow: 'rgb(0 0 0 / 35%) 0 5px 15px'
        } as CSSProperties
    }, [settings, advancedSetting]);

    return <div className='layout' style={{...position}}>
        <RenderIf cond={advancedSetting.glass_effect.enable}>
            <GlassEffect background={settings.bgcolor_popup}{...advancedSetting.glass_effect} />
        </RenderIf>
        <div className='container'>
            <div className='layout-preference'>
                <Languages/>
                <div className='content'>
                    <div className='title'>
                        <RenderIf cond={isTrue(settings.show_icon)}>
                            <img src={advancedSetting.icon_banner_url} alt={settings.title} width={24}/>
                        </RenderIf>
                        <span>{settings.title}</span>
                    </div>
                    <div className='heading'>
                        {settings.title_popup}
                    </div>
                    <div className='scroll-area'>
                        <div className='message'>
                            {settings.mess_popup}
                        </div>
                        <div className='categories'>
                            <div className='heading'>
                                {settings.preferences_title}
                            </div>
                            {category && category.map((item: ICategory) => {
                                const cookieItems = cookies && cookies.filter((c: ICookie) => c.category_id === item.id || c.category_id === item.base_on)
                                return <CategoryListItem
                                    opts={{bg: settings.bgcolor_popup, label: settings.popup_textcolor}}
                                    checked={allowList.includes(item.category_name)}
                                    onClick={onSelection}
                                    key={`category-${item.id}`}
                                    cookies={cookieItems}
                                    item={item}/>
                            })}
                        </div>
                    </div>
                </div>
                <div className='buttons-group'
                     style={{justifyContent: settings.popup_layout === EFullLayout.CENTER ? 'center' : 'end'}}>
                    <RenderIf cond={isTrue(settings.show_dismiss_popup)}>
                        <Button onClick={() => onClick('dismiss')} className='decline'>
                            {settings.dismiss_text}
                        </Button>
                    </RenderIf>
                    <Button onClick={() => onClick('allow')} className='preference'>
                        {settings.accept_selected_text}
                    </Button>
                    <Button onClick={() => onClick('allow_all')} className='submit'>
                        {settings.accept_all_text}
                    </Button>
                </div>
            </div>
        </div>
    </div>
}
export default Preferences;