import { useState } from "react"

const PersonForm = ({onAddPerson}) => {
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const addName = (event) => {
        event.preventDefault()

        const trimmedName = newName.trim();
        const trimmedNumber = newNumber.trim();

        if(onAddPerson({name: trimmedName, number: trimmedNumber}))
        {
            setNewName('')
            setNewNumber('')
        }
        
    }

    return (
        <form
            onSubmit={addName}
        >
            <div>
                name: <input value={newName} onChange={handleNameChange} />
            <br />
                number: <input value={newNumber} onChange={handleNumberChange} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm