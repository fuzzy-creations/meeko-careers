import styles from '../../styles/components/main/Preview.module.scss';
import { IoReaderOutline } from "react-icons/io5";
import Click_Modal from '../items/Click_Modal';
import { calendar } from '../../tools/DateTime_Methods';
import { Column, RowSpaced } from '../../tools/global_components';
import View_Offer from '../forms/View_Offer';


function Offer_Preview (props) {
    const data = props.data;
    const user_data = props.user_data;

    const content = (
        <Column gap={1}>
            <div className={styles.offer}>
                <RowSpaced>
                    <div className={styles.offer__avatar}><IoReaderOutline /></div>
                    <Column>
                        <small>{calendar(data.start_date)}</small>
                        <small style={{fontWeight: 600}}>Offer</small>
                    </Column>
                </RowSpaced>
                <Column fixed={true}>
                    <small>{data.position.title}</small>
                    <h2>{data.position.salary}k</h2>
                </Column>
            </div>
            <p className={styles.invoice__name}>{data.company.name}</p>
        </Column>
    )

    return <Click_Modal custom={true} content={content}><View_Offer company={data.company} position={data.position} employee={data} user_data={user_data} application={props.application} /></Click_Modal>
}

export default Offer_Preview;
