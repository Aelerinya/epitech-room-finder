/*
** EPITECH PROJECT, 2019
** Epitech_room_manager
** File description:
** Express server
*/

const express = require('express')
const roomFinder = require('./roomfinder')
const app = express()

app.get('/', function (req, res) {
  const myDate = new Date().toISOString().slice(0, 10)
  roomFinder(myDate).then(function (rooms) {
    console.log(`A request for the best room has been fulfilled ! ${rooms}`)
    res.json(rooms)
  }).catch(function (err) {
    res.send('An error occured.')
  })
})

app.use(function (req, res) {
  res.statusCode = 404
  res.send('404 Not found')
})

app.listen(3000, function () {
  console.log('Server started on port 3000.')
})
