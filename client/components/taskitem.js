import React, { useState } from 'react'
import './taskItem.scss'

const TaskItem = (props) => {
  const [editMode, setEditMode] = useState(false)
  const [newTask, setNewTask] = useState('')
  return (
    <div className="inline">
      {editMode ? (
        <span>
          <button
            type="button"
            className="bg-blue-700 float-left hover:bg-blue-500 text-white font-semibold p-1   hover:text-white  px-4 border border-none hover:border-transparent"
            onClick={() => props.updateTitle(newTask, props.taskId)}
          >
            Save
          </button>
          <input
            type="text"
            className="text-white bg-blue-600 p-1 rounded  "
            onChange={(e) => setNewTask(e.target.value)}
          />
        </span>
      ) : (
        <span>
          <button
            type="button"
            className="bg-blue-700 hover:bg-blue-500  float-left text-white font-semibold p-1   hover:text-white  px-4 border border-none hover:border-transparent"
            onClick={() => setEditMode(true)}
          >
            Edit
          </button>
          <span className="inline text-center">{props.title}</span>
        </span>
      )}
      {props.status === 'new' ? (
        <button
          type="button"
          className="bg-blue-900 float-right hover:bg-blue-500 text-white font-semibold p-1   hover:text-white  px-4 border border-none hover:border-transparent"
          onClick={() => props.updateStatus('in progress', props.taskId)}
        >
          In progress
        </button>
      ) : (
        ''
      )}
      {props.status === 'in progress' ? (
        <div className="inline">
          <button
            type="button"
            className="bg-blue-800 float-left ml-40 hover:bg-blue-500 text-white font-semibold p-1   hover:text-white  px-4 border border-none hover:border-transparent"
            onClick={() => props.updateStatus('blocked', props.taskId)}
          >
            block
          </button>
          <button
            type="button"
            className="bg-blue-500 float-right mr-40  hover:bg-blue-500 text-white font-semibold p-1   hover:text-white  px-4 border border-none hover:border-transparent"
            onClick={() => props.updateStatus('done', props.taskId)}
          >
            done
          </button>
        </div>
      ) : (
        ''
      )}
      {props.status === 'blocked' ? (
        <button
          type="button"
          className="bg-blue-800  float-left ml-40 hover:bg-blue-500 text-white font-semibold p-1   hover:text-white  px-4 border border-none hover:border-transparent"
          onClick={() => props.updateStatus('new', props.taskId)}
        >
          block
        </button>
      ) : (
        ''
      )}
    </div>
  )
}

TaskItem.propTypes = {}

export default React.memo(TaskItem)
