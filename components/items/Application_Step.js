
import styles from '../../styles/components/previews/Application_Preview.module.scss';
import { IoCheckmarkCircleOutline, IoCloseCircleOutline, IoWarningOutline, IoCheckmarkDoneCircleOutline, IoFilterCircleOutline } from "react-icons/io5";
import { Column, ColumnSpaced, Highlight, Row } from "../../tools/global_components";


function Application_Step (props) {
    const status = props.status;
    const status_titles = ["Inactive", "Closed", "Active", "Complete",]
    const status_icons = [<IoFilterCircleOutline />, <IoCloseCircleOutline />, <IoCheckmarkCircleOutline />, <IoCheckmarkCircleOutline />];
    const status_colors = ["var(--background_medium)", "var(--red)", "var(--secondary_light)", "var(--green)"]
    // complete, ongoing, closed, inactive 

    return (
        <div className={styles.box} style={{backgroundColor: status_colors[status], animationDelay: props.delay}}>
            <ColumnSpaced fixed={true}>
                <h4 class="white">{props.name}</h4>
                <small className={styles.box__date}>{status_titles[status]}</small>
            </ColumnSpaced>
            <div className={`${styles.box__icon}`}>{status_icons[status]}</div>
            {/* <div className={styles.box__shape}></div>
            <div className={styles.box__shape}></div> */}
        </div>
    )

};


export default Application_Step;