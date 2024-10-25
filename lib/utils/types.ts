export interface TMetaObject {
  key: string;
  value: string;
  namespace: string;
}

export interface IMetaField {
  canShowBanner: boolean;
  setting: IBanner;
  languages: ILanguage;
  cookieGroup: {category: ICategory[]; cookies: ICookie[]};
}

interface IBanner extends Settings {
  unpublicCookies: any[];
  rootLink: string;
  shopId: string;
  advanced: AdvancedSetting;
  isPaid: boolean;
  isPremium: boolean;
  fromPlus: boolean;
  fromAdvanced: boolean;
  isUnlimited: boolean;
  isFree: boolean;
}

interface AdvancedSetting {
  id: number;
  shop: string;
  shop_id: string;
  icon_banner_url?: any;
  button_icon_url: string;
  pages_locked?: any;
  required_action: string;
  show_close_icon: string;
  app_lang: string;
  check_list: Checklist;
  is_hide_checklist: number;
  schedule_enable: number;
  schedule_duration?: any;
  schedule_interval: string;
  schedule_secret: string;
  banner_holiday: string;
  admin_mode: boolean;
  setup_mode: boolean;
  banner_status: Bannerstatus;
  glass_effect: Glasseffect;
  quick_show_category: string;
  delay_show: number;
  gpc: number;
  reopen_conf: Reopenconf;
  data_sale_opts: Datasaleopts;
  footer_link_opts: Footerlinkopts;
  preferences_opts: Preferencesopts;
  buttons_position: Buttonsposition;
  sklik_rtg_id?: any;
  bing_tag_id?: any;
  font_name: string;
  border_style: string;
}

interface ILanguageConfig {
  id: number;
  shop: string;
  shop_id: string;
  default_language: string;
  language_detection_method: 'url' | 'store' | 'browser' | 'geo';
  enable: string;
  language_list: string[];
  active_selector: string;
}

export interface IDataRightPage {
  alreadyInitial: string;
  pageTitle: string;
  viewSectionTitle: string;
  viewBtnText: string;
  viewParagraph: string;
  editSectionTitle: string;
  editBtnText: string;
  editParagraph: string;
  deleteSectionTitle: string;
  deleteBtnText: string;
  deleteParagraph: string;
  requiredLoginText: string;
  requestSendingText: string;
  requestSentText: string;
  pageId: string;
  pageURL: string;
}

export interface IBannerText {
  message: string;
  submit_text: string;
  info_text: string;
  dismiss_text: string;
  prefrences_text: string;
  preferences_title: string;
  accept_selected_text: string;
  accept_all_text: string;
  title_popup: string;
  mess_popup: string;
  title: string;
  reopen_text: string;
  language: string;
  data_sale_label: string;
}

export interface ILanguage {
  rootLink: string;
  config: ILanguageConfig;
  bannerText: IBannerText[];
  cookies: ICookie[];
  categories: ICategory[];
}

interface Buttonsposition {
  mobile: Mobile;
  desktop: Mobile;
}

interface Mobile {
  dismiss: number;
  submit: number;
  prefrences: number;
}

interface Preferencesopts {
  show_table: boolean;
  show_count: boolean;
  type: string;
  consent: string[];
}

interface Footerlinkopts {
  active: boolean;
  type: string;
}

interface Datasaleopts {
  active: boolean;
  showOnBanner: boolean;
  showOnPreference: boolean;
  saleLabel: string;
}

interface Reopenconf {
  displayAs: string;
  btnText: string;
  position: string;
  horizontalMargin: number;
  verticalMargin: number;
  btnColor: string;
  btnBg: string;
}

export interface Glasseffect {
  enable: boolean;
  blur: number;
  opacity: number;
}

export interface ICategory {
  id: number;
  category_status: boolean;
  category_name: string;
  category_description: string;
  is_scaned: boolean;
  is_necessary: boolean;
  language: string;
  name_consent: string;
  base_on: number;
}

export interface ICookie {
  id: number;
  category_id: number;
  cookie_name: string;
  cookie_description: string;
  provider: string;
  path: string;
  domain: string;
  retention: string;
  type: string;
  language: string;
  is_scanned: boolean;
}

interface Bannerstatus {
  TRIP: boolean;
  GDPR: boolean;
  CONSENT_LOG: boolean;
  HOLIDAY: string;
  CROSS_SALE_TAGFLY: boolean;
  CROSS_SALE_QUANTITY: boolean;
  PARTNER_BANNER: number;
  DASHBOARD_CS_BANNER: string;
  CHECKOUT_UI: boolean;
}

interface Checklist {
  show_decline_btn: boolean;
  show_preferences_btn: boolean;
  show_cookie_reopen: boolean;
  show_cookie_datasale: boolean;
  add_privacy_link: boolean;
  enable_blocking: boolean;
  data_request: boolean;
}

interface Settings {
  id: number;
  shop: string;
  shop_id: string;
  message: string;
  submit_text: string;
  info_text: string;
  text_size: number;
  privacy_link: string;
  dismiss_text: string;
  prefrences_text: string;
  preferences_title: string;
  accept_selected_text: string;
  accept_all_text: string;
  title_popup: string;
  mess_popup: string;
  title: string;
  permission: string;
  show_icon: string;
  app_enable: string;
  popup_layout: number;
  fullwidth_position: number;
  corner_position: number;
  show_homepage: string;
  show_all: string;
  show_all_eu: string;
  eu_countries: string;
  cache_time: number;
  popup_bgcolor: string;
  popup_textcolor: string;
  more_textcolor: string;
  submit_bgcolor: string;
  submit_textcolor: string;
  custom_css: string;
  show_dismiss: string;
  show_dismiss_popup: string;
  show_prefrences: string;
  color_text_popup: string;
  dismiss_textcolor: string;
  dismiss_bgcolor: string;
  close_dismis: string;
  prefrences_bgcolor: string;
  prefrences_textcolor: string;
  accept_selected_text_color: string;
  accept_selected_bgcolor: string;
  accept_all_text_color: string;
  accept_all_bgcolor: string;
  show_cookies: string;
  title_color_popup: string;
  bgcolor_popup: string;
  show_specific_region?: any;
  style_request_page: string;
  banner_position: string;
  side_position: string;
  show_cookies_btn: string;
  upgrade_date: string;
  dismiss_hide_banner: string;
  theme_name: string;
  unit_space: string;
  popup_width: number;
  position_top: number;
  position_left: number;
  position_right: number;
  position_bottom: number;
  enable_debugger: string;
  regulation_template?: any;
  is_updated_cookies: string;
  script_tagid?: any;
  plan_name: string;
}

export enum ETypePopup {
  SIDE = 'side',
  FULL = 'full',
}

export enum EFullLayout {
  FULL = 1,
  FLOAT = 2,
  CENTER = 3,
}

export enum EPlace {
  LEFT = 'left',
  RIGHT = 'right',
  TOP = 'top',
  BOTTOM = 'bottom',
}

export enum EPosition {
  TOP = 1,
  BOTTOM = 2,
  RIGHT = 4,
  LEFT = 3,
}
