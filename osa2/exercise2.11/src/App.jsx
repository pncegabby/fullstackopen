import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    axios.get('http://localhost:3001/persons')
    .then((response) => {
      setPersons(response.data)
    })
  }, [])

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const onAddPersons = ({name, number}) => {
    //If the name already exists, return false
    if(persons.find(person => {return person.name === name}) !== undefined)
    {
      alert(`${name} is already added to phonebook`)
      setNewName('')
      setNewNumber('')
      return false;
    }

    //If the user did not input a name
    if(name === '' || number === '')
    {
      alert(`Please enter both fields!`)
      return false;
    }

    const personObject = {
      id: String(persons.length + 1),
      name: name,
      number: number
    }
    setPersons(persons.concat(personObject));
    return true;
  }
  
  return (
    <div>
      <h1>Phonebook</h1>

      <Filter value={newFilter} onChange={handleFilterChange} />
      
      <h2>add a new</h2>
        <PersonForm onAddPersons={onAddPersons}/>
      <h2>Numbers</h2>
      <Persons persons={persons} filter={newFilter} />
    </div>
  )
}

export default App