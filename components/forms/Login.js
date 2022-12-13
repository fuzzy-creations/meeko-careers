import React, { useContext, useState } from 'react';
import styles from '../../styles/components/forms/Register.module.scss';
import Button_Main from '../buttons/Button_Main';
import Text_Input from '../inputs/Text_Input';
import Password_Input from '../inputs/Password_Input';
import { sign_in } from '../../firebase/methods/User_Functions';
import logo from '../../assets/meeko-favicon.png';
import { AuthContext } from '../../contexts/Auth.context';
import { useHistory } from 'react-router-dom';

function Login (props) {
    const { set_login_open } = useContext(AuthContext);
    const [email, set_email] = useState("");
    const [password, set_password] = useState("");
    const [loader, set_loader] = useState(false);
    const [status, set_status] = useState("");
    const history = useHistory();

    const close_modal = (e) => {
        if(e.target.className == "modal") {
            document.body.style.overflow = 'unset';
            props.close();
        }
    }

    const submit_handler = () => {
        if(loader === false) {
            set_loader(true);
            sign_in({email: email, password: password}).then(result => {
                if(result === true) {
                    set_loader(false);
                    set_login_open(false);
                    history.push("/dashboard")
                } else {
                    set_loader(false);
                    set_status(result);
                };
            });
        };
    };  

    return (
        <main className="modal" onClick={close_modal}>
            <section className={styles.register} onClick={null}>
                <section className={styles.content}>
                    <img className={styles.logo} src={logo} />
                    <h2>Welcome back</h2>
                    <small>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque non tellus at sapien tempor pharetra</small>
                    <div className={styles.inputs}>
                        <Text_Input value={email} input={set_email}>Email</Text_Input>
                        <Password_Input value={password} input={set_password}>Password</Password_Input>
                        <Button_Main loader={loader} action={submit_handler}>Login</Button_Main>
                    </div>
                    <p>{status}</p>
                    <small>Don't have an account? <span onClick={props.switch} className={styles.switch}>Register</span></small>
                </section>
                <section className={styles.image}></section>
            </section>
        </main>
    )
}

export default Login;