const router = require('express').Router()
const Hotel = require('../../models/hotel');
const Restaurant = require('../../models/restaurant');
const Activity = require('../../models/activity');
const Place = require('../../models/place');
const Day = require('../../models/day');

module.exports = router

// Get all Days
router.get('/', function (req, res, next) {
  Day.findAll()
  .then(function (days) {
    res.send(days)
  })
  .catch(next)
})

// CRUD operations for Day
router.post('/', function (req, res, next) {
  Day.findAll()
  .then(function (days) {
    var day = Day.build({ number: days.length + 1})

    return day.save()
  })
  .then(function (savedDay) {
    res.send(savedDay)
  })
  .catch(next)
})

router.get('/:id', function (req, res, next) {

})

router.put('/:id', function (req, res, next) {

})

router.delete('/:id', function (req, res, next) {

})

// Creating Attractions for Day
router.post('/:id/hotel', function (req, res, next) {

})

router.post('/:id/restaurants', function (req, res, next) {

})

router.post('/:id/activities', function (req, res, next) {

})

// Updating Attractions for Day
router.put('/:id/hotel', function (req, res, next) {

})

router.put('/:id/restaurants', function (req, res, next) {

})

router.put('/:id/activities', function (req, res, next) {

})

// Deleting Attractions for Day
router.delete('/:id/hotel', function (req, res, next) {

})

router.delete('/:id/restaurants', function (req, res, next) {

})

router.delete('/:id/activities', function (req, res, next) {

})

