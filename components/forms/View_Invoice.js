
import { useContext, useState } from 'react';
import styles from '../../styles/components/main/Profile.module.scss';
import { Column, form_header, Grid, Highlight, Row, RowSpaced, Table } from '../../tools/global_components';
import { IoAddCircleSharp  } from 'react-icons/io5';
import View_Contract from '../items/Contract';
import Button_Outline from '../buttons/Button_Outline';
import Button_Main from '../buttons/Button_Main';
import Header_Modal from '../headers/Header_Modal';
import { get_invoice_status } from '../../tools/global_functions';
import { decline_invoice, fill_invoice, pay_invoice } from '../../firebase/methods/Invoice_Functions';
import Text_Input from '../inputs/Text_Input';
import Number_Input from '../inputs/Number_Input';
import { calendar } from '../../tools/DateTime_Methods';
import { ManageContext } from '../../contexts/Manage.context';
import { invoice_colors, invoice_icons } from '../../tools/global_variables';
import { ProfileContext } from '../../contexts/Profile.context';


const View_Invoice = (props) => {


    return props.manager ? <Manager_View data={props.data} user_data={props.user_data} close={props.close} /> : <Employee_View data={props.data} user_data={props.user_data} company={props.company} close={props.close} />
};

export default View_Invoice;

const Invoice = (props) => {
    const data = props.data;
    const status = get_invoice_status(data, true);
    const status_name = get_invoice_status(data);
    const style = [styles.invoice__blue, styles.invoice__primary, styles.invoice__orange, styles.invoice__green];

    return (
        <div className={`${styles.invoice} ${style[status]}`}>
            <Column>
                <small>{calendar(data.timestamp)}</small>
                <Row gap={0.5}>
                    <span className={styles.invoice__icon} style={{backgroundColor: invoice_colors[status]}}>{invoice_icons[3]}</span>
                    <p>{status_name}</p>
                </Row>
            </Column>
            <p className={styles.invoice__amount}>{data.amount ? data.amount : "N/A"}</p>
        </div>

    )
}

const Manager_View = (props) => {
    const { invoices } = useContext(ManageContext);
    const data = props.data;
    console.log(data)
    const user_data = props.user_data;
    const status = get_invoice_status(data, true);
    const status_name = get_invoice_status(data);
    const style = [styles.invoice__blue, styles.invoice__primary, styles.invoice__orange, styles.invoice__green];
    const users_invoices = invoices.filter(item => item.user_id === user_data.id);

    const pay_handler = () => {
        pay_invoice(data.id)
    }

    const decline_handler = () => {
        decline_invoice(data.id)
    }


    return (
        <main className={styles.main}>
        <section className={styles.left}>

            <div className={styles.avatar}>
                <img src={user_data.avatar} />
                <div>
                    <h4>{user_data.name}</h4>
                    <small>{user_data.email}</small>
                </div>
            </div>

            <Column gap={1}>
                <h4>History</h4>
                {users_invoices.map(item => <Invoice data={item} />)}
            </Column>

            <RowSpaced>
                
            </RowSpaced>
        </section>

        <section className={styles.right}>
            <div className={styles.right__wrapper}>
                <Column gap={3}>
                    <Header_Modal name={status_name}>Invoice</Header_Modal>
                    <div className={styles.banner}>
                        <Column>
                            <p className={styles.banner__bold}>Status</p>
                            <p>{status_name}</p>
                            <Row gap={1}><p>Issue Date</p><p className={styles.banner__bold}>{calendar(data.timestamp)}</p></Row>
                            <Row gap={1}><p>Due Date</p><p className={styles.banner__bold}>N/A</p></Row>
                        </Column>

                        <Column>
                            <p className={styles.banner__bold}>Billed to</p>
                            <p>{user_data.name}</p>
                            {data.address ? <p>{data.address}</p> : null}
                        </Column>
                    </div>
                    <Grid columns={"1fr 1fr"} gap={5}>
                        <Column gap={1}>
                            <h4>Item Detail</h4>
                            {data.message ? <p>{data.message}</p> : null}
                            <Table>
                                <p class="bold">Bank</p><p>{data.bank ? data.bank : "N/A"}</p>
                                <p class="bold">Account Number</p><p>{data.account ? data.account : "N/A"}</p>
                                <p class="bold">Sort Code</p><p>{data.sort_code ? data.sort_code : "N/A"}</p>
                                <p class="bold">Tax Number</p><p>{data.tax_number ? data.tax_number : "N/A"}</p>
                            </Table>
                            {data.details ? <p>{data.details}</p> : null}
                        </Column>
                        <div className={styles.block}>
                            <Row gap={0.5}><h4>Amount Due</h4><p>(GPB)</p></Row>
                            <Row gap={0.5}><h2>{data.amount ? `£${data.amount}` : "N/A"}</h2><p>(Tax Incl.)</p></Row>
                            <Highlight>Due on Jan 20, 2022</Highlight>
                        </div>    
                    </Grid>
                </Column>
                <section className={styles.right__actions}>
                    <Row gap={2}>
                        <Button_Main action={props.close} width={20}>Close</Button_Main>
                        {status === 0 ? <Button_Outline action={props.close} height={4}>Delete</Button_Outline> : null}
                        {status === 1 ? <Button_Outline action={decline_handler} height={4}>Decline</Button_Outline> : null}
                        {status === 1 ? <Button_Main action={pay_handler} width={20}>Pay</Button_Main> : null}
                    </Row>
                </section>
            </div>
        </section>

    </main>
    )
}


const Employee_View = (props) => {
    const { invoices } = useContext(ProfileContext);
    const data = props.data;
    const user_data = props.user_data;
    const company = props.company;
    const status = get_invoice_status(data, true);
    const status_name = get_invoice_status(data);

    const [name, set_name] = useState(user_data.name);
    const [address, set_address] = useState(data.address || "");
    const [amount, set_amount] = useState(data.amount || "");
    const [tax, set_tax] = useState(data.tax_number || "");
    const [bank, set_bank] = useState(data.bank || "");
    const [account, set_account] = useState(data.account || "");
    const [code, set_code] = useState(data.sort_code || "");
    const [details, set_details] = useState(data.details || "");

    const [page, set_page] = useState(status === 0 ? 0 : 1);

    const submit_handler = () => { fill_invoice(data.id, amount, account, code, tax, address, name, bank, details); set_page(0) };

    const history = invoices.filter(item => item.company_id === company.id);

    return (
        <main className={styles.main}>
            <section className={styles.left}>

                <div className={styles.avatar}>
                    <div className={styles.avatar__icon}><IoAddCircleSharp /></div>
                    <div>
                        <h4>{company.name}</h4>
                        <small>{history.length} Invoices</small>
                    </div>
                </div>

                <Column gap={1}>
                    <h4>History</h4>
                    {history.map(item => <Invoice data={item} />)}
                </Column>

            <RowSpaced></RowSpaced>
        </section>

        <section className={styles.right}>
            <div className={styles.right__wrapper}>
                {page === 0 ? ( 
                <Column gap={2}>
                    <Header_Modal name={get_invoice_status(data)}>Send Invoice</Header_Modal>
                    <small>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sollicitudin mattis felis, sed volutpat justo tincidunt at. Integer ac blandit sapien. </small>
                    {data.amount ? <h4>Amount: {data.amount}</h4> : null}
                    <Column gap={1} paddingBottom={2}>
                        {form_header("Your name", "FIll in your full name")}
                        <Text_Input value={name} input={set_name}>Name</Text_Input>
                        {form_header("Your address", "FIll in your full address")}
                        <Text_Input value={address} input={set_address}>Address</Text_Input>
                        {form_header("Your tax number", "FIll in your tax number")}
                        <Text_Input value={tax} input={set_tax}>Tax Number</Text_Input>
                        {data.amount ? null : (
                            <>
                            {form_header("Amount", "Fill in the amount in GBP")}
                            <Number_Input value={amount} input={set_amount}>Amount</Number_Input>
                            </>
                        )}
                        {form_header("Bank information", "Fill in your account details")}
                        <Text_Input value={bank} input={set_bank}>Bank</Text_Input>
                        <Text_Input value={account} input={set_account}>Account Number</Text_Input>
                        <Text_Input value={code} input={set_code}>Sort Code</Text_Input>
                    </Column>
                </Column> ) : (
                    <Column gap={3}>
                        <Header_Modal name={get_invoice_status(data)}>Invoice</Header_Modal>
                        <div className={styles.banner}>
                            <Column>
                                <p className={styles.banner__bold}>Status</p>
                                <p>{status_name}</p>
                                <Row gap={1}><p>Issue Date</p><p className={styles.banner__bold}>{calendar(data.timestamp)}</p></Row>
                                <Row gap={1}><p>Due Date</p><p className={styles.banner__bold}>N/A</p></Row>
                            </Column>

                            <Column>
                                <p className={styles.banner__bold}>Billed to</p>
                                <p>{user_data.name}</p>
                                {data.address ? <p>{data.address}</p> : null}
                            </Column>
                        </div>
                        <Grid columns={"1fr 1fr"} gap={5}>
                        <Column gap={1}>
                            <h4>Item Detail</h4>
                            {data.message ? <p>{data.message}</p> : null}
                            <Table>
                                <p class="bold">Bank</p><p>{data.bank ? data.bank : "N/A"}</p>
                                <p class="bold">Account Number</p><p>{data.account ? data.account : "N/A"}</p>
                                <p class="bold">Sort Code</p><p>{data.sort_code ? data.sort_code : "N/A"}</p>
                                <p class="bold">Tax Number</p><p>{data.tax_number ? data.tax_number : "N/A"}</p>
                            </Table>
                            {data.details ? <p>{data.details}</p> : null}
                        </Column>
                        <div className={styles.block}>
                            <Row gap={0.5}><h4>Amount Due</h4><p>(GPB)</p></Row>
                            <Row gap={0.5}><h2>{data.amount ? `£${data.amount}` : "N/A"}</h2><p>(Tax Incl.)</p></Row>
                            <Highlight>Due on Jan 20, 2022</Highlight>
                        </div>    
                    </Grid>
                    </Column>
                ) }
                <section className={styles.right__actions}>
                    <Row gap={2}>
                        {status === 1 && page === 0 ? null : <Button_Main action={props.close} width={20}>Close</Button_Main>}
                        {status === 0 ? <Button_Main width={20} action={submit_handler}>Send</Button_Main> : null}
                        {status === 1 && page === 1 ? <Button_Main width={20} action={() => set_page(0)}>Edit</Button_Main> : null}
                        {status === 1 && page === 0 ? <Button_Main width={20} action={() => set_page(1)}>Cancel</Button_Main> : null}
                        {status === 1 && page === 0 ? <Button_Main width={20} action={() => set_page(1)}>Save</Button_Main> : null}
                    </Row>
                </section>
            </div>
        </section>

    </main>
    )
}
