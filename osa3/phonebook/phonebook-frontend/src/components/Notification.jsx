const Notification = ({notification}) => {

    const {message, type} = notification;
    if(message === null)
    {
        return null
    }

    if(type !== 'success' && type !== 'error')
    {
        alert('Something isnt right in the notification component');
        return null;
    }

    return (
        <div className={type}>
            {message}
        </div>
    )
}

export default Notification