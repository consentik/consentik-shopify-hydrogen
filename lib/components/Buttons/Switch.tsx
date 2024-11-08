import {CSSProperties, FC} from 'react';

interface TProps {
  style?: CSSProperties;
  disabled?: boolean;
  id: string;
  size?: 'small' | 'default';
  checked?: boolean;
  defaultChecked?: boolean;
  onSwitch?: (checked: boolean, id: string, evt: any) => void;
  background?: string;
  backgroundHint?: string;
}

const SwitchBtn: FC<TProps> = ({
  style,
  disabled,
  id,
  size = 'default',
  checked,
  defaultChecked,
  onSwitch,
  background = 'var(--cst-admin-secondary-color)',
  backgroundHint = '#FFF',
}) => {
  const colorName = {'--colorName': background} as CSSProperties;
  return (
    <div
      style={style}
      className={`cst-toggle-switch ${
        disabled ? 'cst-toggle-switch-disabled' : ''
      } ${size}`}
    >
      <input
        type="checkbox"
        className="cst-toggle-switch-checkbox"
        name={id}
        id={id}
        checked={defaultChecked || checked}
        onChange={(event) => {
          onSwitch && onSwitch(event.target.checked, id, event);
        }}
        onClick={(e) => {
          onSwitch && onSwitch(!checked, id, e);
        }}
        disabled={disabled}
      />
      <label className="cst-toggle-switch-label" htmlFor={id}>
        <span style={colorName} className="cst-toggle-switch-inner" />
        <span
          style={{background: backgroundHint}}
          className="cst-toggle-switch-switch"
        />
      </label>
    </div>
  );
};
export default SwitchBtn
