import {CSSProperties, FC, useContext, useMemo} from "react";
import {BannerContext} from "../Banner";
import {EPosition} from "../../utils/types.ts";
import RenderIf from "../RenderIf.tsx";
import Button from "../Buttons/Button.tsx";
import {isTrue} from "../../utils";
import GlassEffect from "../GlassEffect.tsx";
import Languages from "../Buttons/Languages.tsx";

const FullLayout: FC = () => {
    const {metafield: {setting}, onClick} = useContext<any>(BannerContext);
    const {settings, advancedSetting} = setting;

    const position = useMemo(() => {
        const vertical = settings.fullwidth_position === EPosition.TOP ? 'top' : 'bottom'
        const space = settings[`position_${vertical}`];
        return {
            margin: "auto",
            [vertical]: `${space}${settings.unit_space}`,
            background: advancedSetting.glass_effect.enable ? 'transparent' : settings.bgcolor_popup,
            width: `${settings.popup_width}%`,
            left: 0,
            right: 0,
        } as CSSProperties
    }, [settings, advancedSetting]);

    return <div
        className='layout'
        style={{...position}}>
        <RenderIf cond={advancedSetting.glass_effect.enable}>
            <GlassEffect background={settings.bgcolor_popup} {...advancedSetting.glass_effect} />
        </RenderIf>
        <div className='container'>
            <div className='full' style={{paddingBottom: settings.popup_width > 40 ? 0 : 10}}>
                <Languages/>
                <div className='content' style={{paddingBottom: settings.popup_width > 40 ? 0 : 10}}>
                    <div className='title'>
                        <RenderIf cond={isTrue(settings.show_icon)}>
                            <img src={advancedSetting.icon_banner_url} alt={settings.title} width={24}/>
                        </RenderIf>
                        <span>{settings.title}</span>
                    </div>
                    <div className='message'>
                        {settings.message}
                        <a className='privacy-text' href={settings.privacy_link}>{settings.info_text}</a>
                    </div>
                </div>
                <div className='buttons-group'>
                    <RenderIf cond={isTrue(settings.show_dismiss)}>
                        <Button onClick={() => onClick('dismiss')} className='decline'>
                            {settings.dismiss_text}
                        </Button>
                    </RenderIf>
                    <RenderIf cond={isTrue(settings.show_prefrences)}>
                        <Button onClick={() => onClick('preferences')} className='preference'>
                            {settings.prefrences_text}
                        </Button>
                    </RenderIf>
                    <Button onClick={() => onClick('accept')} className='submit'>
                        {settings.submit_text}
                    </Button>
                </div>
            </div>
        </div>
    </div>
}
export default FullLayout;