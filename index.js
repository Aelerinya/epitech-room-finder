/*
** EPITECH PROJECT, 2019
** Epitech_room_manager
** File description:
** retrieve planning
*/

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

module.exports.init = function (token, login, city, rooms) {
  config = {
    token: token,
    login: login,
    city: city,
    rooms: rooms.rooms,
    alias: rooms.alias
  }
  Intra = new Intranet(token, login)
}

module.exports.find = async function (date) {
  if (config === undefined) {
    throw new Error("Call .init() first")
  }
  try {
    var events = await Intra.planning.get({startDate: date, endDate: date})
  } catch (err) {
    console.log('Could not retrieve planning')
    console.log(err)
    throw new Error(err)
  }
  // Initialize rooms array
  var roomsList = {}
  for (room of config.rooms) {
    roomsList[room] = 0
  }
  // Count occupations of each room
  for (activity of events) {
    // Verify if the activy has a room, if it is in the good city
    if (activity.room !== null && activity.room.code != undefined) {
      room = parseRoomCode(activity.room.code)
      if (room.city == config.city) {
        roomName = room.name
        // Redirect aliases rooms to full rooms
        if (roomName in config.alias) {
          alias = config.alias[roomName]
          if (alias.constructor === Array) {
            for (r of alias) {
              roomsList[r]++
            }
          } else {
          roomsList[alias]++
          }
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
  return availableRooms
}
