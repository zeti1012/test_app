import React from 'react'
import Header from '../componenets/Header'
import AddRestaurant from '../componenets/AddRestaurant'
import RestaurantList from '../componenets/RestaurantList'

const Home = () => {
  return (
    <div>
        <Header/>
        <AddRestaurant/>
        <RestaurantList/>
    </div>
  )
}

export default Home