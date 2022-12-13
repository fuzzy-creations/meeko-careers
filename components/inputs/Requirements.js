import { useState } from 'react';
import styles from '../../styles/components/inputs/Inputs.module.scss';
import Text_Input from './Text_Input';
import Button_Main from '../buttons/Button_Main';
import { Column, Highlight, Row } from '../../tools/global_components';

function Requirements (props) {
    const [skill, set_skill] = useState("");
    const data = props.value;
 

    const add_handler = () => {
        props.input([...data, skill]);
        set_skill("");
    };

    return (
        <Column fixed={true} gap={1}>
            <Row nowrap={true} gap={1}>
                <Text_Input value={skill} input={set_skill}>{props.children}</Text_Input>
                <Button_Main no_margin={true} width={10} action={add_handler}>Add</Button_Main>
            </Row>
            <Row gap={0.5}>
                {data.map(item => <Highlight>{item}</Highlight>)}
            </Row>
        </Column>
    );
};

export default Requirements;