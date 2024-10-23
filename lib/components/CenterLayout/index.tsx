import {CSSProperties, FC, useContext, useMemo} from "react";
import {BannerContext} from "../Banner.tsx";
import RenderIf from "../RenderIf.tsx";
import GlassEffect from "../GlassEffect.tsx";
import {isTrue} from "../../utils";
import Button from "../Buttons/Button.tsx";
import Languages from "../Buttons/Languages.tsx";

const CenterLayout: FC = () => {
    const {metafield: {setting}, onClick} = useContext<any>(BannerContext);
    const {settings, advancedSetting} = setting;

    const position = useMemo(() => {
        return {
            background: advancedSetting.glass_effect.enable ? 'transparent' : settings.bgcolor_popup,
            width: `${settings.popup_width}%`,
            top: `30%`,
            left: `50%`,
            transform: `translate(-50%, -50%)`
        } as CSSProperties
    }, [settings, advancedSetting]);

    return <div
        className='layout'
        style={{...position}}>
        <RenderIf cond={advancedSetting.glass_effect.enable}>
            <GlassEffect background={settings.bgcolor_popup} {...advancedSetting.glass_effect} />
        </RenderIf>
        <div className='container'>
            <div className='center'>
                <Languages/>
                <div className='content'>
                    <div className='title'>
                        <RenderIf cond={isTrue(settings.show_icon)}>
                            <img src={advancedSetting.icon_banner_url} alt={settings.title} width={24}/>
                        </RenderIf>
                        <span>{settings.title}</span>
                    </div>
                    <div className='message'>
                        {settings.message}
                    </div>
                </div>
                <a className='privacy-text' href={settings.privacy_link}>{settings.info_text}</a>
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
export default CenterLayout;