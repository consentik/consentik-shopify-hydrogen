import SideLayout from './SideLayout';
import CenterLayout from './CenterLayout';
import FloatLayout from './FloatLayout';
import FullLayout from './FullLayout';
import {
  createContext,
  FC,
  Fragment,
  memo,
  useCallback,
  useEffect,
  useState,
} from 'react';
import {
  CST_KEY,
  getCookie,
  isTrue,
  loadConsentSaved,
  setCookie,
  setCookieStorage,
} from '../utils';
import RenderIf from './RenderIf';
import {
  EFullLayout,
  ETypeEvent,
  ETypePopup,
  GeoLocationInfo,
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
import '../style.css';
import {HOME_PATHS} from '../utils/data.ts';
import {
  cstInitGPC,
  cstSendTracking,
  cstUpdateEUT,
  cstUpdateGCM,
  cstUnblockScript,
  cstUpdateSklik,
  cstVariablesStyle,
  resetConsent,
} from '../utils/core.ts';

interface TLoaderData {
  geo: GeoLocationInfo;
  banner: IMetaField;
  storeLang: string;
  bannerCanShow: boolean;
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

const Banner: FC<IProps> = ({
  banner,
  geo,
  bannerCanShow,
  storeLang,
  consent,
}) => {
  if (!banner.setting) {
    return <></>;
  }
  // const {banner, consent} = useLoaderData<TLoaderData>();
  const {customerPrivacy} = useCustomerPrivacy({
    storefrontAccessToken: consent.storefrontAccessToken,
    checkoutDomain: consent.checkoutDomain,
    onVisitorConsentCollected: (consent: VisitorConsentCollected) =>
      console.log('CONNECTED', consent),
  });
  const onPushConsent = useCallback(
    (options: VisitorConsent) => {
      if (!banner.setting?.isPaid) {
        return;
      }
      customerPrivacy &&
        customerPrivacy.setTrackingConsent(options, console.log);
    },
    [banner.setting?.isPaid],
  );

  const [metafield, setMetaField] = useState<IMetaField | Record<string, any>>(
    banner,
  );
  const [pageInfo, setPageInfo] = useState<string>('page');
  const [canShow, setCanShow] = useState(false);
  const [showBanner, setBannerShow] = useState<TBannerDisplay | null>('reopen');
  const [allowList, setAllowList] = useState<string[]>([]);
  const [language, setLanguage] = useState(storeLang);

  const cstProperties = cstVariablesStyle(banner);

  const sendTrackingImpression = useCallback(
    async (type: ETypeEvent) => {
      const allowed = loadConsentSaved();
      await cstSendTracking(
        type,
        banner.setting.shop,
        geo,
        pageInfo,
        allowed?.categoriesSelected,
      );
    },
    [pageInfo, geo, banner.setting],
  );

  const onClick = useCallback(
    async (btnType: TButtonType) => {
      switch (btnType) {
        case 'close':
          setBannerShow('reopen');
          break;
        case 'dismiss': {
          setBannerShow('reopen');
          const allowed = {
            analytics: false,
            marketing: false,
            preferences: false,
          };
          await onPushConsent({
            ...allowed,
            sale_of_data: false,
          });
          setCookieStorage([], banner.resetConsent);
          await sendTrackingImpression(ETypeEvent.declined);
          cstUpdateGCM([], banner.integration.gcm);
          cstUpdateEUT(
            [],
            banner.setting.fromPlus,
            banner.setting.fromAdvanced,
          );
          cstUpdateSklik([], banner.integration.sklik);
          break;
        }
        case 'allow_all':
        case 'accept': {
          const allowed = metafield?.cookieGroup?.category.map(
            (item: ICategory) => item.name_consent,
          );
          setCookieStorage(allowed,banner.resetConsent);
          cstUpdateGCM(allowed, banner.integration.gcm);
          cstUpdateEUT(
            allowed,
            banner.setting.fromPlus,
            banner.setting.fromAdvanced,
          );
          cstUpdateSklik(allowed, banner.integration.sklik);
          cstUnblockScript(
            allowed,
            banner.setting.fromPlus,
            banner.setting.fromAdvanced,
          );
          setBannerShow('reopen');
          await onPushConsent({
            analytics: true,
            marketing: true,
            preferences: true,
            sale_of_data: true,
          });
          await sendTrackingImpression(ETypeEvent.accepted);
          break;
        }
        case 'allow': {
          setCookieStorage(allowList, banner.resetConsent);
          setBannerShow('reopen');
          await onPushConsent({
            analytics: allowList.includes('analytics'),
            marketing: allowList.includes('marketing'),
            preferences: allowList.includes('preferences'),
            sale_of_data: false,
          });
          cstUpdateGCM(allowList, banner.integration.gcm);
          cstUnblockScript(
            allowList,
            banner.setting.fromPlus,
            banner.setting.fromAdvanced,
          );
          cstUpdateEUT(
            allowList,
            banner.setting.fromPlus,
            banner.setting.fromAdvanced,
          );
          cstUpdateSklik(allowList, banner.integration.sklik);
          await sendTrackingImpression(ETypeEvent.accepted_partial);
          break;
        }
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
    [allowList, metafield?.cookieGroup, banner.resetConsent],
  );
  const onSelection = useCallback(
    (name: string, checked: boolean) => {
      setAllowList((prev: string[]) => {
        if (!checked) {
          const names = prev.filter((i: string) => i !== name);
          return [...new Set(names)];
        }
        return [...new Set([...prev, name])];
      });
    },
    [allowList],
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
    [language, banner.languages],
  );

  useEffect(() => {
    const allowed = loadConsentSaved();
    const defaultSelection = banner.setting.advanced?.preferences_opts?.consent;
    if (allowed) {
      setAllowList(allowed.categoriesSelected);
    } else {
      setAllowList(defaultSelection || []);
    }
  }, [showBanner, banner.setting.advanced.preferences_opts]);

  useEffect(() => {
    window.CACHE_TIME = Number(banner.setting.cache_time);
    window.CST_ROOT_LINK = banner.setting.rootLink;
    if (banner.resetConsent) {
      if (banner.setting.isPremium || banner.setting.fromAdvanced) {
        resetConsent(banner.resetConsent);
      }
    }

    if (banner.setting.isPaid && isTrue(banner.setting.advanced.gpc)) {
      //@ts-ignore
      cstInitGPC(customerPrivacy);
    }
    const path = encodeURI(window.location.pathname);
    const [_, page] = path.split('/');
    switch (page) {
      case '':
      case 'undefined':
        setPageInfo('home');
        break;
      case 'collections':
        setPageInfo('collection');
        break;
      case 'products':
        setPageInfo('product');
        break;
    }
    const allowed = loadConsentSaved();
    // const adminMode = isTrue(banner.setting.advanced?.admin_mode);
    // const setupMode = isTrue(banner.setting.advanced?.setup_mode);
    const showHomePage = isTrue(banner.setting.show_homepage);
    const homePageOnly =
      typeof window !== 'undefined' &&
      !HOME_PATHS.includes(window.location.pathname) &&
      showHomePage;
    const timeDelay = banner.setting.advanced.delay_show;
    const hideOnDismiss = isTrue(banner.setting.dismiss_hide_banner);
    const isDismissed = allowed?.categoriesSelected.length == 0;
    let canShow = bannerCanShow;
    if (homePageOnly) {
      canShow = false;
    }
    if (isDismissed && hideOnDismiss) {
      setBannerShow('reopen');
    }
    setTimeout(
      () => {
        setCanShow(canShow);
      },
      timeDelay ? timeDelay * 1000 : 0,
    );
  }, [banner.setting, bannerCanShow]);

  useEffect(() => {
    if (banner && showBanner === 'banner') {
      sendTrackingImpression(ETypeEvent.show).then(() => {});
    }
  }, [bannerCanShow, showBanner]);

  useEffect(() => {
    const prevLang = getCookie(CST_KEY.LANGUAGE);
    const tranEnabled = isTrue(banner.languages?.config.enable);
    const defaultLang =
      prevLang ||
      storeLang ||
      banner.languages?.config.default_language ||
      'en';
    if (tranEnabled) {
      doLanguageChange(defaultLang);
    }
  }, [banner.languages]);

  return (
    <RenderIf cond={isTrue(banner.setting?.app_enable) && canShow}>
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
              onSelection,
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
