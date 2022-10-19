import React from 'react';
import styles from './styles/pokemonDetails.module.css';

const PokemonDetails = (props) => {
    const {pokemonDetails, capitalizeFirstLetter} = props;
    const {name, sprites} = pokemonDetails;

    return(
        <div className={styles.pokemonDetails}>
            <p className={styles.pokemonDetailsTitle}>{capitalizeFirstLetter(name)}</p>
            <div>
                <img
                className={styles.pokemonDetailsImg} 
                    src={sprites.front_default} 
                    alt='pic'>
                </img>

                <img
                className={styles.pokemonDetailsImg} 
                    src={sprites.back_default} 
                    alt='pic'>
                </img>
            </div>
        </div>
    )
}
export default PokemonDetails;