import {CSSProperties, FC, useCallback, useContext, useMemo} from "react";
import {BannerContext} from "../Banner.tsx";
import RenderIf from "../RenderIf.tsx";
import GlassEffect from "../GlassEffect.tsx";
import {isTrue} from "../../utils";
import Button from "../Buttons/Button.tsx";
import CategoryListItem from "../CategoryListItem.tsx";
import Languages from "../Buttons/Languages.tsx";
import {ICategory, ICookie} from "../../utils/types.ts";

const SideLayout: FC = () => {
    const {
        metafield: {setting, cookieGroup},
        onClick,
        allowList,
        setAllowList
    } = useContext<any>(BannerContext);
    const {settings, advancedSetting} = setting;
    const {cookies, category} = cookieGroup;

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
            [settings.side_position]: '0',
            background: advancedSetting.glass_effect.enable ? 'transparent' : settings.bgcolor_popup,
            height: '100%',
            top: 0,
            '--cst-max-width': '25%',
            width: '23%'
        } as CSSProperties
    }, [settings, advancedSetting]);

    return <div
        className='layout'
        style={{...position}}>
        <RenderIf cond={advancedSetting.glass_effect.enable}>
            <GlassEffect background={settings.bgcolor_popup} {...advancedSetting.glass_effect} />
        </RenderIf>
        <div className='container'>
            <div className='side'>
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
                    <div className='message'>
                        {settings.mess_popup}
                    </div>
                    <div className='categories'>
                        <div className='heading'>
                            {settings.preferences_title}
                        </div>
                        {category && category.map((item: ICategory, index: number) => {
                            const cookieItems = cookies && cookies.filter((c: ICookie) => c.category_id === item.id)
                            return <CategoryListItem
                                opts={{bg: settings.popup_textcolor, label: settings.bgcolor_popup}}
                                checked={allowList.includes(item.category_name)}
                                onClick={onSelection}
                                key={`list_item_${index}`}
                                cookies={cookieItems}
                                item={item}/>
                        })}
                    </div>
                </div>


                <div className='buttons-group'>
                    <RenderIf cond={isTrue(settings.show_dismiss_popup)}>
                        <Button onClick={() => onClick('dismiss')} className='decline'>
                            {settings.dismiss_text}
                        </Button>
                    </RenderIf>
                    <Button onClick={() => onClick('preferences')} className='preference'>
                        {settings.accept_selected_text}
                    </Button>
                    <Button onClick={() => onClick('accept')} className='submit'>
                        {settings.accept_all_text}
                    </Button>
                </div>
            </div>
        </div>
    </div>
}
export default SideLayout;