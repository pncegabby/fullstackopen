import { useState, useEffect } from "react"
import countriesService from "../services/countries"

const Country = ({country}) => {
    const [weatherData, setWeatherData] = useState()

    const languages = Object.entries(country.languages).map(([code, name]) => {
        return <li key={code}>{name}</li>
    })

    const capital = country.capital[0]

    useEffect(() => {
        countriesService.getWeatherByCity(capital)
        .then(weatherData => setWeatherData(weatherData))
        .catch(error => console.error('Failed to fetch weather', error))
    }, [capital])

    return (
        <div>
            <h1>{country.name.common || country.name.official || 'Missing Country Name'}</h1>
            <p>Capital: {capital || 'No Capital'}</p>
            <p>Area: {country.area || 'N/A'}</p>
            <h2>Languages</h2>
            <ul>
                {languages}
            </ul>
            <img 
                src={country.flags.png}
            />
            {weatherData ? (
                <div>
                    <h2>Weather in {capital}</h2>
                    <p>Temperature {weatherData.main.temp} Celsius</p>
                    <img 
                        src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} 
                        alt={weatherData.weather[0].description}
                    
                    />
                    <p>Wind {weatherData.wind.speed} m/s</p>
                </div>
                
            ) : (<div>Loading Weather</div>)}
            

        </div>
    )
}

export default Country