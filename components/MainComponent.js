import React, { Component } from 'react'
import Menu from './MenuComponent'
import DishDetail from './DishDetailComponent'
import { View } from 'react-native'
import { DISHES } from '../shared/dishes'

export default class MainComponent extends Component {
  state = {
    dishes: DISHES,
    selectedDish: null,
  }

  onDishSelect = (dishID) => {
    this.setState({ selectedDish: dishID })
  }

  render() {
    return (
      <View>
        <Menu 
          dishes={this.state.dishes}
          onPress={(dishID => this.onDishSelect(dishID))}
        />
        <DishDetail dish={this.state.dishes.filter(el => el.id === this.state.selectedDish)[0]} />
      </View>
    )
  }
}
