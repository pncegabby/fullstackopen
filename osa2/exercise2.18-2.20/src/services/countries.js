import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'
const weatherUrl = 'https://api.openweathermap.org/data/2.5/'
const apiKey = import.meta.env.VITE_WEATHER_KEY

const getAll = () => {
    return axios.get(baseUrl).then(response => response.data)
}

const getWeatherByCity = (cityName) => {
    const response = axios.get(`${weatherUrl}weather?q=${cityName}&appid=${apiKey}&units=metric`)
    return response.then(response => response.data)
}

export default {
    getAll,
    getWeatherByCity
}