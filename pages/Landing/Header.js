import styles from '../../styles/pages/Landing.module.scss';
import Image from '../../assets/landing-full.jpg';
import { sign_in } from '../../firebase/methods/User_Functions';
import { useHistory } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/Auth.context';


function Header () {
    const { user } = useContext(AuthContext);
    const [email, set_email] = useState("");
    const [password, set_password] = useState("");
    const [loader, set_loader] = useState(false);
    const [status, set_status] = useState("");
    const history = useHistory();

    const submit_handler = () => {
        if(loader === false) {
            set_loader(true);
            sign_in({email: email, password: password}).then(result => {
                if(result === true) {
                    set_loader(false);
                    history.push("/dashboard")
                } else {
                    set_loader(false);
                    set_status(result);
                };
            });
        };
    };  

    const standard = (
        <div className={styles.header__action}>
            <input className={styles.header__action__input} placeholder="email" />
            <input className={styles.header__action__input} placeholder="password" />
            <div className={styles.header__action__button} onClick={submit_handler}>Login</div>
            <div className={styles.header__action__or}>OR</div>
            <div className={styles.header__action__button} onClick={() => history.push("/jobs")}>Find Jobs</div>
        </div>
    );

    const auth = (
        <div className={styles.header__action} style={{gridTemplateColumns: "1fr 1fr 1fr 0.1fr 1fr"}}>
            <div className={styles.header__action__button} style={{width: "80%"}} onClick={() => history.push("/jobs")}>Find Jobs</div>
            <div className={styles.header__action__button} style={{width: "80%"}} onClick={() => history.push("/dashboard")}>Portfolio</div>
            <div className={styles.header__action__button} style={{width: "80%"}} onClick={() => history.push("/dashboard")}>Dashboard</div>
            <div className={styles.header__action__or}>OR</div>
            <div className={styles.header__action__button} style={{width: "80%"}} onClick={() => history.push("/dashboard")}>Logout</div>
        </div>
    );

    return (
        <main className={styles.header}>
            <section className={styles.header__content}>
                <h1>Lorem ipsum dolor sit amet</h1>
                <h5>Ut pharetra placerat felis, sit amet sagittis ex tincidunt at. Duis tincidunt tincidunt erat sit amet semper.</h5>
                {user ? auth : standard}
            </section>
            <section className={styles.header__image}>
                <img src={Image} />
            </section>
        </main>
    );
};

export default Header;