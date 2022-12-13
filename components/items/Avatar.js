import styles from '../../styles/components/items/Avatar.module.scss';

function Avatar (props) {
    const name = props.name;
    return (
        <div className={styles.avatar} style={{alignItems: props.start ? "flex-start" : "center", gap: name ? "1rem" : null}}>
            <img src={props.children} />
            <h4 class="bold medium">{name}</h4>
        </div>
    )
};

export default Avatar;