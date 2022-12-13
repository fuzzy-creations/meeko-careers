import { useState, useContext } from 'react';
import { Column, Grid, Grid_Header, Row, RowCentered, RowSpaced } from '../../tools/global_components';
import { ManageContext } from '../../contexts/Manage.context';
import { applicant_status, format_interviews_date } from '../../tools/global_functions';
import Position_Preview from '../../components/previews/Position_Preview';
import Rectangle from '../../components/items/Rectangle';
import { job_categories } from '../../tools/global_variables';
import Statistics from '../../components/items/Statistics';
import Empty_List from '../../components/UI/Empty_List';
import Dropdown_Input from '../../components/inputs/Dropdown_Input';
import Header_Main from '../../components/headers/Header_Main';
import Wrapper_Main from '../../components/wrappers/Wrapper_Main';



function Recruitment (props) {
    const { positions, profile, users, companies, employees, posts, applications, interviews } = useContext(ManageContext);
    const [selected, set_selected] = useState(false);
    const [filter_status, set_filter_status] = useState(0);

    const select_handler = (data) => set_selected(data);

    const open_posts = posts.filter(item => !item.closed);
    const closed_posts = posts.filter(item => item.closed);

    const format_posts = (array) => {
        return array.map(item => {
            return {
                ...positions.find(obj => obj.id === item.position_id),
                status: 2,
                company: companies.find(obj => obj.id === item.company_id),
                ref_data: {
                    ...item, 
                    manager: users.find(user => user.id === item.manager), 
                    applicants: applications.filter(obj => obj.post_id === item.post_id).map(ele => ({...ele, user_data: users.find(obj => obj.id === ele.user_id), employee: ele.selected ? employees.find(obj => obj.employee_id === ele.selected) : null }) ),
                    interviews: interviews.filter(obj => obj.post_id === item.post_id),
                }
            }
        })
    };


    const statistics_handler = (array, method) => {
        const obj = {}
        array.forEach(item => {
            const e = method(item);
            console.log(e)
            if(e === "Closed" || e === "Viewed" || e === "New") { 
                obj["Applicant"] =  obj["Applicant"] ? obj["Applicant"] + 1 : 1 
            } else {  
                obj[e] = obj[e] ? obj[e] + 1 : 1 
            }
        })
        // console.log(obj)
        // console.log(Object.keys(obj))
        // console.log(Object.keys(obj).map(item => { return { name: item, amount: obj[item] }  }))
        return obj;

        
    }

    const statistics = statistics_handler(applications, applicant_status);

    return (
        <main>
            <Header_Main amount={posts.length}>Lorem ipsum dolor</Header_Main>
            <Wrapper_Main>

                <Column gap={3} fixed={true}>
                    <RowSpaced nowrap={true} gap={3}>
                        <Rectangle small={true} color={"blue"} name={"Open Posts"}>{open_posts.length}</Rectangle>
                        <Rectangle small={true} name={"Closed Posts"}>{closed_posts.length}</Rectangle>
                        <Rectangle small={true} color={"green"} name={"Open Time"}>0 days</Rectangle>
                        
                    </RowSpaced>
                    <RowSpaced>
                        <Row gap={3}>
                            <Dropdown_Input action={set_filter_status} active={true} options={["Open", "Closed"]}>Show</Dropdown_Input>
                            <Dropdown_Input options={job_categories}>Category</Dropdown_Input>
                        </Row>
                        <Dropdown_Input active={true} options={["Name", "Management", "Salary", "Applicants", "Open Time"]}>Sort By</Dropdown_Input>
                    </RowSpaced>

                    {filter_status === 0 ? 
                    (<Column fixed={true} gap={2}>
                        <h4>Open Posts</h4>
                        <Grid columns={"1fr 1fr"} gap={3} start={true}>
                            <Empty_List>{format_posts(open_posts).map(item => <Position_Preview data={item} select={select_handler} /> )}</Empty_List>        
                        </Grid>     
                    </Column>
                    ) : (
                    <Column fixed={true} gap={2}>
                        <h4>Closed Posts</h4>
                        <Grid columns={"1fr 1fr"} gap={3} start={true}>
                            {format_posts(closed_posts).map(item => <Position_Preview data={item} select={select_handler} /> )}               
                        </Grid>
                    </Column>
                    )}
                </Column>
                <Statistics labels={["Applicants", "Shortlist", "Interviewed", "Selected"]} data={[statistics.Applicant || 0, statistics.Shortlist || 0, statistics.Interviewed || 0, statistics.Selected || 0]}>Applicants</Statistics>

            </Wrapper_Main>
            
        </main>
    )
};

export default Recruitment;

