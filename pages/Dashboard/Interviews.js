import React, { useContext, useEffect, useState } from 'react';
import { calendar, get_now } from '../../tools/DateTime_Methods';
import { Column, Row, RowSpaced, ColumnSpaced, Grid } from '../../tools/global_components';
import Interview_Preview from '../../components/previews/Interview_Preview';
import { interview_duration, interview_types } from '../../tools/global_variables';
import { ProfileContext } from '../../contexts/Profile.context';
import Rectangle from '../../components/items/Rectangle';
import Empty from '../../components/UI/Empty';
import Statistics from '../../components/items/Statistics';
import Background_Shape from '../../components/UI/Background_Shape';
import Dropdown_Input from '../../components/inputs/Dropdown_Input';
import Header_Main from '../../components/headers/Header_Main';
import Wrapper_Main from '../../components/wrappers/Wrapper_Main';


function Interviews (props) {
    const { interviews, applications } = useContext(ProfileContext);
    const [filter_status, set_filter_status] = useState(0);

    const interviews_pending = interviews.filter(item => item.status === 1);
    const interviews_cancelled = interviews.filter(item => item.status === 0);
    const interviews_upcoming = interviews.filter(item => item.status === 2);
    const interviews_past = interviews.filter(item => item.status === 3);
    

    return (
        <main>
            <Header_Main amount={interviews.length}>Lorem ipsum dolor</Header_Main>
            
        <Wrapper_Main>
            <Column fixed={true} gap={3}>

                <RowSpaced nowrap={true} gap={4}>
                    <Rectangle small={true} color={"blue"} name={"Upcoming"}>{interviews_upcoming.length}</Rectangle>
                    <Rectangle small={true} color={"green"} name={"Complete"}>{interviews_past.length}</Rectangle>
                    <Rectangle small={true} color={"primary"} name={"Action Requred"}>{interviews_pending.length}</Rectangle>
                    <Rectangle small={true} color={"red"} name={"Cancelled"}>{interviews_cancelled.length}</Rectangle>
                </RowSpaced>
                <RowSpaced>
                    <Row gap={3}>
                        <Dropdown_Input action={set_filter_status} active={true} options={["Upcoming", "Complete", "Cancelled"]}>Show</Dropdown_Input>
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
                        application={applications.find(item => item.application_id === data.application_id)}
                        interviews={interviews.filter(item => item.application_id === data.application_id)}
                        user_data={data.manager}
                        applicant={true}
                        />
                    )}
                    {interviews_pending.map(data => <Interview_Preview 
                        data={data} 
                        application={applications.find(item => item.application_id === data.application_id)}
                        interviews={interviews.filter(item => item.application_id === data.application_id)}
                        large={true}
                        user_data={data.manager}
                        applicant={true}
                        />
                    )}
                    {interviews_upcoming.length === 0 && interviews_pending.length === 0 ? <Empty /> : null}
                </Column>
            ) : null}

            {filter_status === 1 ? (
            <Column fixed={true} gap={2}>
                <h4>Complete</h4>
                {interviews_past.map(data => <Interview_Preview 
                    data={data} 
                    application={applications.find(item => item.application_id === data.application_id)}
                    interviews={interviews.filter(item => item.application_id === data.application_id)}
                    large={true}
                    user_data={data.manager}
                    applicant={true}
                    />
                )}
                {interviews_past.length === 0 ? <Empty /> : null}
            </Column>
            ) : null}

            {filter_status === 2 ? (
            <Column fixed={true} gap={2}>
                <h4>Cancelled</h4>
                {interviews_cancelled.map(data => <Interview_Preview 
                    data={data} 
                    application={applications.find(item => item.application_id === data.application_id)}
                    interviews={interviews.filter(item => item.application_id === data.application_id)}
                    large={true}
                    user_data={data.manager}
                    applicant={true}
                    />
                )}
                {interviews_cancelled.length === 0 ? <Empty /> : null}
            </Column>
            ) : null}
                
        </Column>
        <Background_Shape color={"purple"} fade={true}>
        <Statistics labels={interview_types} data={[interviews.filter(item => item.type === 0).length, interviews.filter(item => item.type === 1).length, interviews.filter(item => item.type === 2).length, interviews.filter(item => item.type === 3).length]}>Interviews</Statistics>
        </Background_Shape>

        </Wrapper_Main>

        
    </main>

    );

};

export default Interviews;