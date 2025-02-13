import { Link } from "react-router-dom";

type Props = {
    to: string;
    bg: string;
    text: string;
    textColor: string;
    onClick?: () => void;
}

const NavigationLink = (props : Props) => {
  return (
    <Link to={props.to} onClick={props.onClick} className='nav-link' style={{ background: props.bg, color: props.textColor}}>
      {props.text}
    </Link>
  )
}

export default NavigationLink