import React, {useContext, useState} from 'react';
import RestaurantFinder from "../apis/RestaurantFinder";
import { RestaurantsContext } from '../context/RestaurantsContext';


const AddRestaurandt = () => {
    const {addRestaurants} =useContext(RestaurantsContext)
    const [id, setName] = useState("");
    const [location, setLocation] = useState("");
    const [priceRange, setPriceRange] = useState("Price Range")
    
    const handleSubmit = async (e) =>{
        e.preventDefault()
        try {
            const response = await RestaurantFinder.post("/",{
                id
            })
            addRestaurants(response.data.data.restaurant)
        } catch (err) {
            
        }

    }
  return (
    <div className='mb-4'>
        <from action=''>
            <div className='row'>
                <div className="col">
                    <input value={id} onChange={(e) => setName(e.target.value)} type="text" className='from-control' placeholder='id'/>
                </div>
                <div className="col">
                <input value={location} onChange={(e) => setLocation(e.target.value)} className="form-control" type="text" placeholder="location"/>        
                </div>
                <div className="col">
                    <select value={priceRange} onChange={(e) => setPriceRange(e.target.value)} className="custom-select my-1 mr-sm-2">
                        <option disabled>Price Range</option>
                        <option value="1">$</option>
                        <option value="2">$$</option>
                        <option value="3">$$$</option>
                        <option value="4">$$$$</option>
                        <option value="5">$$$$$</option>
                    </select>       
                </div>
                <div className='col'>
                    <button onClick={handleSubmit} type='submit' className='btn btn-primary'>Add</button>
                </div>
            </div>
        </from>
    </div>
  )
}

export default AddRestaurandt