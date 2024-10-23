import {CSSProperties, FC, ReactNode} from "react";

interface TProps {
    style?: CSSProperties,
    children: string | ReactNode,
    onClick?: () => void,
    className?: string;
}

const Button: FC<TProps> = ({style, className, onClick, children}) => {
    return <button style={style} className={`otk-btn ${className}`} onClick={onClick} role='button'>
        {children}
    </button>
}
export default Button;