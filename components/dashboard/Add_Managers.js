import { useEffect, useState } from 'react';
import { query_user_email } from '../../firebase/methods/User_Functions';
import styles from '../../styles/components/inputs/Inputs.module.scss';
import Radio_Input from '../inputs/Radio_Input';
import Text_Input from '../inputs/Text_Input';
import Button_Main from '../buttons/Button_Main';
import { FaUserAlt } from "react-icons/fa";

function Add_Managers (props) {
    const [managers, set_managers] = useState("");
    const [found_managers, set_found_managers] = useState([]);
    const [active, set_active] = useState(false);
    const data = props.value;
    const invited_data = props.invited_value;

    useEffect(() => {
        const fetch_data = async () => {
            const query = await query_user_email(managers);
            set_found_managers(query);
        };
        if(managers.length > 2) { fetch_data(); set_active(true) } else { set_found_managers([]); set_active(false) };
    }, [managers]);
 

    const add_handler = async (item) => {

        if(found_managers.length > 0) {
            const obj = {name: item.name, email: item.email, id: item.id, avatar: item.avatar}
            props.select ? props.input([obj]) : props.input([...data, obj]);
            set_managers("");
        } else {
            const obj = {email: managers}
            props.invited_input([...invited_data, obj]);
            set_managers("");
        }
    };

    const remove_manager = (item) => {
        const array = item.name ? data : invited_data;
        const new_data = array.filter(ele => item.email !== ele.email)
        item.name ? props.input(new_data) : props.invited_input(new_data);
    };


    const manager_selection = (item) => (
        <div className={styles.managers__found__user} onClick={() => add_handler(item)}>
            <div style={{"backgroundImage": `url(${item.avatar})`}}></div>
            <span>
                <small>{item.name}</small>
                <p>{item.email}</p>
            </span>
        </div>
    );


    const manager = (item) => (
        <div className={styles.managers__added}>
            {item.avatar ? <div style={{"backgroundImage": `url(${item.avatar})`}}></div> : <div><FaUserAlt /></div>}
            <span>
                {item.name ? <small>{item.name}</small> : null}
                <p>{item.email}</p>
            </span>
            <small onClick={() => remove_manager(item)}>X</small>
        </div>
    );


    return (
        <div className={styles.managers}>
            <label>{props.children}</label>
            <div className={styles.managers__added_wrapper}>{[...data, ...invited_data].map(item => manager(item))}</div>
            <div className={styles.managers__action}>
                <Text_Input value={managers} input={set_managers} />
                <Button_Main active={active} no_margin={true} width={"10"} action={() => add_handler(found_managers[0])}>Add</Button_Main>
                <div className={styles.managers__found}>{found_managers.map(item => manager_selection(item))}</div>
            </div>
        </div>
    );
};

export default Add_Managers;