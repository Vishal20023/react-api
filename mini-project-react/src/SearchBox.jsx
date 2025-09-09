import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import './SearchBox.css';
import { useState } from 'react';

export default function SearchBox({updateInfo}){
    let [city,setCity]=useState("");
    let [error,setError]=useState(false);
    const API_URL="https://api.openweathermap.org/data/2.5/weather";
    const API_key="00121ace387b28b3d56cab0321c68437";

    let getWeatherInfo = async ()=>{
      
         let response = await fetch(`${API_URL}?q=${city}&appid=${API_key}&units=metric`)
       let jsonResponse=await response.json();
       console.log(jsonResponse);
       let result={
        city:city,
       temp:jsonResponse.main.temp,
       tempMin:jsonResponse.main.temp_min,
       tempMax:jsonResponse.main.temp_max,
       humidity:jsonResponse.main.humidity,
       feelsLike:jsonResponse.main.feelsLike,
       weather:jsonResponse.weather[0].description,
       };
       console.log(result);
       return result;
      
      
    };
    
    let handleChange=(evt)=>{
        setCity(evt.target.value);
    }
    let handleSubmit=async (evt)=>{
       try{
         evt.preventDefault();
        console.log(city);
        setCity("");
        let newInfo=await getWeatherInfo();
        updateInfo(newInfo);
        setError(false);
       }
       catch(err){
        setError(true)

       }
    }
    return(
         <div className='SearchBox'>
      
      <form action="" onSubmit={handleSubmit}> 
        <TextField id="city" label="City Name" variant="outlined" required value={city} onChange={handleChange}/>
        <br /> <br />
        <Button variant="contained" type='submit' style={{color:"blue"}}><div style={{color:"wheat"}}>Search</div></Button>
        {error && <p style={{color:"red"}}>No such place Exists!</p>}
      </form>
    </div>
    )
}