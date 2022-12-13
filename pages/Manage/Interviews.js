import React, { useContext, useEffect, useState } from 'react';
import { ManageContext } from '../../contexts/Manage.context';
import { Column, Row, RowSpaced } from '../../tools/global_components';
import Interview_Preview from '../../components/previews/Interview_Preview';
import { interview_duration, interview_types } from '../../tools/global_variables';
import Rectangle from '../../components/items/Rectangle';
import Statistics from '../../components/items/Statistics';
import Empty from '../../components/UI/Empty';
import Dropdown_Input from '../../components/inputs/Dropdown_Input';
import Main_Header from '../../components/headers/Header_Main';
import Wrapper_Main from '../../components/wrappers/Wrapper_Main';


function Interviews (props) {
    const { interviews, posts, companies, positions, users, applications } = useContext(ManageContext);
    const [filter_status, set_filter_status] = useState(0);

    const interviews_pending = interviews.filter(item => item.status === 1);
    const interviews_cancelled = interviews.filter(item => item.status === 0);
    const interviews_upcoming = interviews.filter(item => item.status === 2);
    const interviews_past = interviews.filter(item => item.status === 3);

    return (
        <main>
        <Main_Header amount={interviews.length}>Lorem ipsum dolor</Main_Header>
        <Wrapper_Main>
            <Column fixed={true} gap={3}>
                <RowSpaced nowrap={true} gap={4}>
                    <Rectangle small={true} color={"blue"} name={"Upcoming"}>{interviews_upcoming.length}</Rectangle>
                    <Rectangle small={true} color={"green"} name={"Complete"}>{interviews_past.length}</Rectangle>
                    <Rectangle small={true} color={"primary"} name={"Pending"}>{interviews_pending.length}</Rectangle>
                    <Rectangle small={true} color={"red"} name={"Cancelled"}>{interviews_cancelled.length}</Rectangle>  
                </RowSpaced>
                <RowSpaced>
                    <Row gap={3}>
                        <Dropdown_Input active={true} action={set_filter_status} options={["Upcoming", "Complete", "Pending", "Cancelled"]}>Status</Dropdown_Input>
                        <Dropdown_Input options={interview_types}>Type</Dropdown_Input>
                        <Dropdown_Input options={interview_duration}>Duration</Dropdown_Input>
                    </Row>
                    <Dropdown_Input active={true} options={["Date", "Status"]}>Sort By</Dropdown_Input>
                </RowSpaced>

                {filter_status === 0 ? (
                <Column fixed={true} gap={2}>
                    <h4>Upcoming</h4>
                    {interviews_upcoming.map(data => <Interview_Preview 
                        data={data} 
                        large={true}
                        user_data={users.find(obj => obj.id === data.applicant)}
                        application={applications.find(obj => obj.application_id === data.application_id)}
                        interviews={interviews.filter(obj => obj.application_id === data.application_id )} 
                        company={companies.find(obj => obj.id === data.company_id)}  
                        position={positions.find(obj => obj.id === data.position_id)}  
                        post={posts.find(obj => obj.post_id === data.post_id)} 
                        />
                    )}
                    {interviews_upcoming.length === 0 ? <Empty /> : null}
                </Column>
                ) : null}

                {filter_status === 1 ? (
                <Column fixed={true} gap={2}>
                    <h4>Complete</h4>
                    {interviews_past.map(data => <Interview_Preview 
                        data={data} 
                        large={true}
                        user_data={users.find(obj => obj.id === data.applicant)}
                        application={applications.find(obj => obj.application_id === data.application_id)}
                        interviews={interviews.filter(obj => obj.application_id === data.application_id )} 
                        company={companies.find(obj => obj.id === data.company_id)}  
                        position={positions.find(obj => obj.id === data.position_id)}  
                        post={posts.find(obj => obj.post_id === data.post_id)} 
                        />
                    )}
                    {interviews_past.length === 0 ? <Empty /> : null}
                </Column>
                ) : null}

                {filter_status === 2 ? (
                <Column fixed={true} gap={2}>
                    <h4>Pending</h4>
                    {interviews_pending.map(data => <Interview_Preview 
                            data={data} 
                            large={true}
                            user_data={users.find(obj => obj.id === data.applicant)}
                            application={applications.find(obj => obj.application_id === data.application_id)}
                            interviews={interviews.filter(obj => obj.application_id === data.application_id )} 
                            company={companies.find(obj => obj.id === data.company_id)}  
                            position={positions.find(obj => obj.id === data.position_id)}  
                            post={posts.find(obj => obj.post_id === data.post_id)} 
                            />
                        )}
                    {interviews_pending.length === 0 ? <Empty /> : null}
                </Column>
                ) : null}

                {filter_status === 3 ? (
                <Column fixed={true} gap={2}>
                    <h4>Cancelled</h4>
                    {interviews_cancelled.map(data => <Interview_Preview 
                            data={data} 
                            large={true}
                            user_data={users.find(obj => obj.id === data.applicant)}
                            application={applications.find(obj => obj.application_id === data.application_id)}
                            interviews={interviews.filter(obj => obj.application_id === data.application_id )} 
                            company={companies.find(obj => obj.id === data.company_id)}  
                            position={positions.find(obj => obj.id === data.position_id)}  
                            post={posts.find(obj => obj.post_id === data.post_id)} 
                            />
                        )}
                    {interviews_cancelled.length === 0 ? <Empty /> : null}
                </Column>
                ) : null}    
            </Column>
            <Statistics labels={interview_types} data={[interviews.filter(item => item.type === 0).length, interviews.filter(item => item.type === 1).length, interviews.filter(item => item.type === 2).length, interviews.filter(item => item.type === 3).length]}>Interviews</Statistics>
        </Wrapper_Main>     
    </main>
    );

};

export default Interviews;