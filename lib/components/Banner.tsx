import SideLayout from './SideLayout';
import CenterLayout from './CenterLayout';
import FloatLayout from './FloatLayout';
import FullLayout from './FullLayout';
import {
  createContext,
  CSSProperties,
  FC,
  Fragment,
  memo,
  useCallback,
  useEffect,
  useState,
} from 'react';
import {CST_KEY, getCookie, isTrue, setCookie} from '../utils';
import RenderIf from './RenderIf';
import {
  EFullLayout,
  ETypePopup,
  IBannerText,
  ICategory,
  ICookie,
  IMetaField,
} from '../utils/types.ts';
import CookieButton from './Buttons/CookieButton.tsx';
import Preferences from './Preferences.tsx';
import {
  useCustomerPrivacy,
  VisitorConsent,
  VisitorConsentCollected,
} from '@shopify/hydrogen';
import {useLoaderData} from '@remix-run/react';
import '../style.css';

interface TLoaderData {
  banner: IMetaField;
  consent: {storefrontAccessToken: string; checkoutDomain: string};
}

export const BannerContext = createContext<Record<string, any>>({});
export type TBannerDisplay = 'banner' | 'preference' | 'reopen';
export type TButtonType =
  | 'close'
  | 'reopen'
  | 'dismiss'
  | 'accept'
  | 'preferences'
  | 'allow'
  | 'allow_all';

interface IProps extends TLoaderData {}

const Banner: FC<IProps> = ({banner, consent}) => {
  // const {banner, consent} = useLoaderData<TLoaderData>();
  const {customerPrivacy} = useCustomerPrivacy({
    storefrontAccessToken: consent.storefrontAccessToken,
    checkoutDomain: consent.checkoutDomain,
    onVisitorConsentCollected: (consent: VisitorConsentCollected) =>
      console.log('CONNECTED', consent),
  });
  const onPushConsent = (options: VisitorConsent) =>
    customerPrivacy && customerPrivacy.setTrackingConsent(options, console.log);

  const [metafield, setMetaField] = useState<IMetaField | Record<string, any>>(
    banner,
  );

  const [showBanner, setBannerShow] = useState<TBannerDisplay | null>('banner');
  const [allowList, setAllowList] = useState<string[]>([]);
  const [language, setLanguage] = useState('en');

  const onClick = useCallback(
    async (btnType: TButtonType) => {
      switch (btnType) {
        case 'close':
        case 'dismiss':
          setBannerShow('reopen');
          await onPushConsent({
            analytics: false,
            marketing: false,
            preferences: false,
            sale_of_data: false,
          });
          break;
        case 'allow_all':
        case 'accept':
          setCookie(
            CST_KEY.ALLOW_KEY,
            JSON.stringify({
              categoriesSelected: metafield.cookieGroup.category.map(
                (item: ICategory) => item.category_name,
              ),
            }),
          );
          setBannerShow('reopen');
          await onPushConsent({
            analytics: true,
            marketing: true,
            preferences: true,
            sale_of_data: true,
          });
          break;
        case 'allow':
          setCookie(
            CST_KEY.ALLOW_KEY,
            JSON.stringify({categoriesSelected: allowList}),
          );
          setBannerShow('reopen');
          await onPushConsent({
            analytics: allowList.includes('analytics'),
            marketing: allowList.includes('marketing'),
            preferences: allowList.includes('preferences'),
            sale_of_data: false,
          });
          break;
        case 'reopen':
          setBannerShow('banner');
          break;
        case 'preferences':
          setBannerShow('preference');
          break;
        default:
          break;
      }
    },
    [allowList, metafield.cookieGroup],
  );

  const doLanguageChange = useCallback(
    (language: string) => {
      const bannerText = metafield.languages.bannerText.find(
        (item: IBannerText) => item.language === language,
      );
      const cookies = metafield.languages.cookies.filter(
        (item: ICookie) => item.language === language,
      );
      const categories = metafield.languages.categories.filter(
        (item: ICategory) => item.language === language,
      );
      setMetaField((prev) => ({
        ...prev,
        cookieGroup: {cookies, category: categories},
        canShowBanner: true,
        setting: {
          ...prev.setting,
          ...bannerText,
        },
      }));
      setCookie(CST_KEY.LANGUAGE, language);
      setLanguage(language);
    },
    [language, metafield.languages],
  );

  const {mobile, desktop} = banner.setting?.advanced?.buttons_position || {
    mobile: {submit: 1, dismiss: 2, prefrences: 3},
    desktop: {submit: 1, dismiss: 2, prefrences: 3},
  };
  const isFullWidth = banner.setting.popup_width > 50;

  const cstProperties = !banner.setting
    ? {}
    : ({
        '--cst-table-bg-th': banner.setting.popup_textcolor,
        '--cst-table-color-th': banner.setting.bgcolor_popup,
        '--cst-bg': banner.setting.bgcolor_popup,
        '--cst-text-color': banner.setting.popup_textcolor,
        '--cst-banner-textcolor-fade': banner.setting.popup_textcolor + '80',
        '--cst-banner-bg-fade': banner.setting.popup_textcolor + '40',
        '--cst-text-size': `${banner.setting.text_size}px`,
        '--cst-submit-color': banner.setting.submit_textcolor,
        '--cst-submit-bg': banner.setting.submit_bgcolor,
        '--cst-dismiss-bg': banner.setting.dismiss_bgcolor,
        '--cst-dismiss-color': banner.setting.dismiss_textcolor,
        '--cst-pref-color': banner.setting.prefrences_textcolor,
        '--cst-privacy-color': banner.setting.more_textcolor,
        '--cst-pref-bg': banner.setting.prefrences_bgcolor,
        '--cst-allow-bg': banner.setting.accept_selected_bgcolor,
        '--cst-allow-color': banner.setting.accept_selected_text_color,
        '--cst-allow-all-color': banner.setting.accept_all_text_color,
        '--cst-allow-all-bg': banner.setting.accept_all_bgcolor,
        '--cst-btn-radius': `${
          banner.setting?.advanced?.border_style == 'sharp'
            ? 0
            : banner.setting?.advanced?.border_style == 'rounded'
            ? 8
            : 25
        }px`,
        '--cst-text-direction': isFullWidth ? 'row' : 'column',
        '--cst-content-display': isFullWidth ? 'block' : 'flex',
        '--cst-content-direction': isFullWidth ? 'row' : 'column',
        '--cst-btn-direction':
          !isFullWidth || banner.setting.popup_width > 60 ? 'row' : 'column',
        '--cst-dismiss-desktop-index': desktop.dismiss,
        '--cst-pref-desktop-index': desktop.prefrences,
        '--cst-submit-desktop-index': desktop.submit,
        '--cst-dismiss-mobile-index': mobile.dismiss,
        '--cst-pref-mobile-index': mobile.prefrences,
        '--cst-submit-mobile-index': mobile.submit,
        '--cst-full-padding':
          (isTrue(banner.languages?.config?.enable) && !isFullWidth
            ? 25
            : isFullWidth
            ? 5
            : 0) + 'px',
      } as CSSProperties);

  useEffect(() => {
    const allowed = getCookie(CST_KEY.ALLOW_KEY);
    if (allowed) {
      const selected = JSON.parse(allowed);
      setAllowList(selected.categoriesSelected);
    }
  }, [showBanner]);

  useEffect(() => {
    const prevLang = getCookie(CST_KEY.LANGUAGE);
    const defaultLang =
      prevLang || banner.languages?.config.default_language || 'en';
    doLanguageChange(defaultLang);
  }, [banner.languages]);

  return (
    <RenderIf
      cond={isTrue(banner.setting?.app_enable) && metafield.canShowBanner}
    >
      <Fragment>
        <RenderIf
          cond={
            isTrue(banner.setting?.advanced?.required_action) &&
            showBanner !== 'reopen'
          }
        >
          <div id="cst-consentik-backdrop" />
        </RenderIf>
        <div
          role="presentation"
          id="cst-consentik-cookie-banner"
          className="cst-consentik-cookie-banner"
          style={cstProperties}
        >
          <BannerContext.Provider
            value={{
              metafield,
              allowList,
              setAllowList,
              onClick,
              showBanner,
              doLanguageChange,
              language,
              setBannerShow,
            }}
          >
            <RenderIf cond={showBanner == 'preference'}>
              <Preferences />
            </RenderIf>
            <RenderIf
              cond={
                banner.setting?.banner_position === ETypePopup.SIDE &&
                showBanner == 'banner'
              }
            >
              <SideLayout />
            </RenderIf>
            <RenderIf
              cond={
                banner.setting?.banner_position === ETypePopup.FULL &&
                showBanner == 'banner'
              }
            >
              <RenderIf
                cond={banner.setting?.popup_layout === EFullLayout.CENTER}
              >
                <CenterLayout />
              </RenderIf>
              <RenderIf
                cond={banner.setting?.popup_layout === EFullLayout.FLOAT}
              >
                <FloatLayout />
              </RenderIf>
              <RenderIf
                cond={banner.setting?.popup_layout === EFullLayout.FULL}
              >
                <FullLayout />
              </RenderIf>
            </RenderIf>
            <RenderIf
              cond={
                isTrue(banner.setting?.show_cookies_btn) &&
                showBanner == 'reopen'
              }
            >
              <CookieButton />
            </RenderIf>
          </BannerContext.Provider>
        </div>
      </Fragment>
    </RenderIf>
  );
};
export default memo(Banner);
