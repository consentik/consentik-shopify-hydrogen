import {FC, memo, useContext} from 'react';
import {BannerContext} from '../Banner.tsx';
import RenderIf from '../RenderIf.tsx';
import {isTrue} from '../../utils';
import {LIST_LANGUAGES} from '../../utils/data.ts';

const Languages: FC = () => {
  const {
    metafield: {
      languages,
      setting: {advanced},
    },
    onClick,
    doLanguageChange,
    language,
  } = useContext(BannerContext);
  const {config} = languages;
  if (!config) {
    return <></>;
  }
  return (
    <div className="cst-behavior-wrap">
      <RenderIf cond={isTrue(config.active_selector) && isTrue(config.enable)}>
        <div className="cst-language-selector">
          <svg
            width="17px"
            height="17px"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            className="cst-translation-icon"
          >
            <g>
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-2.29-2.333A17.9 17.9 0 0 1 8.027 13H4.062a8.008 8.008 0 0 0 5.648 6.667zM10.03 13c.151 2.439.848 4.73 1.97 6.752A15.905 15.905 0 0 0 13.97 13h-3.94zm9.908 0h-3.965a17.9 17.9 0 0 1-1.683 6.667A8.008 8.008 0 0 0 19.938 13zM4.062 11h3.965A17.9 17.9 0 0 1 9.71 4.333 8.008 8.008 0 0 0 4.062 11zm5.969 0h3.938A15.905 15.905 0 0 0 12 4.248 15.905 15.905 0 0 0 10.03 11zm4.259-6.667A17.9 17.9 0 0 1 15.973 11h3.965a8.008 8.008 0 0 0-5.648-6.667z"></path>
            </g>
          </svg>
          <RenderIf cond={config.language_list.length > 0}>
            <select
              className="cst-language-select"
              value={language}
              onChange={(event) => doLanguageChange(event.target.value)}
            >
              {config.language_list.map((item: string) => {
                const lang = LIST_LANGUAGES.find((lg) => lg.value === item);
                return (
                  <option key={item} value={item}>
                    {lang?.label}
                  </option>
                );
              })}
            </select>
          </RenderIf>
        </div>
      </RenderIf>
      <RenderIf cond={isTrue(advanced.show_close_icon)}>
        <span onClick={() => onClick('close')} className="cst-close-icon">✕</span>
      </RenderIf>
    </div>
  );
};
export default memo(Languages);
