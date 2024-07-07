import { Component } from 'react'
import Search from './components/Search'
import { AppProps, AppState } from './types/types'
import { fetchPokemon, fetchPokemons } from './services/pokemonService'
import ErrorComponent from './components/Error'
import PokemonsList from './components/PokemonsList'
import Loading from './components/Loading'

class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props)
    this.state = {
      pokemons: [],
      notFound: false,
      searching: false,
      error: null,
    }
    this.handleSearch = this.handleSearch.bind(this)
    this.showPokemons = this.showPokemons.bind(this)
    this.buildError = this.buildError.bind(this)
  }

  buildError() {
    this.setState({
      error: 'An unexpected error occurred.',
      pokemons: [],
    })
  }

  async handleSearch(textSearch: string | null) {
    try {
      if (!textSearch) {
        this.setState({
          notFound: false,
          error: null,
        })
        await this.showPokemons()
        return
      }

      this.setState({
        notFound: false,
        searching: true,
        error: null,
      })

      const data = await fetchPokemon(textSearch)
      if (!data) {
        this.setState({
          notFound: true,
        })
      } else {
        this.setState({
          pokemons: [data],
          notFound: false,
          searching: false,
        })
      }
    } catch (error) {
      if (error instanceof Error) {
        this.setState({
          error: error.message,
        })
      } else {
        this.setState({
          error: 'An unexpected error occurred.',
        })
      }
    } finally {
      this.setState({
        searching: false,
      })
    }
  }

  async showPokemons(limit = 20, offset = 0) {
    try {
      this.setState({
        error: null,
        notFound: false,
        searching: true,
      })
      const results = await fetchPokemons(limit, offset)
      this.setState(() => ({
        pokemons: [...results],
        notFound: false,
        searching: false,
      }))
    } catch (error) {
      if (error instanceof Error) {
        this.setState({
          error: error.message,
          searching: false,
        })
      } else {
        this.setState({
          error: 'An unexpected error occurred.',
          searching: false,
        })
      }
    }
  }

  componentDidMount() {
    const lastSearch = localStorage.getItem('lastSearch')
    if (lastSearch) {
      this.handleSearch(lastSearch)
    } else {
      this.showPokemons()
    }
  }

  render() {
    return (
      <div className="container">
        <Search
          onHandleSearch={this.handleSearch}
          handleBuildError={this.buildError}
        />
        {this.state.error && <ErrorComponent error={this.state.error} />}
        {this.state.searching ? (
          <Loading />
        ) : this.state.notFound ? (
          <div>Pokemon not found</div>
        ) : (
          <PokemonsList pokemons={this.state.pokemons} />
        )}
      </div>
    )
  }
}

export default App
