import Country from "./Country"

const Countries = ({countries, onFilter}) => {

    const length = countries.length
    
    const names = countries.map(country => { return (
        <div key={country.ccn3}>{country.name.common || country.name.official || 'Missing Country Name'} <button onClick={() => onFilter(country.name.common)}>Show</button></div>
    )})

    if(length === 0) return <div>No countries with that name!</div>
    if(length > 10) return <div>Too many</div>
    else if(length > 1) return <div>{names} <button>Show</button></div>

    const country = countries[0]
    return (
        <Country country={country} />
    )
}

export default Countries