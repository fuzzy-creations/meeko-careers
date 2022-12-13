import { useContext, useEffect, useState } from 'react';
import Check_Box from '../components/inputs/Check_Box';
import Job_Post from '../components/jobs/Job_Post';
import Job_Preview from '../components/jobs/Job_Preview';
import Empty_List from '../components/UI/Empty_List';
import Loader_Page from '../components/UI/Loader_Page';
import { AuthContext } from '../contexts/Auth.context';
import { ProfileContext } from '../contexts/Profile.context';
import { listenRealTimePosts } from '../firebase/fetches/Main';
import { get_posts } from '../firebase/methods/Post_Functions';
import styles from '../styles/pages/Jobs.module.scss';
import { Column } from '../tools/global_components';
import { job_categories, job_hours, job_remote } from '../tools/global_variables';

function Jobs () {
    const { applications } = useContext(ProfileContext);
    const [selected, set_selected] = useState(0);
    const [jobs, set_posts] = useState([]);

    useEffect(() => {
        listenRealTimePosts(set_posts);
    }, []);

    
    const check_status = (post_id) => applications.some(item => item.post_id === post_id);


    return (
        <>
        <main className={styles.jobs}>
            <section className={styles.body}>
                <section className={styles.category}>
                    <div className={styles.category__list}>
                        <div className={styles.category__list__item}>
                            <div>
                                <p className={styles.category__list__item__name}>Work type</p>
                                {job_hours.map(item => <Check_Box>{item}</Check_Box>)}
                            </div>
                        </div>
                        <div className={styles.category__list__item}>
                            <div>
                                <p className={styles.category__list__item__name}>Location</p>
                                {job_remote.map(item => <Check_Box>{item}</Check_Box>)}
                            </div>
                        </div>
                        <div className={styles.category__list__item}>
                            <div>
                                <p className={styles.category__list__item__name}>Category</p>
                                {job_categories.map(item => <Check_Box>{item}</Check_Box>)}
                            </div>
                        </div>
                    </div>
                </section>
                <section className={styles.main}>
                    <div className={styles.header}>
                        <h2>Lorem ipsum dolor</h2>
                        <small>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque non tellus at sapien tempor pharetra. Praesent sit amet tellus porttitor, elementum metus a, iaculis nunc. Cras congue porta tristique.</small>
                    </div>
                    <Column gap={2}>
                        <Empty_List>{jobs.map((item, index) => <Job_Post data={item} applied={check_status(item.post_id)} selected={selected === index} select={() => set_selected(index)} />)}</Empty_List>
                    </Column>
                </section>
                <section className={styles.preview}>
                    {jobs.length === 0 ? null : <Job_Preview data={jobs[selected]} applied={check_status(jobs[selected].post_id)} />}
                </section>
            </section>
        </main>
        </>
    );
};

export default Jobs;