import React from 'react';
import styles from '../../styles/components/lists/Lists.module.scss';
import Date_Selector from '../items/Date_Selector';

function Dates_List(props) {
    const array = props.array;

    const list = props.list.map(item => <Date_Selector data={item} action={() => props.selector(item.id)} selected={item.id === props.selected ? true : false} />);
    const array_list = props.list.map(item => <Date_Selector data={item} action={() => props.selector(item.id)} selected={props.selected.includes(item.id) ?  true : false} />);
    
    return (
        <div className={styles.dates}>
            {array ? array_list : list}
        </div>
    )
};

export default Dates_List;


