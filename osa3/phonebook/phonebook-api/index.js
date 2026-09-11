const express = require('express')
const morgan = require('morgan')
const app = express()

app.use(express.json())
app.use(express.static('dist'))

morgan.token('body', (request) => {
	return request.method === 'POST' || request.method === 'PUT' ? JSON.stringify(request.body) : ''
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))


let phonebook = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
    response.json(phonebook)
})

app.get('/info', (request, response) => {
    const length = phonebook.length
    const date = new Date()
    response.send(`
        <p>Phonebook has info for ${length} people</p>
        <p>${date}</p>       
    `)
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = phonebook.find(person => person.id === id)

    if(person)
    {
        response.send(person)
    }
    else
    {
        response.status(404).end()
    }
})

//Updating a person's number
app.put('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const body = request.body

    if(!body.number)
    {
        return response.status(400).json({
            error: "number is missing"
        })
    }
    
    const person = phonebook.find(person => person.id === id)

    if(!person)
    {
        response.status(404).json({
            error: "person not found"
        })
    }

    const updatedPerson = {
        ...person,
        name: person.name,
        number: body.number
    }

    phonebook = phonebook.map(person => person.id === id ? updatedPerson : person)

    response.json(updatedPerson)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    phonebook = phonebook.filter(person => person.id !== id)

    response.status(204).end()
})

app.post('/api/persons/', (request, response) => {
    const body = request.body
    if(!body.name)
    {
		return response.status(400).json({
			error: "name missing"
		})
    }

	if(!body.number)
    {
		return response.status(400).json({
			error: "number missing"
		})
    }

	const sameName = phonebook.find(person => {
		return body.name === person.name
	})

	if(sameName)
	{
		return response.status(400).json({
			error: "name must be unique"
		})
	}

	const person = {
		name: body.name,
		number: body.number,
		id: generateId()
	};

	phonebook = phonebook.concat(person)
	response.json(person)
})

const generateId = () => {
	const id = Math.floor(Math.random() * 100000)
	
	return String(id)
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})