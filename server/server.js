// Entry point into our back end application
require('dotenv').config('');
const express = require('express');
const morgan = require('morgan');
const db = require('./db');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());


//http://localhost3006/getRestaurants
app.get('/api/v1/restaurants', async (req,res)=>{
    try{
        const results = await db.query("select * from test");    
        
        res.status(200).json({
            status: "success",
            results: results.rows.length,
            data: {
                restaurants: results.rows,
            }
            
        })
    } catch (err) {
        console.log('Error')

    }    
});

/*
data: {
    restaurants: ["TEST"]
}

*/

//Weiteres Beispiel um ein spezielle Restaurant zu bekommen
app.get('/api/v1/restaurants/:id', async (req,res)=>{
    console.log(req.params.id)
    try{
        const results = await db.query("select * from test where id = $1", //Muss so dargestellt werden, sonstg können nur integer berücksichtigt werden
        [req.params.id]                                                    // es können so viele Placeholer eingefügt werden wie gewünscht
        );                                                                                  
        //console.log(results.rows[0])
        res.status(200).json({
            status: "success",
            results: results.rows.length,
            restaurants: results.rows,
        })
    } catch (err) {
        console.log('Error')

    } 
});

//Erzeugung eines Restaurants: Wie können wir Express-Server zum Client etwas senden
app.post('/api/v1/restaurants', async (req,res)=>{
    console.log(req.body);
    try{
        const results = await db.query("insert into test (id) values ($1) returning *", [req.body.id]                                                    
        );                                                                                  
        //console.log(results)
        res.status(201).json({
            status: "success",
            data: {
                restaurant: results.rows[0],
            }
            
        })
    } catch (err) {
        console.log('Error')

    }
});

// Update Restaurants
app.put('/api/v1/restaurants/:id',async (req,res)=>{
    console.log(req.body);
    try{
        const results = await db.query("update test set id = $1 where id = $2 returning  *", [req.body.id, req.params.id]                                                    
        );                                                                                  
        //console.log(results)
        res.status(200).json({
            status: "success",
            data: {
                restaurants: results.rows[0]
            }
            
        })
    } catch (err) {
        console.log('Error')

    }
});

app.delete('/api/v1/restaurants/:id',async (req,res)=>{
    console.log(req.body);
    try{
        const results = await db.query("delete from test where id = $1", [req.params.id]                                                    
        );                                                                                  
        //console.log(results)
        res.status(204).json({
            status: "success",
            data: {restaurants: results.rows[0]
            }
        })
    } catch (err) {
        console.log('Error')

    }
});

const port = process.env.PORT || 3001;

app.listen(port,() => {
    console.log(`Server ist up and Listening on Port ${port}`)
});