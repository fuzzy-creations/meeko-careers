import { useState, useContext } from 'react';
import { Column, Grid, Grid_Header, Row, RowCentered, RowSpaced } from '../../tools/global_components';
import { ManageContext } from '../../contexts/Manage.context';
import Position_Preview from '../../components/previews/Position_Preview';
import Rectangle from '../../components/items/Rectangle';
import { management } from '../../tools/global_variables';
import Statistics from '../../components/items/Statistics';
import Empty_List from '../../components/UI/Empty_List';
import Dropdown_Input from '../../components/inputs/Dropdown_Input';
import Header_Main from '../../components/headers/Header_Main';
import Wrapper_Main from '../../components/wrappers/Wrapper_Main';


function Employees (props) {
    const { positions, profile, users, companies, employees, invoices, posts, applications, interviews } = useContext(ManageContext);
    const [selected, set_selected] = useState(false);

    const select_handler = (data) => set_selected(data);

    
    const format_employees = (array) => {
        return array.map(item => {
            return {
                ...positions.find(obj => obj.id === item.position_id),
                status: 1,
                company: companies.find(obj => obj.id === item.company_id),
                ref_data: {
                    ...item, 
                    user_data: users.find(obj => obj.id === item.user_id),
                    invoices: invoices.filter(obj => obj.user_id === item.user_id)
                }
            }
        })
    };
    
    const e = format_employees(employees);
    const current = e.filter(item => !item.ref_data.offboard);
    const offboarded = e.filter(item => item.ref_data.offboard);


    return (
        <main>
            <Header_Main amount={employees.length}>Lorem ipsum dolor</Header_Main>
            <Wrapper_Main>

                <Column gap={3} fixed={true}>
                    <RowSpaced nowrap={true} gap={3}>
                        <Rectangle small={true} color={"blue"} name={"Employees"}>2</Rectangle>
                        <Rectangle small={true} name={"Offboarded"}>2</Rectangle>
                        <Rectangle small={true} color={"green"} name={"Average Duration"}>2 years</Rectangle>  
                    </RowSpaced>
                    <RowSpaced>
                        <Row gap={3}>
                            <Dropdown_Input options={management}>Management</Dropdown_Input>
                            <Dropdown_Input options={["Vacant", "Filled", "Recruiting"]}>Tasks</Dropdown_Input>
                        </Row>
                        <Dropdown_Input active={true} options={["Name", "Management", "Salary"]}>Sort By</Dropdown_Input>
                    </RowSpaced>

                    <Column fixed={true} gap={2}>
                        <h4>Employees</h4>
                        <Grid columns={"1fr 1fr"} gap={3} start={true}>
                            <Empty_List>{current.map(item => <Position_Preview data={item} select={select_handler} /> )}</Empty_List>                      
                        </Grid>
                                
                    </Column>

                    {offboarded.length === 0 ? null : (      
                        <Column fixed={true} gap={2}>
                            <h4>Offboarded</h4>
                            <Grid columns={"1fr 1fr"} gap={3} start={true}>
                                {offboarded.map(item => <Position_Preview data={item} select={select_handler} /> )}               
                            </Grid>
                        </Column>
                    )}
                </Column>

                <Statistics labels={management} data={[e.filter(item => item.type === 0).length || 0, e.filter(item => item.type === 1).length || 0, e.filter(item => item.type === 2).length || 0, e.filter(item => item.type === 3).length || 0]}>Management</Statistics>
        
            </Wrapper_Main>

            
        </main>
    )
};

export default Employees;

