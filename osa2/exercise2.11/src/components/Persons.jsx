const Persons = ({persons, filter}) => {
    const personsArray = persons.filter((person) => {
        const lowercaseName = person.name.toLowerCase()

        return lowercaseName.includes(filter.toLowerCase())
    })

    const personsView = personsArray.map((person) => {
        return <p key={person.id}>{person.name} {person.number}</p>
    })

    return (
        <div>
            {personsView}
        </div>
    )
}

export default Persons