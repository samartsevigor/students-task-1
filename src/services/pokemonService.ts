import { Pokemon } from '../types/types'

const API_BASE_URL = 'https://pokeapi.co/api/v2'

export const fetchPokemon = async (
  name: string
): Promise<Pokemon | undefined> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/pokemon/${name.toLowerCase()}`
    )
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    return await response.json()
  } catch (error) {
    console.error('Error fetching Pokemon:', error)
    return undefined
  }
}

export const fetchPokemons = async (
  limit = 20,
  offset = 0
): Promise<Pokemon[]> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/pokemon?limit=${limit}&offset=${offset}`
    )
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    const data = await response.json()
    const promises = data.results.map(
      async (pokemon: { name: string; url: string }) => {
        const result = await fetch(pokemon.url)
        return result.json()
      }
    )
    return await Promise.all(promises)
  } catch (error) {
    console.error('Error fetching Pokemons:', error)
    return []
  }
}
