import './UserItem.css'

const UserItem = ({user}) => {
    if (!user) return null;
    return (
        <div key={user.id} className='user-item'>
            {(user.profilePicture) ?
             <img className='user-item-img' src={user.profilePicture} alt={user.username}/> :
             ((user.color) ?
             <div style={{backgroundColor: user.color}} className='user-item-img-placeholder'>{`${user.username.toUpperCase().charAt(0)}`}</div> :
             <div className='user-item-img-placeholder'>{`${user.username.toUpperCase().charAt(0)}`}</div>)
             }
            <div className='user-item-text'>
                {user.username}
            </div>
        </div>
    )
}

export default UserItem
