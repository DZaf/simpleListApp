import { InputProps } from '../../types/input.types';
import style from './Input.module.scss';

const Input: React.FC<InputProps> = ({
    ref,
    placeholder,
    disabled = false,
    error = false,
    className,
    ...rest
}) => {

    const errorClass = error ? style.error : '';
    return (
        <input ref={ref} type="text" placeholder={placeholder} disabled={disabled} className={`${style.textInputField} ${errorClass} ${className ?? ''} `} {...rest} />
    )
}
export default Input;