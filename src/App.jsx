import { useState } from "react";
import sun from './images/sun.png';
import snowman from './images/snowman.png';
function App() {
  const [inputValue,setInputValue] = useState("");
  const [temperature,setTemperature] = useState(0);
  const [cityname,setCityName] = useState("");
  const [countryname,setCountryName] = useState("");
  const [succes,setSucces] = useState(false);
  const [error,setError] = useState(false);
  const [errorMessage,setErrorMessage] = useState('');
  const [description,setDescription] = useState('');
  const dateBuilder = (d) =>{
      
  }
  const onChange = (e) =>{
    setInputValue(e.target.value)
  }
  const onKeyPress = async (e) =>{
    if(e.key === "Enter"){
      try{
        const respond = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=af715e6e626af11bbcd67c4a56748b02&units=metric`);
        const data = await respond.json()
        setTemperature(Math.round(data.main.temp));
        setCityName(data.name);
        setCountryName(data.sys.country);
        setDescription(data.weather[0].description);
        setSucces(true);
        setError(false);
      }catch(error){
        setSucces(false);
        setError(true);
        setErrorMessage('Opps... Try again')
      }
    }
  }

  const imageChoosing = (temp) =>{
    if(temp > 10){
      return <img className="sun" alt="picture of sun" src={sun}></img>
    }else{
      return <img className="snowman" alt="picture of sun" src={snowman}></img>
    }
  }

  return (
   
    <div className="App">
        <main>
          <div className="search-box">
            <input type="text" className="search-bar" onKeyPress={(e)=> onKeyPress(e) } value={inputValue} onChange={(e)=> onChange(e)} placeholder="Search..." />
            {error && <div className="error">{errorMessage}</div>}
          </div>
          <div className="location-box">
            <article>
              <div className="location">{succes && cityname}{succes && ","}{succes && countryname}</div>
              <div className="Temperature">{succes && temperature}{succes && "℃"} </div>
              <div className="description">{succes && description}</div>
            </article>
            <div className="picture">{succes && imageChoosing(temperature) }</div>
          </div>
        </main>
    </div>
  );
}

export default App;
