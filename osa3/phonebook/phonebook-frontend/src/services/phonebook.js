import axios from 'axios'


const baseUrl = 'http://localhost:3001/api/persons'

//Returns the data payload as a promise
const getAll = () => {
    return axios.get(baseUrl).then(response => response.data)
}

//Creates a POST request to the json server that creates a new person and then returns the new data payload as a promise
const create = (newPerson) => {
    const response = axios.post(baseUrl, newPerson)
    return response.then(response => response.data)
}

//Updates a put request and updates a person and returns the updated data of that person as a promise
const update = (id, newPerson) => {
    const response = axios.put(`${baseUrl}/${id}`, newPerson)
    return response.then(response => response.data)
}

const remove = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
}

export default {
    getAll,
    create,
    update,
    remove
}