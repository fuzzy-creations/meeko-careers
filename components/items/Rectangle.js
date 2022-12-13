import styles from '../../styles/components/items/Shapes.module.scss';
import { FiFileText } from "react-icons/fi";
import { ColumnSpaced } from '../../tools/global_components';
import { colors_list } from '../../tools/global_variables';

function Rectangle (props) {

    return (
        <div className={styles.rectangle} style={{
                backgroundColor: colors_list[props.color], 
                padding: props.large ? "3rem" : props.medium ? "2.5rem" : "2rem", 
                height: props.large ? "13rem" : props.medium ? "11rem" : "9rem",
                // maxWidth: props.large ? null : props.medium ? "28rem" : "25rem"
                }}>
            <ColumnSpaced fixed={true}>
                { props.reverse ? <h2 className={styles.rectangle__text} style={{fontSize: props.large ? "3.8rem" : props.medium ? "3.3rem" : "2.5rem" }}>{props.children}</h2> : <small className={styles.rectangle__name}>{props.name}</small>}
                { props.reverse ? <small className={styles.rectangle__name}>{props.name}</small> : <h2 className={styles.rectangle__text} style={{fontSize: props.large ? "3.8rem" : props.medium ? "3.3rem" : "2.5rem" }}>{props.children}</h2>}
                
            </ColumnSpaced>
            <div className={styles.rectangle__icon}>{props.icon ? props.icon : <FiFileText />}</div>
            {props.noshape ? null : (
                <>
                <div className={styles.rectangle__shape} style={{
                    height: props.large ? "16rem" : props.medium ? "14rem" : "12rem", 
                    width: props.large ? "16rem" : props.medium ? "14rem" : "12rem", 
                }}></div>
                <div className={styles.rectangle__shape} style={{
                    height: props.large ? "16rem" : props.medium ? "14rem" : "12rem", 
                    width: props.large ? "16rem" : props.medium ? "14rem" : "12rem", 
                }}></div>
                </>
            )  }
        </div>
    )
}

export default Rectangle;