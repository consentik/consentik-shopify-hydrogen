import {CSSProperties, useContext, useMemo} from "react";
import {BannerContext} from "../Banner.tsx";
import RenderIf from "../RenderIf.tsx";

const CookieButton = () => {
    const {onClick, metafield: {setting}} = useContext(BannerContext);
    const {advancedSetting} = setting;
    const config = advancedSetting.reopen_conf;
    const isGif = advancedSetting.button_icon_url && advancedSetting.button_icon_url.includes('.gif')

    const properties = useMemo(() => {
        const [vertical, horizontal] = config.position?.split('-');
        const radius = vertical === 'bottom' ? '10px 10px 0 0' : '0 0 10px 10px'
        return {
            [vertical]: config.displayAs == 'text' ? 0 : `${config.verticalMargin}px`,
            [horizontal]: `${config.horizontalMargin}px`,
            borderRadius: radius
        } as CSSProperties
    }, [config]);

    return <div onClick={() => onClick('reopen')} className='otk-cookie-btn' style={properties}>
        <RenderIf cond={config.displayAs === 'icon'}>
            <img src={advancedSetting.button_icon_url} alt='' data-gif={isGif ? "true" : ""}/>
        </RenderIf>
        <RenderIf cond={config.displayAs !== 'icon'}>
            <div className='btn-text' style={{color: config.btnColor, background: config.btnBg}}>{config.btnText}</div>
        </RenderIf>
    </div>
}
export default CookieButton;