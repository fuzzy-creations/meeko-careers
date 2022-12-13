import styles from '../../styles/components/forms/Create.module.scss';
import Text_Input from '../inputs/Text_Input';
import Button_Main from '../buttons/Button_Main';
import { create_company } from '../../firebase/methods/Company_Functions';
import { useContext, useState } from 'react';
import generatePushID from '../../tools/IDGenerator';
import { useHistory } from 'react-router-dom';
import { Column, form_header, form_selectable, Modal, Row } from '../../tools/global_components';
import Header_Modal from '../headers/Header_Modal';


function Create_Company (props) {
    const [name, set_name] = useState("");
    const [founded, set_founded] = useState("");
    const [location, set_location] = useState("");
    const [industry, set_industry] = useState("");
    const [size, set_size] = useState(null);
    const [website, set_website] = useState("");
    const [socials, set_socials] = useState("");
    const [status, set_status] = useState("");
    const [loader, set_loader] = useState(false);

    const save_handler = () => {
        set_loader(true);
        const id = generatePushID();

        try {
            create_company({id: id, name: name});
            set_loader(false);
            props.close()
        } catch(error) {
            set_status(error.message);
            set_loader(false);
        }
    };

    return (
        <main className={styles.main}>
            <Column gap={2}>
                <Header_Modal>Create Company</Header_Modal>
                <small>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec iaculis sodales dolor rhoncus scelerisque. Sed imperdiet ornare sagittis. Vivamus maximus molestie turpis, ut viverra justo. </small>
                <Column gap={1} fixed={true} marginBottom={3}>
                    {form_header("Company Name", "Fill the name of your Company.")}
                    <Text_Input value={name} input={set_name}>Name</Text_Input>
                    {form_header("Founded Date", "Fill the date your company was founded.")}
                    <Text_Input value={founded} input={set_founded}>Founded</Text_Input>
                    {form_header("Location", "Fill the location of your Company.")}
                    <Text_Input value={location} input={set_location}>Location</Text_Input>
                    <Column gap={1}>
                    {form_header("Size", "Fill the size of your Company.")}
                        {form_selectable(size, 0, "Small", set_size )}
                        {form_selectable(size, 1, "Medium", set_size )}
                        {form_selectable(size, 2, "Large", set_size )}
                    </Column>
                    {form_header("Industry", "Fill in the industry of your Company.")}
                    <Text_Input value={industry} input={set_industry}>Industry</Text_Input>
                    {form_header("Website", "Fill the website of your Company.")}
                    <Text_Input value={website} input={set_website}>Website</Text_Input>
                    <p>{status}</p>
                </Column>
            </Column>
            <section className={styles.actions}>
                <Row gap={1}>
                    <Button_Main width={20} action={props.close}>Back</Button_Main>
                    <Button_Main width={20} loader={loader} action={save_handler}>Create</Button_Main>
                </Row>
            </section>

        </main>
    )
}

export default Create_Company;