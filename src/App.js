  import { useState, useEffect } from 'react'
import './App.css';
import image from '../src/imgs/search.png'
import { motion } from "framer-motion"
import back from '../src/imgs/back.jpg'
function App() {  
  let [weatherData, setweatherData]=useState([])
  const [getCity, setcity] = useState("Karachi")
  let [degree,setDegree]=useState('c')
  let  getWeather = async(city)=>{
    const url = `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${city}&days=3`;
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '85a3c02001mshf5968ad7f659381p16ccf3jsn286bcfe87cf2',
		'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.json();
	console.log(result)
  let data=[result]
  setweatherData(data)
} catch (error) {
	console.error(error);
}
  }
  useEffect(()=>{
    getWeather(getCity)
  },[])  
  return (
    <div className='main-container'>
      <div className='background-pic'>
      <img src={back} alt=''></img>
      </div>
     
    <div className='container'> 
    <div className='weather-app'>  
          <div className='Search-bar'>
               <motion.input
              //  initial={{x:'-50px'}}
               animate={{scale:[0,1.3,1]}}
               transition={{type:"spring",stiffness:200}}
               type='text' placeholder='type of city' onChange={(e)=>setcity(e.target.value)}/>
               <button onClick={()=>getWeather(getCity)}><img src={image}></img></button>
          </div>
             {weatherData.map((v,k)=>{
              return(<div key={k}>
               
                <motion.div
                 initial={{y:-30,opacity:0}}
                       whileInView={{y:0,opacity:1}}
                        transition={{duration:1,delay:0.2}}
                 className='location'>
                <h1>{v.location.name}</h1>
                {/* <h2>{v.location.region}</h2> */}
                <h3>{v.location.localtime}</h3>
                </motion.div>
                 <div className='main'>
                <motion.div
                 initial={{y:-30,opacity:0}}
                 whileInView={{y:0,opacity:1}}
                  transition={{duration:1,delay:0.8}}
                className='temp-c'> 
                <h3>{degree==='c'?v.current.temp_c:v.current.temp_f}<sup>{degree}</sup></h3>
                </motion.div> 
                <div className='weather'>
                <motion.img 
                 initial={{y:-30,opacity:0}}
                 whileInView={{y:0,opacity:1}}
                  transition={{duration:1,delay:1.3}}
                src={v.current.condition.icon} alt=''></motion.img>
                </div>
                <motion.div
                 initial={{y:-30,opacity:0}}
                 whileInView={{y:0,opacity:1}}
                  transition={{duration:1,delay:1}}
                className='degreeBtn'>
                  <button onClick={()=>setDegree('c')}>c</button>
                  <button onClick={()=>setDegree('f')}>f</button>
                </motion.div>
                </div>
                   <div className='weekly-data'>
                      {v.forecast.forecastday.map((val,ke)=>{
                      return(<div className='dayCard'>
                        <motion.div
                        initial={{y:-30,opacity:0}}
                       whileInView={{y:0,opacity:1}}
                        transition={{duration:1,delay:1.5}}
                        className='card'>
                          <h1>{val.day.condition.text}</h1>
                          <img src={val.day.condition.icon} alt=''></img> 
                          <h3>{val.day.maxtemp_c}</h3>
                          </motion.div>
                      </div>
                      )})}
                   </div>
              </div>)
             })}
    </div>
    </div>
    </div>
  );
}

export default App;
