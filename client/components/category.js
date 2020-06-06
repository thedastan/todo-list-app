import React from 'react'
import { NavLink } from 'react-router-dom'

const Category = (props) => {
  // через пропсы принимаем categoryList
  return (
    <div className="bg-teal-700 flex justify-center p-10">
      {props.categoryList.map((el) => (
        <div>
          <NavLink className="text-white capitalize ml-10 " to={`/${el}`}>
            {el}
          </NavLink>
        </div>
      ))}
    </div>
  )
}

export default Category
