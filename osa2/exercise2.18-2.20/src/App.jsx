import { useEffect, useState } from 'react'
import Countries from './components/Countries'
import countriesService from './services/countries'

function App() {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    countriesService
    .getAll()
    .then(allCountries => {
      setCountries(allCountries)
    })
  }, [])

  const filterCountries = filter === '' ? countries : countries.filter(country => {return country.name.common.toLowerCase().includes(filter.toLowerCase())})



  return (
    <div>
      <span>find countries </span>
      <input
        value={filter}
        onChange={event => setFilter(event.target.value)}
      />
      <Countries countries={filterCountries} onFilter={setFilter}/>
    </div>
  )
}

export default App