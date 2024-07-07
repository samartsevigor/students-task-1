import { Component, ChangeEvent, KeyboardEvent, MouseEvent } from 'react'
import './Search.css'

interface SearchProps {
  onHandleSearch: (search: string | null) => void
  handleBuildError: () => void
}

interface SearchState {
  search: string
}

class Search extends Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props)
    this.state = {
      search: localStorage.getItem('lastSearch') || '',
    }
    this.handleSearch = this.handleSearch.bind(this)
    this.handleClickSearch = this.handleClickSearch.bind(this)
  }

  handleSearch(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value.trim()
    this.setState({
      search: value,
    })
  }

  handleClickSearch(
    e: KeyboardEvent<HTMLInputElement> | MouseEvent<HTMLButtonElement>
  ) {
    if (
      (e as KeyboardEvent<HTMLInputElement>).key === 'Enter' ||
      e.type === 'click'
    ) {
      e.preventDefault()
      this.props.onHandleSearch(this.state.search)
      localStorage.setItem('lastSearch', this.state.search)
    }
  }

  render() {
    return (
      <div className="search">
        <input
          className="search__input"
          type="search"
          onChange={this.handleSearch}
          placeholder="Search your pokemon ..."
          onKeyDown={this.handleClickSearch}
          autoFocus
          value={this.state.search}
        />
        <button className="search__button" onClick={this.handleClickSearch}>
          Search
        </button>
        <button
          className="search__button error"
          onClick={this.props.handleBuildError}
        >
          Create new error
        </button>
      </div>
    )
  }
}

export default Search
