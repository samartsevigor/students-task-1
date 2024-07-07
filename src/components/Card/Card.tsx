import { Component } from 'react'
import './Card.css'

interface CardProps {
  name: string
  image: string
  height: number
  weight: number
}

class Card extends Component<CardProps> {
  constructor(props: CardProps) {
    super(props)
  }

  render() {
    return (
      <div className="card">
        <h3>{this.props.name}</h3>
        <img
          width={120}
          height={120}
          src={this.props.image}
          alt={this.props.name}
          loading="lazy"
        />
        <p>Height: {this.props.height}</p>
        <p>Weight: {this.props.weight}</p>
      </div>
    )
  }
}

export default Card
