import {useContext} from 'react';
import {BannerContext} from '../components/Banner.tsx';
import {ICategory} from '../utils/types.ts';
import SwitchBtn from './Buttons/Switch.tsx';

const QuickCategories = () => {
    const {
        metafield: {
            setting,
            cookieGroup: {category},
        },
        allowList,
        onSelection,
    } = useContext<any>(BannerContext);
    return (
        <div className="cst-quick-category">
            {category &&
                category.map((item: ICategory) => {
                    return (
                        <div className="cst-quick-category-item" key={item.name_consent}>
                            <SwitchBtn
                                disabled={item.name_consent === 'necessary'}
                                defaultChecked={item.name_consent === 'necessary'}
                                backgroundHint={setting.bgcolor_popup}
                                background={setting.popup_textcolor}
                                checked={allowList.includes(item.name_consent)}
                                onSwitch={(checked) => onSelection(item.name_consent, checked)}
                                id={item.name_consent}
                            />
                            <span>{item.category_name}</span>
                        </div>
                    );
                })}
        </div>
    );
};
export default QuickCategories;
