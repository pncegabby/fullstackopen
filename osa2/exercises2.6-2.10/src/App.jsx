import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newFilter, setNewFilter] = useState('')


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