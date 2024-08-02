import React from 'react'

function asdass() {
  return (
     <div>
       <button onClick={() => setShowUpdate(!showUpdate)}>
        {showUpdate ? 'Cerrar' : 'Actualizar User'}
      </button>
      {showUpdate && <UpdaUser />}
      <button onClick={deleteUser}>Delete User</button>
      <button onClick={Logout}>LOGOUT</button>
      <h2>{formatName(user.name)}</h2>
      <p>Email: {user.email}</p>
      <p>Gender: {user.gender}</p>
      <p>Age: {user.age}</p>
      <img src={user.image} alt={formatName(user.name)} width="200" />
    </div>
  )
}

export default asdass