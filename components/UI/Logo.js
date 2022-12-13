import logo from '../../assets/logo.png';

function Logo (props) {
    return (
        <img src={logo} style={{width: props.width ? `${props.width}rem` : "15rem", height: "auto", objectFit: "cover"}} />
    )
}

export default Logo;