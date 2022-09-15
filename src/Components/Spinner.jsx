import React, { Component } from 'react'
import loading from './loading.gif';
export default class Spinner extends Component {
  render() {
    return (
      <div className='text-center align-self-center' style={{padding:"35%"}}><img src={loading} alt='Loading'></img></div>
    )
  }
}
