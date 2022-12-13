import styles from '../../styles/components/main/Preview.module.scss';
import { IoCheckmarkSharp, IoAlertSharp, IoReaderOutline, IoCloseSharp } from "react-icons/io5";
import Click_Modal from '../items/Click_Modal';
import { get_invoice_status } from '../../tools/global_functions';
import View_Invoice from '../forms/View_Invoice';
import { calendar } from '../../tools/DateTime_Methods';
import { Column, RowSpaced } from '../../tools/global_components';
import { colors_list } from '../../tools/global_variables';



function Invoice_Preview (props) {

    const status = get_invoice_status(props.data, true);
    const status_name = get_invoice_status(props.data);
    const icons = [<IoReaderOutline />, <IoAlertSharp />, <IoCloseSharp />, <IoCheckmarkSharp />];
    const colors = [colors_list.blue, colors_list.primary, colors_list.orange, colors_list.green];
    const style = [styles.invoice__blue, styles.invoice__primary, styles.invoice__orange, styles.invoice__green];

    const content = props.manager ? (
        <Column gap={1}>
            <div className={`${styles.invoice} ${style[status]}`}>
                <RowSpaced>
                    <div className={styles.invoice__avatar} style={{backgroundColor: colors[status]}}>{icons[status]}</div>
                    <Column>
                        <small>{calendar(props.data.timestamp)}</small>
                        <small style={{fontWeight: 600, color: colors[status]}}>{status_name}</small>
                    </Column>
                </RowSpaced>
                <Column fixed={true}>
                    <small>Amount</small>
                    <h2>{props.data.amount ? props.data.amount : "N/A"}</h2>
                </Column>
            </div>
            <p className={styles.invoice__name}>{props.user_data.name}</p>
        </Column>
    ) : (
        <Column gap={1}>
            <div className={`${styles.invoice} ${style[status]}`}>
                <RowSpaced>
                    <div className={styles.invoice__avatar} style={{backgroundColor: colors[status]}}>{icons[status]}</div>
                    <Column>
                        <small>{calendar(props.data.timestamp)}</small>
                        <small style={{fontWeight: 600, color: colors[status]}}>{status_name}</small>
                    </Column>
                </RowSpaced>
                <Column fixed={true}>
                    <small>Amount</small>
                    <h2>{props.data.amount ? props.data.amount : "N/A"}</h2>
                </Column>
            </div>
            <p className={styles.invoice__name}>{props.company.name}</p>
        </Column>
    );

    return <Click_Modal embedded={props.embedded} custom={true} content={content}><View_Invoice embedded={props.embedded} manager={props.manager} user_data={props.user_data} data={props.data} company={props.company} /></Click_Modal>
};

export default Invoice_Preview;
