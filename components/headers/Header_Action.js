import styles from '../../styles/components/headers/Header.module.scss';
import { Column, Row } from '../../tools/global_components';
import { colors_list } from '../../tools/global_variables';
import Button_Main from '../buttons/Button_Main';

function Header_Action (props) {

    return (
        <section className={styles.action}>
            <Column gap={2}>
                <h2>Lorem ipsum dolor</h2>
                <small style={{width: "60rem"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam aliquet, nisl non gravida placerat. Consectetur adipiscing elit. Aliquam aliquet, nisl non gravida placerat.</small>
                <Button_Main action={props.action} width={20}>{props.children}</Button_Main>
            </Column>
            <Row gap={2}>
                <div className={styles.action__box}>
                    <small>{props.labels[0]}</small>
                    <Row gap={1}>
                        <div className={styles.action__box__line} style={{backgroundColor: colors_list.primary}}></div>
                        <h4 class={styles.action__box__amount}>{props.data[0]}</h4>
                    </Row>
                </div>
                <div className={styles.action__box}>
                    <small>{props.labels[1]}</small>
                    <Row gap={1}>
                        <div className={styles.action__box__line} style={{backgroundColor: colors_list.blue}}></div>
                        <h4 class={styles.action__box__amount}>{props.data[1]}</h4>
                    </Row>
                </div>
            </Row>
        </section>
    )
}

export default Header_Action;