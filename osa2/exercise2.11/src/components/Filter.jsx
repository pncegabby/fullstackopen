const handleFilterChange = event => setNewFilter(event.target.value)

const Filter = ({value, onChange}) => {

    return (
        <div>
            filter shown with <input value={value} onChange={onChange} />
        </div>
    )
}

export default Filter