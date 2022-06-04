import React,{useContext, useEffect} from 'react';
import RestaurantFinder from '../apis/RestaurantFinder';
import { RestaurantsContext } from '../context/RestaurantsContext';
import { useNavigate } from "react-router-dom";


const RestaurantList = (props) => {
    const {restaurants,setRestaurants} = useContext(RestaurantsContext)
    const navigate = useNavigate()


    useEffect(() =>{
        const fetchData = async () =>{        
            try {
                const response = await RestaurantFinder.get('/')
                console.log(response.data.data)
                setRestaurants(response.data.data.restaurants)
                
            } catch (err) { }
        }
        fetchData();
    },[])

    const handleDelete = async (e,id) =>{
        e.stopPropagation()
        try {
            const response = await RestaurantFinder.delete(`/${id}`)
            setRestaurants(restaurants.filter(restaurant => {
                return restaurant.id !== id
            }))
            
        } catch (err) {}
    }

    const handleUpdate = (e, id) => {
        e.stopPropagation()
        navigate(`/restaurants/${id}/update`)
    }

    const handleRestaurantSelect = (id) =>{
        navigate(`/restaurants/${id}`)
    }


  return (
    <div className='list-group'>
        <table className="table table-hover table-dark">
            <thead>
                <tr className='bg-primary'>
                    <th scope='col'>Restaurant</th>
                    <th scope='col'>Location</th>
                    <th scope='col'>Price Range</th>
                    <th scope='col'>Rating</th>
                    <th scope='col'>Edit</th>
                    <th scope='col'>Delete</th>
                </tr>
            </thead>
            <tbody>
                {restaurants &&
                    restaurants.map((restaurant) => {
                    return (
                        <tr onClick={ () => handleRestaurantSelect(restaurant.id)} key={restaurant.id}>
                            <td>{restaurant.id}</td>
                            <td>New York</td>
                            <td>$$</td>
                            <td>rating</td>
                            <td><button onClick={(e) =>handleUpdate(e,restaurant.id)}  className='btn btn-warning'>Update</button></td>
                            <td><button onClick={(e) =>handleDelete(e,restaurant.id)} className='btn btn-danger'>Delete</button></td>

                        </tr>
                    );
                    })}

            </tbody>
        </table>
    </div>
  )
}

export default RestaurantList

/*
            
                <tr>
                 <td>mcdonalds</td>
                    <td>New York</td>
                    <td>$$</td>
                    <td>rating</td>
                    <td><button className='btn btn-warning'>Update</button></td>
                    <td><button className='btn btn-danger'>Delete</button></td>
                </tr> 

*/ 