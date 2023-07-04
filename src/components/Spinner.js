import React, { Component } from 'react'
import spinnerGif from './loading.gif';
export default class Spinner extends Component {
  render() {
    return (
      <div>
        <img src={spinnerGif} alt="gif" />
      </div>
    )
  }
}
