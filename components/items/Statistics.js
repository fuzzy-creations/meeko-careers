import styles from '../../styles/components/items/Statistics.module.scss';
import { Row, RowSpaced } from '../../tools/global_components';
import { colors_list } from '../../tools/global_variables';
import Doughnut_Chart from '../charts/Doughnut';



function Statistics (props) {
    const labels = props.labels;
    const data = props.data;
    const title = props.children;
    const total = data.reduce((amount, a) => amount + a, 0);

    console.log(data.length)

    return (
        <section className={styles.analytics}>
                <h4 className={styles.analytics__header}>Statistics</h4>
                <div className={styles.chart}>
                    <Doughnut_Chart labels={labels} data={data} />
                    <div className={styles.chart__text}>
                        <h2>{total}</h2>
                        <small>Total</small>
                    </div>
                </div>
                <h4 className={styles.analytics__small__header}>{title}</h4>
                <RowSpaced gap={2}>
                    <div className={styles.box}>
                        <small>{labels[0]}</small>
                        <Row gap={1}>
                            <div className={styles.box__line} style={{backgroundColor: colors_list.blue}}></div>
                            <h4 class={styles.box__amount}>{data[0]}</h4>
                        </Row>
                    </div>
                    <div className={styles.box}>
                        <small>{labels[1]}</small>
                        <Row gap={1}>
                            <div className={styles.box__line} style={{backgroundColor: colors_list.primary}}></div>
                            <h4 class={styles.box__amount}>{data[1]}</h4>
                        </Row>
                    </div>
                    <div className={styles.box}>
                        <small>{labels[2]}</small>
                        <Row gap={1}>
                            <div className={styles.box__line} style={{backgroundColor: colors_list.orange}}></div>
                            <h4 class={styles.box__amount}>{data[2]}</h4>
                        </Row>
                    </div>

                    {labels.length >= 4 && data.length >= 4 ? 
                    ( <div className={styles.box}>
                        <small>{labels[3]}</small>
                        <Row gap={1}>
                            <div className={styles.box__line} style={{backgroundColor: colors_list.green}}></div>
                            <h4 class={styles.box__amount}>{data[3]}</h4>
                        </Row>
                    </div>) : null
                    }
                    
                </RowSpaced>
                
            </section>
    )
}

export default Statistics;