import React from 'react';
import styles from '../../styles/components/lists/Lists.module.scss';
import Time_Selector from '../items/Time_Selector';

function Times_List(props) {
    const array = props.array;

    const list = array ? props.list.map((item, index) => <Time_Selector data={item} action={() => props.selector(index)} selected={props.selected.includes(index) ?  true : false} />) : props.list.map((item, index) => <Time_Selector data={item} action={() => props.selector(index)} selected={index === props.selected ? true : false} />);
    return (
        <div className={styles.dates} style={props.stretch ? {justifySelf: 'stretch'} : null}>
           {list}
        </div>
    )
};

export default Times_List;


