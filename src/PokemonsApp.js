import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./pokemonsApp.module.css";
import PokemonList from "./components/PokemonList";
import PokemonDetails from "./components/PokemonDetails";

const url = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20";

// class PokemonsApp extends React.Component {

  const PokemonsApp = () => {

  // state = {
  //   pokemons: null,
  //   selectedPokemon: null,
  //   pokemonDetails: null,
  //   pokemonUrl: null,
  //   previous: null,
  //   next: url,
  // };

  const [pokemons, setPokemons] = useState(null);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [pokemonDetails, setPokemonDetails] = useState(null);
  const [pokemonUrl, setPokemonUrl] = useState(null);
  const [previous, setPrevious] = useState(null);
  const [next, setNext] = useState(url);

  // componentDidMount() {
  //   axios.get(`${url}`).then((response) => {
  //     const pokemons = response.data.results;
  //     const next = response.data.next;
  //     this.setState({ pokemons, next });
  //   });
  // }

  // on hooks
  useEffect(() => {
    axios.get(`${url}`).then((response) => {
          const pokemons = response.data.results;
          const next = response.data.next;
          // this.setState({ pokemons, next });
          setPokemons(pokemons);
          setNext(next);
        });
  }, []);

  // componentDidUpdate(prevProps, prevState) {
  //   if (this.state.selectedPokemon !== prevState.selectedPokemon) {
  //     this.fetchData(this.state.selectedPokemon);
  //   }

  //   if (this.state.pokemonUrl !== prevState.pokemonUrl) {
  //     this.fetchData(this.state.pokemonUrl);
  //   }
  // }

  // on hooks
  useEffect(() => {
    if (selectedPokemon !== null) {
      fetchData(selectedPokemon);
    }
  }, [selectedPokemon]);

  const getInfo = (name) => {
    const selectedPokemon = pokemons.filter((pokemon) => {
      if (pokemon.name === name) {
        let pokemonUrl = pokemon.url;
        setPokemonUrl(pokemonUrl);
        
        return pokemon;
      }
      return null;
    });

    // this.setState({
    //   selectedPokemon: selectedPokemon[0].results,
    //   pokemonUrl: pokemonUrl,
    // });
    setSelectedPokemon(selectedPokemon);
  };

  const fetchData = () => {
    axios.get(`${pokemonUrl}`).then((response) => {
      const pokemonDetails = response.data;
      // this.setState({ pokemonDetails });
      setPokemonDetails(pokemonDetails);
    });
  };

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const prevPage = () => {
    if (previous !== null) {
      axios.get(`${previous}`).then((response) => {
        const next = response.data.next;
        const previous = response.data.previous;
        const pokemons = response.data.results;
        // this.setState({ next, previous, pokemons });

        setNext(next);
        setPrevious(previous);
        setPokemons(pokemons);
      });
    }
  };

  const nextPage = () => {
    axios.get(`${next}`).then((response) => {
      const next = response.data.next;
      const previous = response.data.previous;
      const pokemons = response.data.results;
      // this.setState({ next, previous, pokemons });
      setNext(next);
      setPrevious(previous);
      setPokemons(pokemons);
    });
  };

  // render() {
  //   const { pokemons, pokemonDetails } = this.state;

    if (!pokemons) {
      return (
        <div>
          <h1>Loading...</h1>
        </div>
      );
    }

    return (
      <div>
        <div>
          <div className={styles.pokemons}>
            <PokemonList
              pokemons={pokemons}
              getInfo={getInfo}
              capitalizeFirstLetter={capitalizeFirstLetter}
            />

            {pokemonDetails && (
              <PokemonDetails
                capitalizeFirstLetter={capitalizeFirstLetter}
                pokemonDetails={pokemonDetails}
                url={pokemonUrl}
                getInfo={getInfo}
              />
            )}
          </div>
          <div className={styles.pokemonAppButtons}>
            <button
              className={styles.pokemonAppBtn}
              onClick={() => prevPage()}
            >
              PREVIOUS
            </button>
            <button
              className={styles.pokemonAppBtn}
              onClick={() => nextPage()}
            >
              NEXT
            </button>
          </div>
        </div>
      </div>
    );
  }
// }
export default PokemonsApp;