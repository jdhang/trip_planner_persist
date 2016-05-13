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

router.get('/hotels/:id', function (req, res, next) {
  var hotelId = req.params.id;
  Hotel.findById(hotelId)
  .then(function (hotel) {
    res.send(hotel)
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

router.get('/restaurants/:id', function (req, res, next) {
  var restaurantId = req.params.id;
  Restaurant.findById(restaurantId)
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

router.get('/activities/:id', function (req, res, next) {
  var activityId = req.params.id;
  Activity.findById(activityId)
  .then(function (activity) {
    res.send(activity)
  })
  .catch(next)
})