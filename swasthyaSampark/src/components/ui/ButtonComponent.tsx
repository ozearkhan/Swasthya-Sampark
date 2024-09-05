import '../../CSS/ButtonComponent.css';

const ButtonComponent = ({ children, transparent = false, onClick }) => {
    const buttonClass = transparent ? 'buttonComponentTransparent' : 'buttonComponent';
    return (
        <button className={buttonClass} onClick={onClick}>
            {children}
        </button>
    );
};

export default ButtonComponent;