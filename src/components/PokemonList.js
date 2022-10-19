import styles from './styles/pokemonList.module.css';
import PokemonItem from './PokemonItem';

const PokemonList = (props) => {
    const { pokemons, getInfo, capitalizeFirstLetter } = props;

    const allPokemons = pokemons.map(pokemon => {
        return <PokemonItem key={pokemon.name} {...pokemon} getInfo = {getInfo} capitalizeFirstLetter={capitalizeFirstLetter}/>
    })

    return (
        <div className={styles.pokemonList}>
            <p className={styles.pokemonTitle}>POKEMONS</p>
            <div>
                {allPokemons}
            </div>
        </div>
    )
}
export default PokemonList;