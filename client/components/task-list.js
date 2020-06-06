import React from 'react'
import { NavLink } from 'react-router-dom'

const TaskList = (props) => {
  // через пропсы принимаем taskList
  return (
    <div className="bg-teal-800 flex justify-around p-10">
      <NavLink
        className="bg-transparent hover:bg-blue-500 text-white font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
        to="/"
      >
        Cancel
      </NavLink>
      {props.taskList.map((el) => (
        <div className="bg-teal-800 text-white capitalize">{el.title}</div>
      ))}
    </div>
  )
}

export default TaskList
