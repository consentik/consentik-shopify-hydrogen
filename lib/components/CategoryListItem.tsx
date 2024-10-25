import {ICategory, ICookie} from '../utils/types.ts';
import {FC, useState} from 'react';
import SwitchBtn from './Buttons/Switch.tsx';
import RenderIf from './RenderIf.tsx';

interface TProps {
  item: ICategory;
  cookies: ICookie[];
  onClick: (name: string, checked: boolean) => void;
  checked: boolean;
  showTable: boolean;
  showCount: boolean;
  opts?: {bg: string; label: string};
}

const CategoryListItem: FC<TProps> = ({
  item,
  opts,
  checked,
  onClick,
  showCount,
  showTable,
  cookies,
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={`cst-category-item ${open ? 'cst-active' : ''}`}>
      <div className="cst-panel">
        <div className="cst-name" onClick={() => setOpen(!open)}>
          <svg
            style={{
              transform: open ? 'rotate(90deg)' : 'rotate(0deg)',
            }}
            viewBox="0 0 24 24"
            width="24"
            height="24"
            stroke="#9B4F10"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="css-i6dzq1"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
          {item.category_name}
          <RenderIf cond={showCount}>
            <span>({cookies.length})</span>
          </RenderIf>
        </div>
        <div className="cst-actions">
          <SwitchBtn
            disabled={item.name_consent === 'necessary'}
            defaultChecked={item.name_consent === 'necessary'}
            backgroundHint={opts?.bg}
            background={opts?.label}
            checked={checked}
            onSwitch={() => onClick(item.name_consent, !checked)}
            id={item.category_name}
          />
        </div>
      </div>
      <div className="cst-pane">
        <div className="cst-description">{item.category_description}</div>
        <RenderIf cond={showTable}>
          <details>
            <summary>Cookie details</summary>
            <ul className="cst-cookies-detail-list">
              {cookies.map((cookie, index) => {
                return (
                  <li
                    key={`cookie-${cookie.category_id}-${index}`}
                    className="cst-cookie-detail-item"
                  >
                    <dl>
                      <dt>Name</dt>
                      <dd>{cookie.cookie_name}</dd>
                      <dt>Provider</dt>
                      <dd>{cookie.provider}</dd>
                      <dt>Domain</dt>
                      <dd>{cookie.domain}</dd>
                      <dt>Path</dt>
                      <dd>{cookie.path}</dd>
                      <dt>Type</dt>
                      <dd>{cookie.type}</dd>
                      <dt>Retention</dt>
                      <dd>{cookie.retention}</dd>
                      <dt>Purpose</dt>
                      <dd>{cookie.cookie_description}</dd>
                    </dl>
                  </li>
                );
              })}
            </ul>
          </details>
        </RenderIf>
      </div>
    </div>
  );
};
export default CategoryListItem;
