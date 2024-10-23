import SideLayout from "./SideLayout";
import CenterLayout from "./CenterLayout";
import FloatLayout from "./FloatLayout";
import FullLayout from "./FullLayout";
import {createContext, CSSProperties, FC, Fragment, useCallback, useEffect, useState} from "react";
import {CST_KEY, getCookie, isTrue, onGetMetaField, setCookie} from "../utils";
import RenderIf from "./RenderIf";
import {EFullLayout, ETypePopup, IBannerText, ICategory, ICookie, IMetaField} from "../utils/types.ts";
import CookieButton from "./Buttons/CookieButton.tsx";
import Preferences from "./Preferences.tsx";
import {useCustomerPrivacy, VisitorConsent} from "@shopify/hydrogen";
import {useLoaderData} from "@remix-run/react";
import '../style.css'

// import {useLoaderData} from "@remix-run/react";

export const BannerContext = createContext<Record<string, any>>({});
export type TBannerDisplay = 'banner' | 'preference' | 'reopen';
export type TButtonType = 'close' | 'reopen' | 'dismiss' | 'accept' | 'preferences' | 'allow' | 'allow_all';

interface IProps {

}

const Banner: FC<IProps> = ({}) => {
    const {consent} = useLoaderData();
    const {customerPrivacy} = useCustomerPrivacy({
        storefrontAccessToken: consent.storefrontAccessToken, //'40f2ca97fd1bfab0e143f9e62c2a94fa',
        checkoutDomain: consent.checkoutDomain, //'thangnd-headless.myshopify.com',
        onVisitorConsentCollected: (consent) => console.log('CONNECTED', consent)
    });
    const onPushConsent = (options: VisitorConsent) => customerPrivacy && customerPrivacy.setTrackingConsent(options, (console.log))
    const [metafield, setMetaField] = useState<IMetaField | Record<string, any>>({})
    const [showBanner, setBannerShow] = useState<TBannerDisplay | null>('reopen');
    const [allowList, setAllowList] = useState<string[]>([])
    const [language, setLanguage] = useState('en')
    const setting = metafield.setting || {};

    console.log('advancedSetting', metafield)
    const onClick = useCallback(async (btnType: TButtonType) => {

        switch (btnType) {
            case 'close':
            case 'dismiss':
                setBannerShow('reopen');
                await onPushConsent({
                    analytics: false,
                    marketing: false,
                    preferences: false,
                    sale_of_data: false
                })
                break;
            case 'allow_all':
            case 'accept':
                setCookie(CST_KEY.ALLOW_KEY, JSON.stringify({categoriesSelected: metafield.cookieGroup.category.map((item: ICategory) => item.category_name)}))
                setBannerShow('reopen');
                await onPushConsent({
                    analytics: true,
                    marketing: true,
                    preferences: true,
                    sale_of_data: true
                })
                break;
            case 'allow':
                setCookie(CST_KEY.ALLOW_KEY, JSON.stringify({categoriesSelected: allowList}))
                setBannerShow('reopen');
                await onPushConsent({
                    analytics: allowList.includes('analytics'),
                    marketing: allowList.includes('marketing'),
                    preferences: allowList.includes('preferences'),
                    sale_of_data: false
                })
                break;
            case 'reopen':
                setBannerShow('banner')
                break;
            case 'preferences':
                setBannerShow('preference')
                break;
            default:
                break;
        }
    }, [allowList, metafield.cookieGroup])

    const doLanguageChange = useCallback((language: string) => {
        const bannerText = metafield.languages.bannerText.find((item: IBannerText) => item.language === language)
        const cookies = metafield.languages.cookies.filter((item: ICookie) => item.language === language)
        const categories = metafield.languages.categories.filter((item: ICategory) => item.language === language)
        setMetaField((prev) => ({
            ...prev,
            cookieGroup: {cookies, category: categories},
            setting: {
                ...prev.setting,
                settings: {
                    ...prev.setting.settings,
                    ...bannerText
                }
            }
        }))
        setCookie(CST_KEY.LANGUAGE, language)
        setLanguage(language)
    }, [language, metafield.languages])

    useEffect(() => {
        const allowed = getCookie(CST_KEY.ALLOW_KEY);
        if (allowed) {
            const selected = JSON.parse(allowed)
            setAllowList(selected.categoriesSelected)
        }
    }, [showBanner]);

    useEffect(() => {

        onGetMetaField(consent.shop).then(({setting, languages, cookieGroup}: IMetaField | Record<string, any>) => {
            window.CACHE_TIME = setting?.settings?.cache_time || 0;
            const isTranslation = languages?.config.enable;
            if (!isTranslation) {
                setMetaField({setting, languages, cookieGroup})
                return;
            }
            let prevLang = getCookie(CST_KEY.LANGUAGE)
            let defaultLang = prevLang || languages.config.default_language;
            const bannerText = languages.bannerText.find((item: IBannerText) => item.language === defaultLang)
            setLanguage(defaultLang)
            setCookie(CST_KEY.LANGUAGE, defaultLang)
            setMetaField({
                cookieGroup,
                languages,
                canShowBanner: true,
                setting: {
                    ...setting,
                    settings: {
                        ...setting.settings,
                        ...bannerText
                    }
                },
            });
        })
    }, []);

    if (!setting.settings?.app_enable || !metafield.canShowBanner) {
        return <></>
    }
    const {settings, advancedSetting} = setting;

    const {mobile, desktop} = advancedSetting.buttons_position || {
        mobile: {"submit": 1, "dismiss": 2, "prefrences": 3},
        desktop: {"submit": 1, "dismiss": 2, "prefrences": 3},
    }
    const cstProperties = {
        '--cst-table-bg-th': settings.popup_textcolor,
        '--cst-table-color-th': settings.bgcolor_popup,
        '--cst-bg': settings.bgcolor_popup,
        '--cst-text-color': settings.popup_textcolor,
        '--cst-banner-textcolor-fade': settings.popup_textcolor + '80',
        '--cst-banner-bg-fade': settings.popup_textcolor + '40',
        '--cst-text-size': `${settings.text_size}px`,
        '--cst-submit-color': settings.submit_textcolor,
        '--cst-submit-bg': settings.submit_bgcolor,
        '--cst-dismiss-bg': settings.dismiss_bgcolor,
        '--cst-dismiss-color': settings.dismiss_textcolor,
        '--cst-pref-color': settings.prefrences_textcolor,
        '--cst-privacy-color': settings.more_textcolor,
        '--cst-pref-bg': settings.prefrences_bgcolor,
        '--cst-btn-radius': `${advancedSetting.border_style == 'sharp' ? 0 : advancedSetting.border_style == 'rounded' ? 8 : 25}px`,
        '--cst-text-direction': settings.popup_width > 40 ? 'row' : 'column',
        '--cst-content-display': settings.popup_width > 40 ? 'block' : 'flex',
        '--cst-content-direction': settings.popup_width > 40 ? 'block' : 'flex',
        '--cst-btn-direction': settings.popup_width <= 40 || settings.popup_width > 60 ? 'row' : 'column',
        '--cst-dismiss-desktop-index': desktop.dismiss,
        '--cst-pref-desktop-index': desktop.prefrences,
        '--cst-submit-desktop-index': desktop.submit,
        '--cst-dismiss-mobile-index': mobile.dismiss,
        '--cst-pref-mobile-index': mobile.prefrences,
        '--cst-submit-mobile-index': mobile.submit,
    } as CSSProperties

    return <Fragment>
        <RenderIf cond={isTrue(advancedSetting.required_action) && showBanner !== 'reopen'}>
            <div id='consentik-backdrop'/>
        </RenderIf>
        <div
            role='presentation'
            id='consentik-cookie-banner'
            className='consentik-cookie-banner'
            style={cstProperties}>
            <BannerContext.Provider value={{
                metafield,
                allowList,
                setAllowList,
                onClick,
                showBanner,
                doLanguageChange,
                language,
                setBannerShow,
            }}>
                <RenderIf cond={showBanner == 'preference'}>
                    <Preferences/>
                </RenderIf>
                <RenderIf cond={setting.settings.banner_position === ETypePopup.SIDE && showBanner == 'banner'}>
                    <SideLayout/>
                </RenderIf>
                <RenderIf cond={setting.settings.banner_position === ETypePopup.FULL && showBanner == 'banner'}>
                    <RenderIf cond={setting.settings.popup_layout === EFullLayout.CENTER}>
                        <CenterLayout/>
                    </RenderIf>
                    <RenderIf cond={setting.settings.popup_layout === EFullLayout.FLOAT}>
                        <FloatLayout/>
                    </RenderIf>
                    <RenderIf cond={setting.settings.popup_layout === EFullLayout.FULL}>
                        <FullLayout/>
                    </RenderIf>
                </RenderIf>
                <RenderIf cond={isTrue(setting.settings.show_cookies_btn) && showBanner == 'reopen'}>
                    <CookieButton/>
                </RenderIf>
            </BannerContext.Provider>
        </div>
    </Fragment>
}
export default Banner;