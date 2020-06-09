import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

const TaskList = (props) => {
  const [newTask, setNewTask] = useState('')
  // eslint-disable-next-line no-unused-vars
  // через пропсы принимаем taskList
  return (
    <div className="bg-teal-800  m-auto  p-10">
      <NavLink
        className="bg-transparent hover:bg-blue-500 text-white font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
        to="/"
      >
        Cancel
      </NavLink>
      {props.taskList.map((el) => (
        <div className="bg-teal-800 text-white capitalize">
          {el.title}
          {el.status === 'new' && (
            <button
              type="button"
              className="bg-transparent hover:bg-blue-500 text-white font-semibold hover:text-white  px-4 border border-blue-500 hover:border-transparent rounded"
              onClick={() => props.updateStatus(el.taskId, 'in progress')}
            >
              in progress
            </button>
          )}
          {el.status === 'in progress' && (
            <div className="inline ml-10">
              <button
                type="button"
                className="bg-transparent hover:bg-blue-500 text-white font-semibold hover:text-white  px-4 border border-blue-500 hover:border-transparent rounded"
              >
                Block
              </button>
              <button
                type="button"
                className="bg-transparent hover:bg-blue-500 text-white font-semibold hover:text-white  px-4 border border-blue-500 hover:border-transparent rounded"
              >
                Done
              </button>
            </div>
          )}
        </div>
      ))}
      <div>
        <input type="text" className="bg-gray-200" onChange={(e) => setNewTask(e.target.value)} />
        <button
          className="bg-transparent hover:bg-blue-500 text-white font-semibold hover:text-white  px-4 border border-blue-500 hover:border-transparent rounded"
          type="button"
          onClick={() => props.addTask(newTask)}
        >
          Add
        </button>
      </div>
    </div>
  )
}

TaskList.propTypes = {}

export default TaskList
