const router = require('express').Router()
const Hotel = require('../../models/hotel');
const Restaurant = require('../../models/restaurant');
const Activity = require('../../models/activity');
const Place = require('../../models/place');

module.exports = router

router.get('/hotels', function (req, res, next) {
  Hotel.findAll()
  .then(function (hotels) {
    res.send(hotels)
  })
  .catch(next)
})

router.get('/restaurants', function (req, res, next) {
  Restaurant.findAll()
  .then(function (restaurant) {
    res.send(restaurant)
  })
  .catch(next)
})

router.get('/activities', function (req, res, next) {
  Activity.findAll()
  .then(function (activities) {
    res.send(activities)
  })
  .catch(next)
})
