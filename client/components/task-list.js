import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import HashLoader from 'react-spinners/HashLoader'
import { history } from '../redux'
import TaskItem from './taskitem'
import './task-list.scss'

const TaskList = (props) => {
  const [newTask, setNewTask] = useState('')
  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      history.push(`/${newTask}`)
    }
  }
  if (!props.taskList) {
    return (
      <div className="flex justify-center my-64">
        <HashLoader size={80} color="#123abc" />
      </div>
    )
  }
  // eslint-disable-next-line no-unused-vars
  // через пропсы принимаем taskList
  return (
    <div>
      <div className=" container m-auto bg-teal-800 mt-56 p-8 rounded mb-1">
        <NavLink
          className="bg-transparent hover:bg-blue-500 text-white font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          to="/"
        >
          Cancel
        </NavLink>
        <div className="inline-block  box">
          <input
            type="text"
            className="bg-teal-700 p-1 "
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={handleSearch}
            value={newTask}
            placeholder="Add new task"
          />
          <button
            className="bg-blue-800 hover:bg-blue-500 text-white font-semibold p-1   hover:text-white  px-4 border border-none hover:border-transparent"
            type="button"
            onClick={() => props.addTask(newTask)}
          >
            Add
          </button>
        </div>
      </div>
      <ul className=" fle justify-center h-screen ">
        {props.taskList.map((el) => (
          <li className=" container m-auto bg-indigo-800  hover:bg-purple-700 hover:text-red-500 text-white font-bold rounded-lg border shadow-lg p-10 text-center">
            <TaskItem
              title={el.title}
              taskId={el.taskId}
              status={el.status}
              updateStatus={props.updateStatus}
              updateTitle={props.updateTitle}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

TaskList.propTypes = {}

export default TaskList
