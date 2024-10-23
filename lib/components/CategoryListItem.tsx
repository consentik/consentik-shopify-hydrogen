import {ICategory, ICookie} from "../utils/types.ts";
import {FC, useState} from "react";
import SwitchBtn from "./Buttons/Switch.tsx";
import RenderIf from "./RenderIf.tsx";

interface TProps {
    item: ICategory,
    cookies: ICookie[],
    onClick: (name: string, checked: boolean) => void,
    checked: boolean,
    opts?: { bg: string, label: string }
}

const CategoryListItem: FC<TProps> = ({item, opts, checked, onClick, cookies}) => {
    const [open, setOpen] = useState(false);
    return <div className={`category-item ${open ? 'active' : ''}`}>
        <div className='panel'>
            <div className='name' onClick={() => setOpen(!open)}>
                <svg style={{
                    transform: open ? 'rotate(90deg)' : 'rotate(0deg)'
                }} viewBox="0 0 24 24" width="24" height="24" stroke="#9B4F10" strokeWidth="2" fill="none"
                     strokeLinecap="round" strokeLinejoin="round" className="css-i6dzq1">
                    <polyline points="9 18 15 12 9 6"/>
                </svg>
                {item.category_name}
            </div>
            <div className='actions'>
                <SwitchBtn
                    disabled={item.category_name === 'Necessary'}
                    defaultChecked={item.category_name === 'Necessary'}
                    backgroundHint={opts?.bg}
                    background={opts?.label}
                    checked={checked}
                    onSwitch={() => onClick(item.category_name, !checked)}
                    id={item.category_name}/>
            </div>
        </div>
        <RenderIf cond={cookies.length > 0}>
            <div className='pane'>
                <div className='description'>{item.category_description}</div>
                <details>
                    <summary>Cookie details</summary>
                    <ul className='cst-cookies-detail-list'>
                        {cookies.map((cookie, index) => {
                            return <li key={`cookie-${cookie.category_id}-${index}`} className='cst-cookie-detail-item'>
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
                        })}
                    </ul>
                </details>

            </div>
        </RenderIf>
    </div>
}
export default CategoryListItem;