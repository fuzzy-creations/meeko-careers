import React, { useContext, useEffect, useState } from 'react';
import Click_Modal from '../../components/items/Click_Modal';
import { get_invoice_date} from '../../tools/DateTime_Methods';
import { Column, Grid, Row, RowSpaced } from '../../tools/global_components';
import { ProfileContext } from '../../contexts/Profile.context';
import Invoice_Preview from '../../components/previews/Invoice_Preview';
import { AuthContext } from '../../contexts/Auth.context';
import Statistics from '../../components/items/Statistics';
import { invoice_status } from '../../tools/global_variables';
import Rectangle from '../../components/items/Rectangle';
import Button_Add from '../../components/buttons/Button_Add';
import Dropdown_Input from '../../components/inputs/Dropdown_Input';
import Empty_List from '../../components/UI/Empty_List';
import { get_invoice_status } from '../../tools/global_functions';
import Header_Main from '../../components/headers/Header_Main';
import Wrapper_Main from '../../components/wrappers/Wrapper_Main';


function Invoices (props) {
    const { invoices } = useContext(ProfileContext);
    const { user_data } = useContext(AuthContext);
    const [value, set_value] = useState(0);


    const sort_invoices = (invoices) => {
        const new_array = [];
        invoices.forEach(item => {
            var newArrayIndex;
            const new_date = !new_array.some((invoice, i) => {
                newArrayIndex = i;
                return get_invoice_date(invoice.timestamp) == get_invoice_date(item.timestamp)
            });
            if( new_date ) { new_array.push({timestamp: item.timestamp, invoices: [item]}) } 
            else { new_array[newArrayIndex].invoices = [...new_array[newArrayIndex].invoices, item] }

        });
        return new_array.sort((a, b) => b.timestamp - a.timestamp);
    };



    return (
        <main>
            
                <RowSpaced>
                    <Header_Main amount={invoices.length}>Lorem ipsum dolor</Header_Main>
                        <Click_Modal custom={true} content={<Button_Add>Create Invoice</Button_Add>}></Click_Modal>
                </RowSpaced>
            <Wrapper_Main>
                <Column fixed={true} gap={3}>
                    <Row nowrap={true} gap={3}>
                        <Rectangle small={true} color={"red"} name={"Pending"}>0.0k</Rectangle>
                        <Rectangle small={true} color={"blue"} name={"Paid"}>0.0k</Rectangle>
                        <Rectangle small={true} color={"green"} name={"Average"}>0.0k</Rectangle>     
                    </Row>
                    <RowSpaced>
                        <Row gap={3}>
                            <Dropdown_Input options={[]}>Status</Dropdown_Input>
                        </Row>
                        <Dropdown_Input active={true} options={["Date", "Amount", "Status"]}>Sort By</Dropdown_Input>
                    </RowSpaced>
                    <section>
                        <Row gap={"2"}>
                            <Empty_List>{invoices.map(data => <Invoice_Preview data={data} user_data={user_data} company={data.company} />)}</Empty_List>
                        </Row>
                    </section>
                </Column>
                <Statistics labels={invoice_status} data={[invoices.filter(item => get_invoice_status(item, true) === 0).length, invoices.filter(item => get_invoice_status(item, true) === 1).length, invoices.filter(item => get_invoice_status(item, true) === 2).length, invoices.filter(item => get_invoice_status(item, true) === 3).length]}>Invoices</Statistics>

                </Wrapper_Main>

            
        </main>
    );

};

export default Invoices;