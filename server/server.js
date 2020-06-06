import express from 'express'
import path from 'path'
import cors from 'cors'
import shortid from 'shortid'
import bodyParser from 'body-parser'
import sockjs from 'sockjs'
import { renderToStaticNodeStream } from 'react-dom/server'
import React from 'react'

import cookieParser from 'cookie-parser'
import config from './config'
import Html from '../client/html'

const Root = () => ''

try {
  // eslint-disable-next-line import/no-unresolved
  // ;(async () => {
  //   const items = await import('../dist/assets/js/root.bundle')
  //   console.log(JSON.stringify(items))

  //   Root = (props) => <items.Root {...props} />
  //   console.log(JSON.stringify(items.Root))
  // })()
  console.log(Root)
} catch (ex) {
  console.log(' run yarn build:prod to enable ssr')
}

let connections = []

const port = process.env.PORT || 8090
const server = express()

const { readdirSync } = require('fs')
const { readFile, writeFile } = require('fs').promises

const write = async (category, tasks) => {
  await writeFile(`${__dirname}/tasks/${category}.json`, JSON.stringify(tasks, 1, 2), {
    encoding: 'utf8'
  })
}

const read = async (category) => {
  return readFile(`${__dirname}/tasks/${category}.json`, { encoding: 'utf8' })
    .then(
      (data) => JSON.parse(data) // вернется текст, а не объект JS
    )
    .catch(() => [])
}

const getTasks = (tasks) => {
  return tasks.reduce((acc, rec) => {
    // eslint-disable-next-line no-underscore-dangle
    if (rec._isDeleted) {
      return acc
    }
    return [...acc, { taskId: rec.taskId, title: rec.title, status: rec.status }]
  }, [])
}

const middleware = [
  cors(),
  express.static(path.resolve(__dirname, '../dist/assets')),
  bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }),
  bodyParser.json({ limit: '50mb', extended: true }),
  cookieParser()
]

middleware.forEach((it) => server.use(it))

server.get('/api/v1/tasks/:category', async (req, res) => {
  const { category } = req.params // получаем название категории которые запросил клиент
  const tasks = getTasks(await read(category))
  res.json(tasks)
})

server.get('/api/v1/categories', async (req, res) => {
  const categoryList = readdirSync(`${__dirname}/tasks`).map((el) => el.split('.json')[0])
  res.json(categoryList)
})

server.get('/api/v1/tasks/:category/:timespan', async (req, res) => {
  const { category, timespan } = req.params // получаем название категории которые запросил клиент
  const tasks = await read(category)
  const periodOfTime = {
    day: 1000 * 60 * 60 * 24,
    week: 7 * 1000 * 60 * 60 * 24,
    month: 30 * 1000 * 60 * 60 * 24
  }
  const filteredTasks = getTasks(
    // eslint-disable-next-line no-underscore-dangle
    tasks.filter((el) => el._createdAt + periodOfTime[timespan] > +new Date())
  )
  res.json(filteredTasks)
})

server.post('/api/v1/tasks/:category', async (req, res) => {
  const { category } = req.params // получаем название категории которые запросил клиент
  const newTask = {
    taskId: shortid.generate(),
    title: req.body.title,
    status: 'new',
    _isDeleted: false,
    _createdAt: +new Date(),
    _deletedAt: null
  }
  const tasks = await read(category)
  const updateTasks = [...tasks, newTask]
  await write(category, updateTasks)
  res.json({ status: 'success' })
})

server.patch('/api/v1/tasks/:category/:id', async (req, res) => {
  const { id, category } = req.params
  const newStatus = req.body
  const statuses = ['new', 'in progress', 'done', 'blocked']
  if (statuses.includes(newStatus.status)) {
    const tasks = await read(category)
    const newTasksList = tasks.map((el) => (el.taskId === id ? { ...el, ...newStatus } : el))
    const updateTask = getTasks(newTasksList.filter((el) => el.taskId === id))
    await write(category, newTasksList)
    res.json(...updateTask)
  } else {
    res.status(501)
    res.json({ status: 'error', message: 'incorrect status' })
  }
})

server.delete('/api/v1/tasks/:category/:id', async (req, res) => {
  const { id, category } = req.params
  const tasks = await read(category)
  const newTasksList = tasks.map((el) => (el.taskId === id ? { ...el, _isDeleted: true } : el))
  await write(category, newTasksList)
  res.json({ status: 'Delete successfully' })
})

server.use('/api/', (req, res) => {
  res.status(404)
  res.end()
})

const [htmlStart, htmlEnd] = Html({
  body: 'separator',
  title: 'yourproject - Become an IT HERO'
}).split('separator')

server.get('/', (req, res) => {
  const appStream = renderToStaticNodeStream(<Root location={req.url} context={{}} />)
  res.write(htmlStart)
  appStream.pipe(res, { end: false })
  appStream.on('end', () => {
    res.write(htmlEnd)
    res.end()
  })
})

server.get('/*', (req, res) => {
  const initialState = {
    location: req.url
  }

  return res.send(
    Html({
      body: '',
      initialState
    })
  )
})

const app = server.listen(port)

if (config.isSocketsEnabled) {
  const echo = sockjs.createServer()
  echo.on('connection', (conn) => {
    connections.push(conn)
    conn.on('data', async () => {})

    conn.on('close', () => {
      connections = connections.filter((c) => c.readyState !== 3)
    })
  })
  echo.installHandlers(app, { prefix: '/ws' })
}
console.log(`Serving at http://localhost:${port}`)
