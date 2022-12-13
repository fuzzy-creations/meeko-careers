import React, { useContext, useEffect, useState } from 'react';
import Click_Modal from '../../components/items/Click_Modal';
import { ManageContext } from '../../contexts/Manage.context';
import { calendar, get_invoice_date, get_month, get_month_year } from '../../tools/DateTime_Methods';
import { Column, Grid, Row, RowSpaced } from '../../tools/global_components';
import Statistics from '../../components/items/Statistics';
import Rectangle from '../../components/items/Rectangle';
import Invoice_Preview from '../../components/previews/Invoice_Preview';
import { invoice_status } from '../../tools/global_variables';
import { get_invoice_status } from '../../tools/global_functions';
import Request_Invoice from '../../components/forms/Request_Invoice';
import Empty_List from '../../components/UI/Empty_List';
import Dropdown_Input from '../../components/inputs/Dropdown_Input';
import Button_Add from '../../components/buttons/Button_Add';
import Header_Main from '../../components/headers/Header_Main';
import Wrapper_Main from '../../components/wrappers/Wrapper_Main';


function Invoices (props) {
    const { invoices, employees, users, profile, companies } = useContext(ManageContext);
    const [value, set_value] = useState(0);


    const format_invoices = (array) => {
        return array.map(item => {
            return {
                ...item,
                user_data: users.find(user => user.id === item.user_id),
                 
            }
        })
    };


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

    const i = format_invoices(invoices);

    const statistics = () => {
        const unpaid = invoices.filter((item => get_invoice_status(item, true) === 1)).map(item => Number(item.amount)).reduce((partialSum, a) => partialSum + a, 0);
        const total = invoices.map(item => Number(item.amount)).reduce((partialSum, a) => partialSum + a, 0);
        const average = (total / invoices.length) || 0;
        return { unpaid: (unpaid / 1000).toFixed(1), total: (total / 1000).toFixed(1), average: (average / 1000).toFixed(1) }
    }

    const s = statistics();

    return (
        <main>
            <RowSpaced>
                <Header_Main amount={invoices.length}>Lorem ipsum dolor</Header_Main>
                <Click_Modal custom={true} content={<Button_Add>Create Invoice</Button_Add>}><Request_Invoice invoices={sort_invoices(i)} /></Click_Modal>
            </RowSpaced>
            <Wrapper_Main>
                <Column fixed={true} gap={3}>
                    <Row nowrap={true} gap={3}>
                        <Rectangle small={true} color={"red"} name={"Upaid"}>{s.unpaid}k</Rectangle>
                        <Rectangle small={true} color={"blue"} name={"Total"}>{s.total}k</Rectangle>
                        <Rectangle small={true} color={"green"} name={"Average"}>{s.average}k</Rectangle>     
                    </Row>
                    <RowSpaced>
                        <Row gap={3}>
                            <Dropdown_Input options={[]}>Status</Dropdown_Input>
                        </Row>
                        <Dropdown_Input active={true} options={["Month", "Year", "Day"]}>Sort By</Dropdown_Input>
                    </RowSpaced>
                    <Column gap={10}>
                        <Empty_List>{sort_invoices(i).map(item => (
                            <section>
                                <Column marginBottom={2}>
                                    <h4>{get_month_year(item.timestamp)}</h4>
                                    <small>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</small>
                                </Column>
                                <Row gap={3}>
                                    {item.invoices.map(data => <Invoice_Preview manager={true} data={data} user_data={data.user_data} />)}
                                </Row>
                            </section>
                        ))}</Empty_List>
                    </Column>
                </Column>
                <Statistics labels={invoice_status} data={[invoices.filter(item => get_invoice_status(item, true) === 0).length, invoices.filter(item => get_invoice_status(item, true) === 1).length, invoices.filter(item => get_invoice_status(item, true) === 2).length, invoices.filter(item => get_invoice_status(item, true) === 3).length]}>Invoices</Statistics>

                </Wrapper_Main>

            
        </main>
    );

};

export default Invoices;
