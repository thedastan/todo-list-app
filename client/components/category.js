import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

const Category = (props) => {
  const [newCategory, setNewCategory] = useState('')
  return (
    <div>
      <div className="container m-auto mt-56 rounded bg-teal-700 flex justify-center p-8 mb-1">
        <input
          type="text"
          placeholder="Add new category"
          onChange={(e) => setNewCategory(e.target.value)}
          className="p-1 bg-teal-600 "
        />
        <button
          className="bg-transparent hover:bg-blue-500 text-white font-semibold hover:text-white  px-4 border border-blue-500 hover:border-transparent rounded"
          type="button"
          onClick={() => props.addCategory(newCategory)}
        >
          Add
        </button>
      </div>
      {props.categoryList.map((el) => (
        <div className="container  flex justify-center  m-auto bg-indigo-800 mb-1 hover:bg-blue-700 hover:text-red-500 text-white font-bold rounded-lg border shadow-lg p-4  text-center">
          <NavLink className="text-white capitalize text-xl  " to={`/${el}`}>
            {el}
          </NavLink>
        </div>
      ))}
    </div>
  )
}
Category.propTypes = {}

export default Category
