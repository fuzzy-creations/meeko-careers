import styles from '../../styles/components/wrappers.module.scss';

function Wrapper_Main (props) {
    return (
        <section className={styles.main}>
            {props.children}
        </section>
    )
}

export default Wrapper_Main;