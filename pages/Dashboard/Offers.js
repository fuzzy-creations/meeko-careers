import React, { useContext } from 'react';
import View_Offer from '../../components/forms/View_Offer';
import Header_Action from '../../components/headers/Header_Action';
import Button_Main from '../../components/buttons/Button_Main';
import Click_Modal from '../../components/items/Click_Modal';
import Offer_Preview from '../../components/previews/Offer_Preview';
import Empty from '../../components/UI/Empty';
import Empty_List from '../../components/UI/Empty_List';
import { AuthContext } from '../../contexts/Auth.context';
import { ProfileContext } from '../../contexts/Profile.context';
import { Column, Row } from '../../tools/global_components';

function Offers () {
    const { offers, applications } = useContext(ProfileContext);
    const { user_data } = useContext(AuthContext);


    return (
        <main>
            <Header_Action data={[offers.length, offers.length]} labels={["Offers", "Active"]}>Make Request</Header_Action>
            <Column>
                <Row gap={2}>
                    <Empty_List>{offers.map(item => <Offer_Preview data={item} user_data={user_data} application={applications.find(obj => obj.position_id === item.position_id)}  />)}</Empty_List>
                </Row>
            </Column>
        </main>
    );
};

export default Offers;