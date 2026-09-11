const Persons = ({persons, filter, onDelete}) => {
    const personsArray = persons.filter((person) => {
        const lowercaseName = person.name.toLowerCase()

        return lowercaseName.includes(filter.toLowerCase())
    })

    const personsView = personsArray.map((person) => {
        return (
            <div key={person.id}>
                <span>{person.name} {person.number}  </span>
                <button onClick={() => onDelete(person.id)}>delete</button>
            </div>
        )
    })

    return (
        <div>
            {personsView}
        </div>
    )
}

export default Persons