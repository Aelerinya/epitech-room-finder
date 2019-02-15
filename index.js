/*
** EPITECH PROJECT, 2019
** Epitech_room_manager
** File description:
** retrieve planning
*/

const _ = require('lodash')
const Promise = require('promise')
const Intranet = require('intra-api')
var Intra = undefined
var config = undefined

function parseRoomCode(code) {
  segments = code.split('/')
  return {
    country: segments[0],
    city: segments[1],
    building: segments[2],
    name: segments[3]
  }
}

function init (token, login, city, rooms) {
  config = {
    token: token,
    login: login,
    city: city,
    rooms: rooms.rooms,
    alias: rooms.alias
  }
  Intra = new Intranet(token, login)
}

function find (date) {
  return new Promise(function (resolve, reject) {
    if (config === undefined) {
      reject("Call .init() first")
    }
    Intra
    .planning
    .get({startDate: date, endDate: date})
    .then((res) => {
      // Initialize rooms array
      var roomsList = {}
      for (room of config.rooms) {
        roomsList[room] = 0
      }
      // Count occupations of each room
      for (activity of res) {
        // Verify if the activy has a room, if it is in the good city
        if (!_.isNull(activity.room) && !_.isUndefined(activity.room.code)) {
          room = parseRoomCode(activity.room.code)
          if (room.city == config.city) {
            roomName = room.name
            // Redirect aliases rooms to full rooms
            if (roomName in config.alias) {
              roomsList[config.alias[roomName]]++
            }
            // Increase usage of room
            if (config.rooms.includes(roomName)) {
              roomsList[roomName]++
            }
          }
        }
      }
      // Retrieve all roomsList not used
      availableRooms = []
      for (name in roomsList) {
        if (roomsList[name] === 0)
        availableRooms.push(name)
      }
      // Return the room list
      console.log(roomsList);
      resolve(availableRooms)
    })
    .catch((err) => {
      console.error(err);
      reject(err)
    })
  })
}

module.exports = {find: find, init: init}
