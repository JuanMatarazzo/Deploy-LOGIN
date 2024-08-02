import React, { useState } from 'react'
import { GetFilterByName, GetFilterByGender } from '../../redux/actions'
import { useSelector, useDispatch } from 'react-redux'

const Filter = () => {
  const [showFilters, setShowFilters] = useState(false)
  const dispatch = useDispatch()

  const toggleFilters = () => {
    setShowFilters(!showFilters)
  }

  const handleSortChange = (event) => {
    dispatch(GetFilterByName(event.target.value))
  }

  const handleGenderChange = (event) => {
    dispatch(GetFilterByGender(event.target.value))
  }

 

  return (
    <div className="p-4">
      <button
        onClick={toggleFilters}
        className="bg-custom-purple bg-primary text-primary-foreground rounded-md p-2 hover:bg-primary/80"
      >
        {showFilters ? 'Hide Filters' : 'Show Filters'}
      </button>
      {showFilters && (
        <div className="bg-card text-card-foreground mt-4 p-4">
          <div className="flex justify-evenly ">
            <div>
              <label
                htmlFor="sortName"
                className="text-custom-purple block mb-2 text-sm font-medium"
              >
                Sort by Name:
              </label>
              <select
                id="sortName"
                onChange={handleSortChange}
                className="text-black bg-input text-foreground border border-border rounded-md p-2 focus:ring focus:ring-ring"
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>
           
            <div>
              <label
                htmlFor="filterGender"
                className="text-custom-purple block mb-2 text-sm font-medium"
              >
                Filter by Gender:
              </label>
              <select
                id="filterGender"
                onChange={handleGenderChange}
                className="text-black bg-input text-foreground border border-border rounded-md p-2 focus:ring focus:ring-ring"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Filter
