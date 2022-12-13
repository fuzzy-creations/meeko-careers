import styles from '../../styles/pages/Landing.module.scss';



function About () {
    return (
       <main className={styles.about}>
           <section className={styles.about__image}>
               <div className={styles.about__image__icon}>
                   <div className={styles.about__image__icon__text}>
                       <p className={styles.about__image__icon__text__title}>Members</p>
                       <p className={styles.about__image__icon__text__number}>35</p>
                   </div>
               </div>
           </section>
           <section className={styles.about__content}>
               <h2>Lorem ipsum dolor sit amet</h2>
               <h5>Cras ligula nisl, rhoncus in imperdiet quis, egestas a felis. Praesent pharetra, mi ac eleifend sagittis, arcu augue efficitur est, et scelerisque turpis ipsum nec magna. Nullam auctor, purus vel feugiat laoreet, mauris nulla venenatis metus, in dignissim urna diam id mauris.</h5>
           </section>
       </main>
    );
};

export default About;