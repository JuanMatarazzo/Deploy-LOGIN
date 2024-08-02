import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Users from '../Users/Users'
import { motion } from 'framer-motion'
import { fadeIn } from '../../variants'

function Buscador() {
  const [search, setSearch] = useState('')
  const users = useSelector((state) => state.Users)

  const searcher = (e) => {
    setSearch(e.target.value)
  }
  let results = []
  if (!search) {
    results = users
  } else {
    results = users.filter((data) =>
      data.name.toLowerCase().includes(search.toLocaleLowerCase()),
    )
  }
  return (
    <>
      <div className="flex justify-center items-center p-4">
        <div className="relative w-full max-w-xl">
          <input
            type="text"
            className="text-black w-full pl-10 pr-4 py-2 rounded-lg border-2 border-input bg-background text-foreground placeholder-muted focus:border-primary focus:ring focus:ring-primary/50"
            placeholder="Buscar..."
            value={search}
            onChange={searcher}
          />
          <div className="absolute top-0 left-0 inline-flex items-center justify-center h-full w-10 text-zinc-400">
            <img
              aria-hidden="true"
              alt="icono de lupa"
              src="https://openui.fly.dev/openui/20x20.svg?text=🔍"
            />
          </div>
        </div>
      </div>
      <div
   
      >
        <Users results={results} />
      </div>
    </>
  )
}

export default Buscador
