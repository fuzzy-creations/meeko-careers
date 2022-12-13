import { withRouter } from 'react-router';
import styles from '../../styles/components/UI/Footer.module.scss';


function Footer (props) {
    const url = props.location.pathname;

    return url.includes("dashboard") ? null : <section className={styles.footer}></section>;
}

export default withRouter(Footer);