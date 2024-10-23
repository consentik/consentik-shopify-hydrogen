import { IDataRightPage } from "../utils/types";

const DataRightPage = () => {
  const initialData: IDataRightPage = {
    alreadyInitial: "",
    pageTitle: "",
    viewSectionTitle: "",
    viewBtnText: "",
    viewParagraph: "",
    editSectionTitle: "",
    editBtnText: "",
    editParagraph: "",
    deleteSectionTitle: "",
    deleteBtnText: "",
    deleteParagraph: "",
    requiredLoginText: "",
    requestSendingText: "",
    requestSentText: "",
    pageId: "",
    pageURL: "",
  };
  const metaField = {
    setting: [
      {
        namespace: "OmegaCookies",
        key: "otck_app_data",
        value:
          '{"settings":{"id":51,"shop":"thangnd-flower.myshopify.com","shop_id":"63034261700","message":"This website uses cookies to ensure you get the best experience on our website.","submit_text":"Got it!","info_text":"Privacy Policy","text_size":13,"privacy_link":"","dismiss_text":"Decline","prefrences_text":"Preferences","preferences_title":null,"accept_selected_text":"Allow selection","accept_all_text":"Allow all cookies","title_popup":"This website uses cookies","mess_popup":"This website is using cookies to analyze our traffic, personalize content and/or ads, to provide video content. We also share information about your use of our site with our analytics and advertising partners who may combine it with other information that you’ve provided to them or that they’ve collected from your use of their services.","title":null,"permission":"0","show_icon":"1","app_enable":"1","popup_layout":3,"fullwidth_position":1,"corner_position":4,"show_homepage":"1","show_all":"1","show_all_eu":"1","eu_countries":"[]","cache_time":7,"popup_bgcolor":"#ffffff","popup_textcolor":"#62da4c","more_textcolor":"#25a270","submit_bgcolor":"#191515","submit_textcolor":"#ffffff","custom_css":null,"show_dismiss":"1","show_dismiss_popup":"1","show_prefrences":"1","color_text_popup":"#FFFFFF","dismiss_textcolor":"#4dbd82","dismiss_bgcolor":"#332d2d","close_dismis":"0","prefrences_bgcolor":"#bfbbbb","prefrences_textcolor":"#ffffff","accept_selected_text_color":"#02909c","accept_selected_bgcolor":"#e4f3f7","accept_all_text_color":"#d5adad","accept_all_bgcolor":"#02909c","show_cookies":"1","title_color_popup":"#000000","bgcolor_popup":"#ffffff","show_specific_region":["eu"],"style_request_page":"{\\"info_bgcolor\\":\\"#ffffff\\",\\"show_bgcolor\\":\\"#2f87e4\\",\\"edit_bgcolor\\":\\"#ca2f2f\\",\\"delete_bgcolor\\":\\"#770e0e\\",\\"delete_textcolor\\":\\"#ffffff\\",\\"edit_textcolor\\":\\"#ffffff\\",\\"show_textcolor\\":\\"#ffffff\\",\\"info_textcolor\\":\\"#000000\\",\\"info_text_size\\":\\"13\\"}","banner_position":"full","side_position":"right","show_cookies_btn":"1","upgrade_date":"2024-10-11T09:44:23.000Z","dismiss_hide_banner":"1","theme_name":null,"unit_space":"%","popup_width":100,"position_top":0,"position_left":0,"position_right":0,"position_bottom":0,"enable_debugger":"0","regulation_template":null,"is_updated_cookies":"1","script_tagid":null,"plan_name":"ADVANCED"},"unpublicCookies":[],"rootLink":"https://dev.consentik.com/consentik","shopId":"63034261700","advancedSetting":{"id":104,"shop":"thangnd-flower.myshopify.com","shop_id":"63034261700","icon_banner_url":null,"button_icon_url":"/consentik/admin/dist/images/cookies-logo/logo-0.png","pages_locked":null,"required_action":"1","show_close_icon":"1","app_lang":"en","check_list":{"show_decline_btn":false,"show_preferences_btn":false,"show_cookie_reopen":false,"show_cookie_datasale":false,"add_privacy_link":false,"enable_blocking":false,"data_request":false},"is_hide_checklist":0,"schedule_enable":0,"schedule_duration":null,"schedule_interval":"no","schedule_secret":"0","banner_holiday":"0","admin_mode":false,"setup_mode":false,"banner_status":{"CHECKOUT_UI":false},"glass_effect":{"enable":true,"blur":1,"opacity":0.6},"quick_show_category":"0","delay_show":0,"gpc":0,"reopen_conf":null,"data_sale_opts":{"active":true,"showOnBanner":true,"showOnPreference":true,"saleLabel":"Do not share/sale my personal data"},"footer_link_opts":{"type":"banner","active":true},"preferences_opts":{"show_table":false,"show_count":false,"type":"custom","consent":["necessary","preferences","marketing","analytics"]},"buttons_position":{"mobile":{"dismiss":1,"prefrences":2,"submit":3},"desktop":{"prefrences":1,"submit":2,"dismiss":3}},"sklik_rtg_id":null,"bing_tag_id":null,"font_name":null,"border_style":null},"isPaid":true,"isPremium":false,"fromPlus":true,"fromAdvanced":true,"isUnlimited":false,"isFree":false}',
        type: "string",
      },
    ],
    dataRightPage: [
      {
        id: 3761,
        shop: "thangnd-flower.myshopify.com",
        shopId: "63034261700",
        keyName: "alreadyInitial",
        groupName: "dataPage",
        value: "1",
        createdAt: null,
        updatedAt: "2024-10-14T18:03:42.000Z",
      },
      {
        id: 3762,
        shop: "thangnd-flower.myshopify.com",
        shopId: "63034261700",
        keyName: "pageTitle",
        groupName: "dataPage",
        value: "Exercising data rights",
        createdAt: null,
        updatedAt: "2024-10-14T18:03:42.000Z",
      },
      {
        id: 3763,
        shop: "thangnd-flower.myshopify.com",
        shopId: "63034261700",
        keyName: "viewSectionTitle",
        groupName: "dataPage",
        value: "Data portability",
        createdAt: null,
        updatedAt: "2024-10-14T18:03:42.000Z",
      },
      {
        id: 3764,
        shop: "thangnd-flower.myshopify.com",
        shopId: "63034261700",
        keyName: "viewBtnText",
        groupName: "dataPage",
        value: "Request to view",
        createdAt: null,
        updatedAt: "2024-10-14T18:03:43.000Z",
      },
      {
        id: 3765,
        shop: "thangnd-flower.myshopify.com",
        shopId: "63034261700",
        keyName: "viewParagraph",
        groupName: "dataPage",
        value:
          "You have the right to request access to your data at any time.\n{request_view_button}",
        createdAt: null,
        updatedAt: "2024-10-14T18:03:43.000Z",
      },
      {
        id: 3766,
        shop: "thangnd-flower.myshopify.com",
        shopId: "63034261700",
        keyName: "editSectionTitle",
        groupName: "dataPage",
        value: "Data rectification",
        createdAt: null,
        updatedAt: "2024-10-14T18:03:43.000Z",
      },
      {
        id: 3767,
        shop: "thangnd-flower.myshopify.com",
        shopId: "63034261700",
        keyName: "editBtnText",
        groupName: "dataPage",
        value: "Request to edit",
        createdAt: null,
        updatedAt: "2024-10-14T18:03:43.000Z",
      },
      {
        id: 3768,
        shop: "thangnd-flower.myshopify.com",
        shopId: "63034261700",
        keyName: "editParagraph",
        groupName: "dataPage",
        value:
          "You have the right to request your data to be updated whenever you think it is appropriate.\n{request_edit_button}",
        createdAt: null,
        updatedAt: "2024-10-14T18:03:43.000Z",
      },
      {
        id: 3769,
        shop: "thangnd-flower.myshopify.com",
        shopId: "63034261700",
        keyName: "deleteSectionTitle",
        groupName: "dataPage",
        value: "Data erasure",
        createdAt: null,
        updatedAt: "2024-10-14T18:03:43.000Z",
      },
      {
        id: 3770,
        shop: "thangnd-flower.myshopify.com",
        shopId: "63034261700",
        keyName: "deleteBtnText",
        groupName: "dataPage",
        value: "Request to delete",
        createdAt: null,
        updatedAt: "2024-10-14T18:03:44.000Z",
      },
      {
        id: 3771,
        shop: "thangnd-flower.myshopify.com",
        shopId: "63034261700",
        keyName: "deleteParagraph",
        groupName: "dataPage",
        value:
          "You have the right to ask all your data to be erased. After that, the data will be cleared from database.\n{request_delete_button}",
        createdAt: null,
        updatedAt: "2024-10-14T18:03:44.000Z",
      },
      {
        id: 3772,
        shop: "thangnd-flower.myshopify.com",
        shopId: "63034261700",
        keyName: "requiredLoginText",
        groupName: "dataPage",
        value: "Please login to request",
        createdAt: null,
        updatedAt: "2024-10-14T18:03:44.000Z",
      },
      {
        id: 3773,
        shop: "thangnd-flower.myshopify.com",
        shopId: "63034261700",
        keyName: "requestSendingText",
        groupName: "dataPage",
        value: "Request sending...",
        createdAt: null,
        updatedAt: "2024-10-14T18:03:44.000Z",
      },
      {
        id: 3774,
        shop: "thangnd-flower.myshopify.com",
        shopId: "63034261700",
        keyName: "requestSentText",
        groupName: "dataPage",
        value: "Request sent",
        createdAt: null,
        updatedAt: "2024-10-14T18:03:44.000Z",
      },
      {
        id: 3887,
        shop: "thangnd-flower.myshopify.com",
        shopId: "63034261700",
        keyName: "pageId",
        groupName: "dataPage",
        value: "104191099076",
        createdAt: null,
        updatedAt: "2024-10-14T18:03:45.000Z",
      },
      {
        id: 3888,
        shop: "thangnd-flower.myshopify.com",
        shopId: "63034261700",
        keyName: "pageURL",
        groupName: "dataPage",
        value:
          "https://thangnd-flower.myshopify.com/pages/exercising-data-rights-3",
        createdAt: null,
        updatedAt: "2024-10-14T18:03:45.000Z",
      },
    ],
  };
  const dataRightPage: IDataRightPage = metaField.dataRightPage.reduce(
    (obj, item) => {
      return { ...obj, [item.keyName]: item.value };
    },
    initialData
  );
  console.log("dataRightPage", dataRightPage);

  return (
    <div className="data-right">
      <h1>{dataRightPage.pageTitle}</h1>
      <div>
        <h2>Your cookie consent</h2>
        <p>You have not consented to the cookies policy of this website</p>
      </div>
      <div className="data-por">
        <h2>{dataRightPage.viewSectionTitle}</h2>
        <p>{dataRightPage.viewParagraph}</p>
        <a className="btn-view" href="">
          {dataRightPage.viewBtnText}
        </a>
      </div>
      <div className="data-recon">
        <h2>{dataRightPage.editSectionTitle}</h2>
        <p>{dataRightPage.editParagraph}</p>
        <a href="" className="btn-edit">
          {dataRightPage.editBtnText}
        </a>
      </div>
      <div className="data-erasure">
        <h2>{dataRightPage.deleteSectionTitle}</h2>
        <p>{dataRightPage.deleteParagraph}</p>
        <a href="" className="btn-delete">
          {dataRightPage.deleteBtnText}
        </a>
      </div>
    </div>
  );
};
export default DataRightPage;
