
import { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Application_Preview from '../../components/previews/Application_Preview';
import Empty from '../../components/UI/Empty';
import { ProfileContext } from '../../contexts/Profile.context';
import { Column, Highlight, Row, RowSpaced } from '../../tools/global_components';
import Header_Action from '../../components/headers/Header_Action';
import Dropdown_Input from '../../components/inputs/Dropdown_Input';
import { job_categories } from '../../tools/global_variables';


function Applications (props) {
    const { applications, interviews } = useContext(ProfileContext);
    const [filter_status, set_filter_status] = useState(0);
    const open = applications.filter(item => !item.closed);
    const closed = applications.filter(item => item.closed);


    
    return (
        <main> 
            <Header_Action data={[applications.length, open.length]} labels={["Applications", "Active"]}>Find Jobs</Header_Action>
            <RowSpaced>
                <Row gap={3}>
                    <Dropdown_Input action={set_filter_status} active={true} options={["Open", "Closed"]}>Show</Dropdown_Input>
                    <Dropdown_Input options={job_categories}>Category</Dropdown_Input>
                </Row>
                <Dropdown_Input active={true} options={["Date", "Status"]}>Sort By</Dropdown_Input>
            </RowSpaced>

            {filter_status === 0 ? 
            (
                <Column gap={3} marginTop={2}>
                    <h4>Open Applications</h4>
                    {open.map((item, index) => <Application_Preview large={index === 0 ? true : false} data={item} interviews={interviews.filter(interview => interview.application_id === item.application_id)} />)}
                    {open.length === 0 ? <Empty /> : null}
                </Column>
            ) 
            : 
            (
                <Column gap={2} marginTop={2} marginBottom={10}>
                    <h4>Closed Applications</h4>
                    {closed.map(item => <Application_Preview data={item} interviews={interviews.filter(interview => interview.application_id === item.application_id)} />)}
                    {closed.length === 0 ? <Empty /> : null}
                </Column>

            )}

        </main>
    );
};

export default Applications;