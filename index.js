/*
** EPITECH PROJECT, 2019
** Epitech_room_manager
** File description:
** Express server
*/

const express = require('express')
const app = express()

app.use(function (req, res) {
  res.statusCode = 404
  res.send('404 Not found')
})

app.listen(3000, function () {
  console.log('Server started on port 3000.')
})
