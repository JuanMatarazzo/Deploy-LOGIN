import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {fadeIn} from "../../variants"

function Users({ results }) {
  const filteredUsers = results.filter((user) => !user.admin)
  const formatName = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
  }
  return (
    <main class="p-4 space-y-4  ">
      {filteredUsers?.map((user, i) => (
        <motion.div
          key={user.id}
          className="bg-card text-card-foreground rounded-lg shadow p-4 flex flex-col md:flex-row items-center border border-custom-purple w-2/4 m-auto"
          variants={fadeIn("left", 0.4)}
          initial="hidden"
          whileInView={"show"}
          viewport={{once:false, amount:0.5}}
        >
          <Link to={`/admin/user/detail/${user.id}`}>
            <img
              class="w-24 h-24 rounded-full mr-4"
              src={user.image}
              alt={formatName(user.name)}
            />
          </Link>
          <div key={user.id} class="flex-1">
            <h2 class="text-lg font-semibold">{formatName(user.name)}</h2>
            <p>Gender: {user.gender}</p>
            <p>Email: {user.email}</p>
            <p>Age: {user.age}</p>
          </div>
        </motion.div>
      ))}
    </main>
  )
}

export default Users
