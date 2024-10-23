import {CSSProperties, FC, useContext, useMemo} from "react";
import {BannerContext} from "../Banner.tsx";
import RenderIf from "../RenderIf.tsx";
import GlassEffect from "../GlassEffect.tsx";
import {isTrue} from "../../utils";
import Button from "../Buttons/Button.tsx";
import Languages from "../Buttons/Languages.tsx";

const CORNER_POSITION: Record<string | number, string[]> = {
    1: ['top', 'left'],
    2: ['bottom', 'left'],
    3: ['top', 'right'],
    4: ['bottom', 'right'],
}
const FloatBanner: FC = () => {
    const {metafield: {setting}, onClick} = useContext<any>(BannerContext);
    const {settings, advancedSetting} = setting;

    const position = useMemo(() => {
        const [vertical, horizontal] = CORNER_POSITION[settings.corner_position]
        const spaceY = settings[`position_${vertical}`];
        const spaceX = settings[`position_${horizontal}`];
        return {
            [horizontal]: `${spaceX || 0}${settings.unit_space}`,
            [vertical]: `${spaceY || 0}${settings.unit_space}`,
            background: advancedSetting.glass_effect.enable ? 'transparent' : settings.bgcolor_popup,
            width: 'fit-content',
            '--cst-max-width': '40%',
            '--cst-min-width': '30%',
        } as CSSProperties
    }, [settings, advancedSetting]);

    return <div
        className='layout'
        style={{...position}}>
        <RenderIf cond={advancedSetting.glass_effect.enable}>
            <GlassEffect background={settings.bgcolor_popup} {...advancedSetting.glass_effect} />
        </RenderIf>
        <div className='container'>
            <div className='float'>
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
                <div className='buttons-wrap'
                     style={{display: 'flex', justifyContent: 'space-between', margin: '20px 10px 0'}}>
                    <a className='privacy-text' href={settings.privacy_link}>{settings.info_text}</a>
                    <div className='buttons-group' style={{flexDirection: 'row'}}>

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
    </div>
}
export default FloatBanner;