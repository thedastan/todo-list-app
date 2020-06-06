import React, { useEffect, useState } from 'react'
import { Route, useParams } from 'react-router-dom'
import axios from 'axios'
import Category from './category'
import TaskList from './task-list'

const Home = () => {
  const [categoryList, setCategoryList] = useState([])
  const [taskList, setTaskList] = useState([])
  const { category } = useParams()

  useEffect(() => {
    axios('/api/v1/categories').then(({ data }) => setCategoryList(data))
  }, [])

  useEffect(() => {
    axios(`/api/v1/tasks/${category}`).then(({ data }) => setTaskList(data))
  }, [category])
  return (
    <div>
      <Route exact path="/" component={() => <Category categoryList={categoryList} />} />
      <Route exact path="/:category" component={() => <TaskList taskList={taskList} />} />
    </div>
  )
}

Home.propTypes = {}

export default Home
