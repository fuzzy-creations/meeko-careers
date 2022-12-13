import { useContext } from "react";
import { ManageContext } from "../../contexts/Manage.context";
import Main from "./Main";
import styles from '../../styles/pages/Manage/Home.module.scss';
import { Column, ColumnCentered, Grid, Row, RowSpaced } from '../../tools/global_components';
import { IoIosAdd } from "react-icons/io";
import Click_Modal from '../../components/items/Click_Modal';
import Create_Company from '../../components/forms/Create_Company';
import { colors } from "../../tools/global_variables";


function Home () {
    const { profile, companies, set_selected_company } = useContext(ManageContext);

    const m = (
        <div className={styles.create}>
            <div className={styles.create__logo}><IoIosAdd /></div>
            {/* <h4 className={styles.create__text}>Create</h4> */}
        </div>
    );

    const modal_item = (
        <Click_Modal custom={true} content={m} >
            <Create_Company />
        </Click_Modal>
    )

    const company_preview = (data, index) => (
        <div onClick={() => set_selected_company(data.id)} className={`${styles.company}`}>
            <div className={`${styles.company__logo} ${profile.id === data.id  ? styles.company__logo__selected : null}`} style={{backgroundColor: colors[index]}} >{data.name.charAt(0)}</div>
            <p className={`${styles.company__text} ${profile.id === data.id  ? styles.company__text__selected : null}`}>{data.name}</p>
        </div>
    )

    const main = (
        <main className={styles.home}>
                <section className={styles.wrapper}> 
                <ColumnCentered gap={3}>
                    <h2>Select a Company</h2>
                    <small style={{width: '50rem', textAlign: 'center'}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam aliquet, nisl non gravida placerat, tellus ipsum ultrices nisl, a porta nulla nunc a est.</small>
                    <Row gap={2}>
                        {companies.map((item, index) => company_preview(item, index))}
                        {modal_item}
                    </Row>
                </ColumnCentered>
                </section>
        </main>
    );


    return profile ? <Main /> : main;
}

export default Home;

