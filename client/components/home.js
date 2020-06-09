import React, { useEffect, useState } from 'react'
import { Route, useParams } from 'react-router-dom'
import axios from 'axios'
import Category from './category'
import TaskList from './task-list'

const Home = () => {
  const [categoryList, setCategoryList] = useState([])
  const [taskList, setTaskList] = useState([])
  const { category } = useParams()

  const addCategory = (newCategory) => {
    axios.post(`/api/v1/tasks/${newCategory}`)
    setCategoryList([...categoryList, newCategory])
  }

  const updateStatus = (id, newStatus) => {
    axios.patch(`/api/v1/tasks/${category}/${id}`, { status: newStatus })
    const updateTaskList = taskList.map((el) =>
      el.taskId === id ? { ...el, status: newStatus } : el
    )
    setTaskList(updateTaskList)
  }

  const addTask = (newTask) => {
    axios
      .post(`/api/v1/tasks/${category}`, { title: newTask })
      .then(({ data }) => setTaskList([...taskList, data.newTask]))
  }

  useEffect(() => {
    axios('/api/v1/categories').then(({ data }) => setCategoryList(data))
  }, [])

  useEffect(() => {
    axios(`/api/v1/tasks/${category}`).then(({ data }) => setTaskList(data))
  }, [category])
  return (
    <div>
      <Route
        exact
        path="/"
        component={() => <Category categoryList={categoryList} addCategory={addCategory} />}
      />
      <Route
        exact
        path="/:category"
        component={() => (
          <TaskList taskList={taskList} addTask={addTask} updateStatus={updateStatus} />
        )}
      />
    </div>
  )
}

Home.propTypes = {}

export default Home
