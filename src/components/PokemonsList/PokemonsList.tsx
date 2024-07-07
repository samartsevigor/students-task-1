import { Component } from 'react'
import Card from '../Card/Card.tsx'
import { Pokemon } from '../../types/types'

interface PokemonsListProps {
  pokemons: Pokemon[]
}

class PokemonsList extends Component<PokemonsListProps> {
  constructor(props: PokemonsListProps) {
    super(props)
  }
  render() {
    return (
      <div className="row">
        {this.props.pokemons.map((poke) => (
          <div key={poke.id} className="col-3">
            <Card
              name={poke.name}
              image={poke.sprites.front_default}
              height={poke.height}
              weight={poke.weight}
            />
          </div>
        ))}
      </div>
    )
  }
}

export default PokemonsList
