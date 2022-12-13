import styles from '../../styles/components/main/Profile.module.scss';
import Button_Main from '../../components/buttons/Button_Main';
import Textarea_Input from '../../components/inputs/Textarea_Input';
import { useContext, useState } from 'react';
import Requirements from '../inputs/Requirements';
import { create_post } from '../../firebase/methods/Post_Functions';
import generatePushID from '../../tools/IDGenerator';
import { AuthContext } from '../../contexts/Auth.context';
import { useHistory } from 'react-router-dom';
import { Column, form_header, form_info, Row } from '../../tools/global_components';
import Header_Modal from '../../components/headers/Header_Modal';
import { recruit_position } from '../../firebase/methods/Position_Functions';
import Button_Outline from '../buttons/Button_Outline';


function Create_Post (props) {
    const data = props.data;
    
    const { user, user_data } = useContext(AuthContext);
    const [title, set_title] = useState("");
    const [salary, set_salary] = useState(0);
    const [interviews, set_interviews] = useState([]);
    const [company, set_company] = useState(null);
    const [category, set_category] = useState(0);
    const [about, set_about] = useState("");
    const [min_skills, set_min_skills] = useState([]);
    const [pref_skills, set_pref_skills] = useState([]);
    const [info, set_info] = useState("");
    const [status, set_status] = useState("");
    const [loader, set_loader] = useState(false);

    const history = useHistory();

    const save_handler = () => {
        set_loader(true);
        const id = generatePushID();

        try {
            create_post({
                id: id, 
                position_id: data.id,
                company_id: data.company_id, 
                start: data.start_date,
                category: category, 
                about: about, 
                min_skills: min_skills, 
                pref_skills: pref_skills, 
                info: info,
                manager: user
            })
            recruit_position(data.id, id)
            set_loader(false);
            set_status("Created");

        } catch(error) {
            set_status(error.message);
            set_loader(false);
        }
    }


    return (
        <section className={styles.right__wrapper}>
            <Column gap={2}>
                <Header_Modal name="Create Post">{data.title}</Header_Modal>
                <small>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc et metus mi. Duis venenatis porta magna id malesuada. In ac urna a libero aliquet vestibulum. Integer sed lacus et urna tincidunt imperdiet. </small>

                {form_header("About", "Fill in the required information about the job.")}
                <Textarea_Input value={about} input={set_about}>About the job</Textarea_Input>
                {form_header("Minimum Requirements", "Fill in the minimum requirements.")}
                <Requirements value={min_skills} input={set_min_skills}>Minimum requirements</Requirements>
                {form_header("Preffered Requirements", "Fill in the preffered requirements.")}
                <Requirements value={pref_skills} input={set_pref_skills}>Preffered requirements</Requirements>
                {form_header("Additional Requirements", "Fill in any additional information.")}
                <Textarea_Input value={info} input={set_info}>Additional Information</Textarea_Input>
                <p>{status}</p>
            </Column>
            <section className={styles.right__actions}>
                <Row gap={2}>
                    <Button_Outline height={4} action={props.close}>Back</Button_Outline>
                    <Button_Main width={20} loader={loader} active={about.length > 0 && info.length > 0 && min_skills.length > 0 && pref_skills.length > 0} action={save_handler}>Create</Button_Main>
                </Row>
            </section>
        </section>
    )
}

export default Create_Post;