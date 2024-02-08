const express = require("express");
const app = express();
const port = process.env.PORT || 8888
const ejs = require("ejs");
const axios = require("axios");

//  This is the public directory path 

app.use(express.static("public"));

// This is ejs setup 
app.set('view engine' , "ejs");



//  Handle weather route 

app.get('/weather' ,async(req, res)=>{
 
    const city = req.query.city;
    const apikey = "d91fb05d3e5e0173037fa2a524bc1bd3";
     let apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apikey}`;
     let weather;
     let error = null;

     try
      {
         const response = await axios.get(apiurl); 
          weather = response.data;
      }
      catch(error)
      {
              weather = null;
              error = "Error, Please try again later"
      } 
      res.render("index" ,{weather ,error})
     
})



//   Logic part 



// app.get("/" , (req ,res)=>{
//     res.render("index");
// })


app.get("/" , (req ,res)=>{
    res.render("index" ,{weather: null , error: null});
})

app.listen(port , ()=>{
    console.log(`The server runs on the ${port}`);
})