import Click_Modal from "../items/Click_Modal";
import styles from '../../styles/components/previews/Application_Preview.module.scss';
import Application from "../dashboard/Application";
import { job_categories, management } from "../../tools/global_variables";
import { IoCheckmarkCircleOutline, IoCloseCircleOutline, IoFilterCircleOutline } from "react-icons/io5";
import { Column, Grid, Highlight, Row, RowSpaced } from "../../tools/global_components";
import { time_since } from "../../tools/DateTime_Methods";
import { applicantion_status } from "../../tools/global_functions";
import Application_Step from "../items/Application_Step";
import { GoLocation } from "react-icons/go";
import { FiBriefcase, FiCreditCard } from "react-icons/fi";


function Application_Preview (props) {
    const data = props.data;
    const interviews = props.interviews;
    const status = applicantion_status(data, true);

    const status_handler = (num, active) => {
        if(data.job_data.selected && data.closed && data.selected) return 3
        if(active === false) return 0;
        if(status === num && data.closed) return 1;
        if(status === num && !data.closed) return 2;
        if(num < status) return 3;
    };

    const mini_preview = (
        <section className={styles.mini}>
            <Column fixed={true}>
                <small>{time_since(data.timestamp)}</small>
                <RowSpaced>
                    <h4>{data.position.title}</h4>
                    <Row gap={1}>
                        <Row gap={1}><FiCreditCard/><small>{data.position.salary}k</small></Row>
                        <Row gap={1}><FiBriefcase/><small>{data.position.hours.length}</small></Row>
                        <Row gap={1}><GoLocation /><small>{management[data.position.type]}</small></Row>
                    </Row>
                </RowSpaced>
            </Column>

            <Grid gap={5} columns={"1fr 1fr 1fr 1fr 1fr"} justifyItems={"center"} paddingHorizontal={0}>
                <Mini_Step delay={"0s"} status={status_handler(0, true)} name={"Applied"}  step={1} />
                <Mini_Step delay={"0.2s"} status={status_handler(1, data.viewed)} name={"In Review"}  step={2} />
                <Mini_Step delay={"0.4s"} status={status_handler(2, data.shortlist)} name={"Shortlisted"}  step={3} />
                <Mini_Step delay={"0.6s"} status={status_handler(3, data.interviewed)} name={"Interviews"}  step={4} />
                <Mini_Step delay={"0.8s"} status={status_handler(4, data.selected)} name={"Selected"}  step={5} end={true} />
            </Grid>
        </section>
    )

    const large_preview = (
        <section className={styles.large}>
            <small>{time_since(data.timestamp)}</small>
            
            <RowSpaced>
                <h2>{data.position.title}</h2>
                <Row gap={1}>
                    <Highlight><Row gap={1}><FiCreditCard/><small>{data.position.salary}k</small></Row></Highlight>
                    <Highlight><Row gap={1}><FiBriefcase/><small>{data.position.hours.length}</small></Row></Highlight>
                    <Highlight><Row gap={1}><GoLocation /><small>{management[data.position.type]}</small></Row></Highlight>
                </Row>
            </RowSpaced>

            <small className={styles.large__about}>{data.job_data.about}</small>

            <Grid gap={5} columns={"1fr 1fr 1fr 1fr 1fr"} justifyItems={"center"} paddingHorizontal={0}>
                <Step delay={"0s"} status={status_handler(0, true)} name={"Applied"}  step={1} />
                <Step delay={"0.2s"} status={status_handler(1, data.viewed)} name={"In Review"}  step={2} />
                <Step delay={"0.4s"} status={status_handler(2, data.shortlist)} name={"Shortlisted"}  step={3} />
                <Step delay={"0.6s"} status={status_handler(3, data.interviewed)} name={"Interviews"}  step={4} />
                <Step delay={"0.8s"} status={status_handler(4, data.selected)} name={"Selected"}  step={5} end={true} />
            </Grid>
        </section>
    );
    
    const preview = (
        <section className={styles.application}>

            <div className={styles.application__start}>
                <h4>{data.position.salary}k</h4>
            </div>

            <Column fixed={true} gap={0.5}>
                <h4 style={{lineHeight: 1}}>{data.position.title}</h4>
                <small>{job_categories[data.job_data.category]}</small>
                <Highlight>{time_since(data.timestamp)}</Highlight>
            </Column>

            <Application_Step delay={"0s"} status={status_handler(0, true)} name={"Applied"}  />
            <Application_Step delay={"0.2s"} status={status_handler(1, data.viewed)} name={"In Review"} />
            <Application_Step delay={"0.4s"} status={status_handler(2, data.shortlist)} name={"Shortlisted"} />
            <Application_Step delay={"0.6s"} status={status_handler(3, data.interviewed)} name={"Interviews"} />
            <Application_Step delay={"0.8s"} status={status_handler(4, data.selected)} name={"Selected"} />
            <div className={styles.divider}></div>
        </section>
    );


    return ( 
            <Click_Modal custom={true} height={props.mini ? "100%" : null} content={props.large ? large_preview : props.mini ? mini_preview : preview}>
                <Application data={data} interviews={interviews} />
            </Click_Modal>
    );
};

export default Application_Preview;

function Step (props) {
    const status = props.status;
    const status_icons = [<IoFilterCircleOutline />, <IoCloseCircleOutline />, <IoCheckmarkCircleOutline />, <IoCheckmarkCircleOutline />];
    const status_colors = ["var(--background_medium)", "var(--red)", "var(--secondary_light)", "var(--green)"]

    return (
        <div className={styles.step} style={{opacity: status === 0 ? 0.5 : 1}}>
            <div className={styles.step__icon} style={{backgroundColor: status_colors[status], animationDelay: props.delay}}>
                {status_icons[status]}
                {props.end ? null : ( <div className={styles.step_divider}>
                    <div className={`${styles.step_divider__circle} ${styles.step_divider__circle__left}`}></div>
                    <div className={styles.step_divider__line}></div>
                    <div className={`${styles.step_divider__circle} ${styles.step_divider__circle__right}`}></div>
                </div> )}
            </div>
            <small>Step {props.step}</small>
            <h4>{props.name}</h4>
            <small>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</small>
        </div>
    )

};

function Mini_Step (props) {
    const status = props.status;
    const status_icons = [<IoFilterCircleOutline />, <IoCloseCircleOutline />, <IoCheckmarkCircleOutline />, <IoCheckmarkCircleOutline />];
    const status_colors = ["var(--background_medium)", "var(--red)", "var(--secondary_light)", "var(--green)"]

    return (
        <div className={styles.mini_step} style={{opacity: status === 0 ? 0.5 : 1}}>
            <div className={styles.mini_step__icon} style={{backgroundColor: status_colors[status], animationDelay: props.delay}}>
                {status_icons[status]}
            </div>
            <small>{props.name}</small>
        </div>
    )
};