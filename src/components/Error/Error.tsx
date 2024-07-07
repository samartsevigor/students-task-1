import { Component } from 'react'
import './Error.css'

interface ErrorProps {
  error: string
}

class Error extends Component<ErrorProps> {
  render() {
    const { error } = this.props
    return (
      <div className="ErrorComponent">
        <p>Ошибка: {error}</p>
      </div>
    )
  }
}

export default Error
