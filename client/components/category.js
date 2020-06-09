import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

const Category = (props) => {
  const [newCategory, setNewCategory] = useState('')

  return (
    <div className="bg-teal-700 flex justify-center p-10">
      {props.categoryList.map((el) => (
        <div>
          <NavLink className="text-white capitalize ml-10  mr-10" to={`/${el}`}>
            {el}
          </NavLink>
        </div>
      ))}
      <input type="text" onChange={(e) => setNewCategory(e.target.value)} />
      <button
        className="bg-transparent hover:bg-blue-500 text-white font-semibold hover:text-white  px-4 border border-blue-500 hover:border-transparent rounded"
        type="button"
        onClick={() => props.addCategory(newCategory)}
      >
        Add
      </button>
    </div>
  )
}

export default Category
