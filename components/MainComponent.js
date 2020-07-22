import React, { Component } from 'react'
import Menu from './MenuComponent'
import { DISHES } from '../shared/dishes'

export default class MainComponent extends Component {
  state = {
    dishes: DISHES,
  }

  render() {
    return (
      <Menu dishes={this.state.dishes} />
    )
  }
}
