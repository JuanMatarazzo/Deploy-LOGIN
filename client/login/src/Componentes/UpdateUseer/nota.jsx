import React, {useState,useEffect} from 'react'
import { UpdateUser } from '../../redux/actions'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { LimpError } from '../../redux/actions'
import { useParams } from 'react-router-dom';

function UpdateUseer({ setShowUpdate, showUpdate }) {
  const dispatch = useDispatch()
  const userId = useSelector((state) => state.UserId)
  const error = useSelector((state) => state.error)
  const navigate = useNavigate()
  const { id } = useParams();


  const [formState, setFormState] = useState({
    name:  userId.name || '',
    email: userId.email || '',
    gender: userId.gender || '',
    password: '',
    image:  userId.image ||'',
    age: userId.age || '',
  })
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }
  useEffect(() => {
    notify()
  }, [error])

  const notify = () => {
    if (error[0] === 'Actualizado') {
      toast.success(`Tu usuario fue actualizado con Exito!`, {
        position: 'bottom-right',
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      })
      dispatch(LimpError())
      navigate('/admin')
    }
    if (error[0] === 'Error') {
      toast.error('Nombre o contraseña Invalida!!', {
        position: 'bottom-right',
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: 'light',
      })
      dispatch(LimpError())
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(UpdateUser(id, formState))
  }

  return (
    <div className="fixed inset-0  bg-zinc-600  bg-opacity-50 flex justify-center items-center p-4 ">
    <div className="bg-black w-full max-w-lg p-6 rounded-lg shadow-lg border-2 border-custom-purple">
      <h2 className="text-card-foreground text-2xl font-bold mb-4 text-center text-custom-purple">
        Update User
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-card-foreground">Name</label>
          <input
            type="text"
            name="name"
            className="text-black w-full px-3 py-2 border border-border rounded-md text-input bg-input"
            placeholder="Your name"
            value={formState.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label for="email" className="block text-card-foreground">
            Email
          </label>
          <input
            type="email"
            name="email"
            className="text-black  w-full px-3 py-2 border border-border rounded-md text-input bg-input"
            placeholder="example@example.com"
            value={formState.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label for="gender" className="block text-card-foreground">
            Gender
          </label>
          <select
            name="gender"
            value={formState.gender}
            onChange={handleChange}
            className="text-black  w-full px-3 py-2 border border-border rounded-md text-input bg-input"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div>
          <label for="password" className="block text-card-foreground">
            Password
          </label>
          <input
            type="password"
            name="password"
            className="text-black  w-full px-3 py-2 border border-border rounded-md text-input bg-input"
            placeholder="********"
            value={formState.password}
            onChange={handleChange}
          />
        </div>
        <div>
          <label for="image" className="block text-card-foreground">
            Image URL
          </label>
          <input
            type="url"
            name="image"
            className="text-black  w-full px-3 py-2 border border-border rounded-md text-input bg-input"
            placeholder="https://example.com/image.jpg"
            value={formState.image}
            onChange={handleChange}
          />
        </div>
        <div>
          <label for="age" className="block text-card-foreground">
            Age
          </label>
          <input
            type="number"
            name="age"
            className="text-black  w-full px-3 py-2 border border-border rounded-md text-input bg-input"
            placeholder="30"
            value={formState.age}
            onChange={handleChange}
          />
        </div>
        <div className="flex justify-end space-x-4">
          <button
            onClick={() => setShowUpdate(!showUpdate)}
            type="button"
            className="bg-slate-500 px-4 py-2 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80"
          >
            Cancel
          </button>
          <button
            onClick={notify}
            type="submit"
            className="bg-custom-purple px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/80"
          >
            Confirm
          </button>
        </div>
      </form>
    </div>
  </div>
  )
}

export default UpdateUseer
