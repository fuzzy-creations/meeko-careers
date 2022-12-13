import styles from '../../styles/pages/Landing.module.scss';



function Training () {
    return (
       <main className={styles.training}>
           <section className={styles.training__content}>
            <h2>Lorem ipsum dolor sit amet</h2>
            <h5>Cras ligula nisl, rhoncus in imperdiet quis, egestas a felis. Praesent pharetra, mi ac eleifend sagittis, arcu augue efficitur est, et scelerisque turpis ipsum nec magna. Nullam auctor, purus vel feugiat laoreet, mauris nulla venenatis metus, in dignissim urna diam id mauris. </h5>
           </section>
           <section className={styles.training__image}></section>
       </main>
    );
};

export default Training;