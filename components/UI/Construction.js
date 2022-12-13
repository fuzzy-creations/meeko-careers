import image from '../../assets/under-construction.png';
import styles from '../../styles/components/UI/Construction.module.scss';


function Construction () {
    return (
        <main className={styles.main}>
            <img src={image} />
            <h2>Under Construction</h2>
            <small>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed rutrum sapien at nulla sodales tincidunt. Ut congue dui vitae dui sagittis, eu tristique quam condimentum.</small>
        </main>
    )
}

export default Construction;