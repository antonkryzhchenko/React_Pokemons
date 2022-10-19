import React from "react";
import axios from "axios";
import styles from "./pokemonsApp.module.css";
import PokemonList from "./components/PokemonList";
import PokemonDetails from "./components/PokemonDetails";

const url = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20";
let pokemonUrl = "";
class PokemonsApp extends React.Component {
  state = {
    pokemons: null,
    selectedPokemon: null,
    pokemonDetails: null,
    pokemonUrl: null,
    previous: null,
    next: url,
  };

  componentDidMount() {
    axios.get(`${url}`).then((response) => {
      const pokemons = response.data.results;
      this.setState({ pokemons });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.selectedPokemon !== prevState.selectedPokemon) {
      this.fetchData(this.state.selectedPokemon);
    }

    if (this.state.pokemonUrl !== prevState.pokemonUrl) {
      this.fetchData(this.state.pokemonUrl);
    }
  }

  getInfo = (name) => {
    const selectedPokemon = this.state.pokemons.filter((pokemon) => {
      if (pokemon.name === name) {
        pokemonUrl = pokemon.url;
        return pokemon;
      }

      return null;
    });

    this.setState({
      selectedPokemon: selectedPokemon[0].results,
      pokemonUrl: pokemonUrl,
    });
  };

  fetchData = () => {
    axios.get(`${pokemonUrl}`).then((response) => {
      const pokemonDetails = response.data;
      this.setState({ pokemonDetails });
    });
  };

  capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  prevPage = () => {
    if (this.state.previous !== null) {
      axios.get(`${this.state.previous}`).then((response) => {
        const next = response.data.next;
        const previous = response.data.previous;
        const pokemons = response.data.results;
        this.setState({ next, previous, pokemons });
      });
    }
  };

  nextPage = () => {
    axios.get(`${this.state.next}`).then((response) => {
      const next = response.data.next;
      const previous = response.data.previous;
      const pokemons = response.data.results;
      this.setState({ next, previous, pokemons });
    });
  };

  render() {
    const { pokemons, pokemonDetails } = this.state;

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
              getInfo={this.getInfo}
              capitalizeFirstLetter={this.capitalizeFirstLetter}
            />

            {pokemonDetails && (
              <PokemonDetails
                capitalizeFirstLetter={this.capitalizeFirstLetter}
                pokemonDetails={pokemonDetails}
                url={pokemonUrl}
                getInfo={this.getInfo}
              />
            )}
          </div>
          <div className={styles.pokemonAppButtons}>
            <button
              className={styles.pokemonAppBtn}
              onClick={() => this.prevPage()}
            >
              PREVIOUS
            </button>
            <button
              className={styles.pokemonAppBtn}
              onClick={() => this.nextPage()}
            >
              NEXT
            </button>
          </div>
        </div>
      </div>
    );
  }
}
export default PokemonsApp;