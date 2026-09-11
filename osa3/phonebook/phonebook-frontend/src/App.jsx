import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import phonebookService from './services/phonebook'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newFilter, setNewFilter] = useState('')
  const [notification, setNotification] = useState({
    message: null,
    type: 'success'
  })

  useEffect(() => {
    phonebookService.getAll()
    .then((initialPersons) => {
      setPersons(initialPersons)
    })
  }, [])

  const startNotification = (message, type) => {
    const newNotif = {message, type}
    setNotification(newNotif);

    setTimeout(() => {
      setNotification({message: null, type:'success'});
    }, 5000)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const onAddPerson = ({name, number}) => {

    
    const existingPerson = persons.find(person => person.name === name)
    //If the name already exists, prompt the user if he would like to update it
    if(existingPerson !== undefined)
    {
      if(!window.confirm(`${name} is already added to phonebook, replace the old number with a new one?`))
      {
        return false;
      }

      const updatedPerson = {...existingPerson, number: number}

      phonebookService.update(existingPerson.id, updatedPerson)
      .then(payload => {
        setPersons(persons.map(person => {return person.id === existingPerson.id ? payload : person}
        ))
      })
      .catch(error => {
        console.error(`Failed to update:`, error);
      })

      startNotification(`${name}'s number has been replaced to ${number}`, 'success');
      return true;
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

    phonebookService.create(personObject)
    .then((newPerson) => {
      setPersons(persons.concat(newPerson))
    })
    startNotification(`${name} has been added to the phonebook!`, 'success');
    return true;
  }

  const handleDelete = (id) => {
    const person = persons.find(person => person.id === id)
    if(!window.confirm(`Delete ${person.name}?`))
    {
      return;
    }
    
    phonebookService.remove(id)
    .then(() => {
      setPersons(persons.filter((person) => person.id !== id))
    })
    .catch(error => {
      console.error(`Failed to delete: `, error);
      setPersons(persons.filter(person => person.id !== id))
      startNotification(`Information of ${person.name} has already been removed from the server`, 'error')
    })
  }
  
  return (
    <div>
      <h1>Phonebook</h1>
      <Notification notification={notification}/>
      <Filter value={newFilter} onChange={handleFilterChange} />
      
      <h2>add a new</h2>
        <PersonForm onAddPerson={onAddPerson}/>
      <h2>Numbers</h2>
      <Persons persons={persons} filter={newFilter} onDelete={handleDelete} />
    </div>
  )
}

export default App