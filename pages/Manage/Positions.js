import { useState, useContext } from 'react';
import Click_Modal from '../../components/items/Click_Modal';
import { Column, ColumnCentered, Grid, Row, RowSpaced } from '../../tools/global_components';
import Position_Preview from '../../components/previews/Position_Preview';
import Create_Position from '../../components/forms/Create_Position';
import { ManageContext } from '../../contexts/Manage.context';
import { management } from '../../tools/global_variables';
import Statistics from '../../components/items/Statistics';
import Rectangle from '../../components/items/Rectangle';
import Dropdown_Input from '../../components/inputs/Dropdown_Input';
import Header_Main from '../../components/headers/Header_Main';
import Wrapper_Main from '../../components/wrappers/Wrapper_Main';
import Button_Create from '../../components/buttons/Button_Create';


function Company (props) {
    const { positions, profile, users, companies, employees, posts, applications, interviews, invoices } = useContext(ManageContext);
    const [selected, set_selected] = useState(false);

    const select_handler = (data) => set_selected(data);


    const format_positions = (array) => {
        return array.map(item => {
            const status = !item.ref_id ? 0 : (item.recruitment ? 2 : 1);

            const recruitment = posts.filter(post => post.position_id === item.id).map(post => (
                {
                    ...post, 
                    active: post.post_id === item.ref_id,
                    manager: users.find(user => user.id === post.manager), 
                    interviews: interviews.filter(obj => obj.post_id === post.post_id), 
                    applicants: applications.filter(obj => obj.post_id === post.post_id).map(ele => ({...ele, user_data: users.find(obj => obj.id === ele.user_id), employee: ele.selected ? employees.find(obj => obj.employee_id === ele.selected) : null}) )
                }
            ))

            const history = employees.filter(employee => employee.position_id === item.id).map(employee => (
                {
                    ...employee, 
                    active: employee.employee_id === item.ref_id,
                    user_data: users.find(obj => obj.id === employee.user_id),
                    invoices: invoices.filter(obj => obj.user_id === employee.user_id)
                }
            ))

            const ref_data = status === 1 ? history.find(obj => obj.employee_id === item.ref_id) : status === 2 ? recruitment.find(obj => obj.post_id === item.ref_id) : null;
            
            return {
                ...item, 
                company: companies.find(obj => obj.id === item.company_id),
                status,
                ref_data, 
                recruitment, 
                history
            }
        }).sort((a, b) => {
            // if(a.status === b.status) 
            if(a.status === 1) return -1
            if(b.status === 1) return 1
            if(a.status < b.status) return 1
            if(a.status > b.status) return -1
        });
    };


    const p = format_positions(positions);




    
    
    const order_by_company = (potatoes) => {
        const new_array = [];
        potatoes.forEach(item => {
            var newArrayIndex;
            
            const new_date = !new_array.some((position, i) => {
                newArrayIndex = i;
                return position.company.id == item.company_id
            });
            
            if( new_date ) { new_array.push({company: item.company, positions: [item]}) } 
            else { new_array[newArrayIndex].positions = [...new_array[newArrayIndex].positions, item] }
            
        });
        return new_array.sort((a, b) => b.company.name - a.company.name);
    };

    
    return (
        <main>
            <Header_Main amount={positions.length}>Lorem ipsum dolor</Header_Main>
        
                <Wrapper_Main>
                <Column gap={3} fixed={true}>
                    <RowSpaced nowrap={true} gap={3}>
                        <Rectangle small={true} color={"blue"} name={"Vacant"}>{p.filter(item => item.status === 0).length}</Rectangle>
                        <Rectangle small={true} name={"Filled"}>{p.filter(item => item.status === 1).length}</Rectangle>
                        <Rectangle small={true} color={"green"} name={"Recruting"}>{p.filter(item => item.status === 2).length}</Rectangle>
                    </RowSpaced>   
                    <RowSpaced>
                        <Row gap={3}>
                            <Dropdown_Input options={["Vacant", "Filled", "Recruiting"]}>Status</Dropdown_Input>
                            <Dropdown_Input options={management}>Management</Dropdown_Input>
                        </Row>
                        <Dropdown_Input active={true} options={["Status", "Management", "Salary"]}>Sort By</Dropdown_Input>
                    </RowSpaced>
                    { profile ? (
                        <Column fixed={true} gap={2}>
                            <Grid columns={"1fr 1fr"} gap={3} start={true}>
                                {p.map(item => <Position_Preview key={item.id} data={item} select={select_handler} /> )}
                                <Click_Modal custom={true} content={<Button_Create>Create</Button_Create>} height={80}><Create_Position data={profile} /></Click_Modal>
                            </Grid>
                        </Column>
                    ) : (
                        <Column gap={10} fixed={true}>
                            {order_by_company(p).map(item => ( 
                                <Column gap={2} fixed={true}>
                                    <h4>{item.company.name}</h4>
                                    <Grid columns={"1fr 1fr"} gap={3} start={true}>
                                        {item.positions.sort((a, b) => a.name - b.name).map(data => <Position_Preview key={data.id} data={data} select={select_handler} />)}
                                        <Click_Modal custom={true} content={<Button_Create>Create</Button_Create>} height={80}><Create_Position data={item.company} /></Click_Modal>
                                    </Grid>
                                </Column>
                            ))}
                        </Column>
                        )}

                </Column>
                <Statistics labels={management} data={[p.filter(item => item.type === 0).length || 0, p.filter(item => item.type === 1).length || 0, p.filter(item => item.type === 2).length || 0, 0]}>Management</Statistics>
                </Wrapper_Main>   
        </main>

        
    );
};

export default Company;