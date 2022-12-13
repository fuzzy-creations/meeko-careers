
import { useContext, useState } from 'react';
import styles from '../../styles/components/main/Profile.module.scss';
import { Column, form_header, Grid, Row, RowSpaced, Table } from '../../tools/global_components';
import { IoAddCircleSharp  } from 'react-icons/io5';
import View_Contract from '../items/Contract';
import Button_Outline from '../buttons/Button_Outline';
import Button_Main from '../buttons/Button_Main';
import Header_Modal from '../headers/Header_Modal';
import { format_by_company } from '../../tools/global_functions';
import { ManageContext } from '../../contexts/Manage.context';
import { FaChevronLeft, FaChevronRight, FaFileInvoice } from "react-icons/fa";
import moment from 'moment';
import { request_invoice } from '../../firebase/methods/Invoice_Functions';
import generatePushID from '../../tools/IDGenerator';
import { calendar } from '../../tools/DateTime_Methods';
import Text_Input from '../inputs/Text_Input';
import Number_Input from '../inputs/Number_Input';
import Textarea_Input from '../inputs/Textarea_Input';


const Request_Invoice = (props) => {
    const { invoices, employees, users, profile, companies, positions } = useContext(ManageContext);
    const [selected, set_selected] = useState([]);
    const [value, set_value] = useState(0);
    const [page, set_page] = useState(0);
    const [type, set_type] = useState(0);
    const [message, set_message] = useState("");
    const [amount, set_amount] = useState("");
    const start = moment().add(value, 'months').startOf('month');
    const end = moment().add(value, 'months').endOf('month');

    console.log(selected)

    

    const selected_invoices = invoices.filter(item => moment.unix(item.timestamp.seconds).isBetween(start, end))

    const submit_handler = () => {
        selected.forEach(item => {
            const id = generatePushID();
            request_invoice({id, user_id: item.user_id, company_id: item.company_id, message, amount})
        })
        set_page(0)
    };




    const sent_list = employees.filter(obj => selected_invoices.find(list => list.user_id === obj.user_id) );
    const nosent_list = employees.filter(obj => !selected_invoices.find(list => list.user_id === obj.user_id) );

    const main =  (
        <Column gap={2}>
                    <h2>Send Invoices</h2>
                    <small>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc mollis leo vitae dignissim dignissim. Ut at imperdiet orci, quis hendrerit nulla. Ut eget suscipit tellus. Sed posuere sagittis magna.</small>
                        { profile ? (
                            <Column gap={2}>
                                
                                <Row gap={1}>
                                    {nosent_list.map(item => {
                                        const user_data = users.find(user => user.id === item.user_id);
                                        const company = companies.find(company => company.id === item.company_id)
                                        const highlight = selected.find(e => e.user_id === item.user_id);
                                        return (
                                            <div 
                                            onClick={highlight ? 
                                                () => set_selected(selected.filter(obj => obj.user_id !== item.user_id)) 
                                                : 
                                                () => set_selected([...selected, {user_id: item.user_id, company_id: company.id}])
                                            } 
                                                className={`${styles.user} ${highlight ? styles.user__highlight : null}`}
                                            >
                                                <img src={user_data.avatar} />
                                                <small>{user_data.name}</small>
                                            </div>
                                        )
                                    })}
                                </Row>
                            </Column>
                        ) : (
                            <Column gap={3}>
                                {format_by_company(nosent_list).map(item => {
                                    const company = companies.find(company => company.id === item.company);
                                    const select_all = nosent_list.filter(obj => obj.company_id === company.id).map(obj => {return { user_id: obj.user_id, company: obj.company_id } });
                                   
                                    return (
                                        <Column gap={2}>
                                            <h4 onClick={() => set_selected(select_all)}>{company.name}</h4>
                                            <Row gap={1}>
                                                {item.list.map(item => {
                                                    const user_data = users.find(user => user.id === item.user_id);
                                                    const highlight = selected.find(e => e.user_id === item.user_id);
                                                    return (
                                                        <div 
                                                            onClick={highlight ? 
                                                                () => set_selected(selected.filter(obj => obj.user_id !== item.user_id)) 
                                                                : 
                                                                () => set_selected([...selected, {user_id: item.user_id, company_id: company.id}])
                                                            } 
                                                            className={`${styles.user} ${highlight ? styles.user__highlight : null}`}
                                                        >
                                                            <img src={user_data.avatar} />
                                                            <small>{user_data.name}</small>
                                                        </div>
                                                    )
                                                })}
                                            </Row>
                                        </Column>
                                    )
                                })}
                            </Column>
                        )}`
                    </Column>
    );

    const form = (
        <Column gap={2}>
            <h2>Send Invoices</h2>
            <small>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc mollis leo vitae dignissim dignissim. Ut at imperdiet orci, quis hendrerit nulla. Ut eget suscipit tellus. Sed posuere sagittis magna.</small>
            {form_header("Amount", "Fill in the amount in GBP")}
            <Number_Input value={amount} input={set_amount}>Amount</Number_Input>
            {form_header("Your message", "FIll in your message")}
            <Textarea_Input value={message} input={set_message}>Message</Textarea_Input>

        </Column>
    )
   
    const content = [main, form];

    return (
        <main className={styles.main}>
            <Column gap={2}>
                <div className={styles.months}>
                    <span onClick={() => {set_value(value - 1); set_selected([])}}><FaChevronLeft /></span>
                    <h4>{start.format('MMMM')}</h4>
                    <span className={value >= 0 ? styles.months__invalid : null} onClick={value < 0 ? () => {set_value(value + 1); set_selected([])} : null}><FaChevronRight /></span>
                </div>
                <Column gap={2}>
                    <small>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</small>
                    <Row gap={1}>
                        {sent_list.map(item => {
                            const user_data = users.find(user => user.id === item.user_id);
                            return (
                                <div className={`${styles.user}`}>
                                    <img src={user_data.avatar} />
                                    <small>{user_data.name}</small>
                                </div>
                            )
                        })}
                    </Row>
                </Column>
            </Column>
             <section className={styles.right}>
                <section className={styles.right__wrapper}>
                    {content[page]}
                    <section className={styles.right__actions}>
                    {page === 1 ? ( 
                    <Row gap={2}>
                        <Button_Outline action={() => set_page(0)} height={4}>Back</Button_Outline>
                        <Button_Main action={submit_handler} active={value === 0} width={20}>Send</Button_Main>
                    </Row>
                    ) : (
                    <Row gap={2}>
                        <Button_Outline action={props.close} height={4}>Cancel</Button_Outline>
                        <Button_Main action={() => set_page(1)} active={selected.length > 0} width={20}>Next</Button_Main>
                    </Row>
                    ) }
                    </section>
                </section>
        </section>

        </main>
    );
};

export default Request_Invoice;
