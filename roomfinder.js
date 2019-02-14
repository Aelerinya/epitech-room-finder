/*
** EPITECH PROJECT, 2019
** Epitech_room_manager
** File description:
** retrieve planning
*/

const _ = require('lodash')
const Promise = require('promise')
const Intranet = require('intra-api')
const Intra = new Intranet('auth-c30d0b55a4cc2137dd74941ed92701f5eaffd87b', 'julien.philippon@epitech.eu');

function parseRoomCode(code) {
  segments = code.split('/')
  return {
    country: segments[0],
    city: segments[1],
    building: segments[2],
    room: segments[3]
  }
}


function roomFinder (date) {
  return new Promise(function (resolve, reject) {
    Intra
    .planning
    .get({startDate: date, endDate: date})
    .then((res) => {
      // Initialize rooms array
      var roomsList = {
        "101-George-Boole": 0,
        "101a-George": "101-George-Boole",
        "101b-Boole": "101-George-Boole",
        "102-Ada-Lovelace": 0,
        "102a-Ada": "102-Ada-Lovelace",
        "102b-Lovelace": "102-Ada-Lovelace",
        "103-Hollerith": 0,
        "104-Rosen-Bull": 0,
        "105-Heafield": 0,
        "106-Kleinrock": 0,
        "107-Tomlinson": 0
      }
      // Count occupations of each room
      for (activity of res) {
        // Verify if the activy has a room, if it is in the good building
        if (!_.isNull(activity.room) && !_.isUndefined(activity.room.code)) {
          room = parseRoomCode(activity.room.code)
          if (room.country == 'FR' && room.city == 'LYN' && room.building == 'Campus-Lyon-Jean-Mace') {
            // Redirect partial rooms to full rooms
            roomName = room.room
            if (roomName in roomsList && _.isString(roomsList[roomName])) {
              roomName = roomsList[roomName]
            }
            // Increase usage of room
            if (roomName in roomsList) {
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
      resolve(availableRooms)
    })
    .catch((err) => {
      console.error(err);
      reject(err)
    })
  })
}

module.exports = roomFinder
