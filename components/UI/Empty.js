import styles from '../../styles/components/UI/Empty.module.scss';
import image from '../../assets/cat.png';
import Button_Main from '../buttons/Button_Main';
function Empty (props) {

    return !props.children ? (
        <section className={styles.element}>
            <img className={styles.image} src={image} />
            <small className={styles.text}>Lorem ipsum dolor sit amet</small>
        </section>
    ) : props.children;

};

export default Empty;