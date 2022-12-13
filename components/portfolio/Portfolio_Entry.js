import { delete_portfolio_entry } from '../../firebase/methods/User_Functions';
import styles from '../../styles/components/portfolio/Portfolio_Entry.module.scss';

import { IoIosCalendar } from "react-icons/io";
import { FaRegBuilding } from "react-icons/fa";
import { Column, Row, RowSpaced } from '../../tools/global_components';
import Button_Outline from '../buttons/Button_Outline';

function Portfolio_Entry (props) {
    const data = props.data;

    const delete_handler = () => {
        delete_portfolio_entry(props.user_id, props.data, props.type);
        const update = props.value[props.type].filter(item => item.job !== data.job && item.company !== data.company && item.months !== data.months);
        props.input({...props.value, [props.type]: update });
    };


    return (
        <>
        <div className={styles.entry}>
            <p className={styles.entry__title}>{data.job}</p>
            <RowSpaced>
                <Row gap={1}>
                    <FaRegBuilding /> 
                    <small>{data.company}</small>
                </Row>
                <Column>
                    <Row gap={1}>
                        <IoIosCalendar /> 
                        <small>{data.years > 0 ? `${data.years} years` : null}</small>
                        <small>{data.months > 0 ? `${data.months} months` : null}</small>
                    </Row>
                </Column>
            </RowSpaced>
         {props.allow_delete ? <div className={styles.delete} onClick={delete_handler}>Delete</div> : null}
        </div>
        </>
    )
}

export default Portfolio_Entry;