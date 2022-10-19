import styles from './styles/pokemonItem.module.css';

const PokemonItem = (props) => {
    const {name, getInfo, capitalizeFirstLetter} = props;

    return (
    <div className={styles.pokemonItem}>
        <p className={styles.pokemonItemTitle}>{capitalizeFirstLetter(name)}</p>
        <button
            className={styles.pokemonItemBtn}
            onClick={() => getInfo(name)}
            >MORE...</button>
    </div>
    )
}
export default PokemonItem;