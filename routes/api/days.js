const router = require('express').Router()
const Hotel = require('../../models/hotel');
const Restaurant = require('../../models/restaurant');
const Activity = require('../../models/activity');
const Place = require('../../models/place');
const Day = require('../../models/day');
const Promise = require('sequelize').Promise;

module.exports = router

// Get all Days
router.get('/', function (req, res, next) {
  Day.findAll({
    order: 'number'
  })
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
  var dayId = req.params.id;
  var attractionId = req.body.itemId;
  Promise.all([
    Day.findById(dayId),
    Hotel.findById(attractionId)
  ])
  .spread((day, hotel) => {
    return day.setHotel(hotel);
  })
  .then((day) => {
    return Day.findById(day.id);
  })
  .then((day) => {
    res.send(day);
  })
  .catch(next)
})

router.post('/:id/restaurants', function (req, res, next) {
  var dayId = req.params.id;
  var attractionId = req.body.itemId;
  var savedDay, savedRestaurant;
  Promise.all([
    Day.findById(dayId),
    Restaurant.findById(attractionId)
  ])
  .spread((day, restaurant) => {
    savedDay = day
    savedRestaurant = restaurant;
    return day.getRestaurants();
  })
  .then((restaurants) => {
    if (restaurants.length < 3) {
      return savedDay.addRestaurant(savedRestaurant);
    }
  })
  .then(() => {
    return Day.findById(savedDay.id);
  })
  .then((day) => {
    res.send(day);
  })
  .catch(next)
})

router.post('/:id/activities', function (req, res, next) {
  var dayId = req.params.id;
  var attractionId = req.body.itemId;
  var savedDay, savedActivity;
  Promise.all([
    Day.findById(dayId),
    Activity.findById(attractionId)
  ])
  .spread((day, activity) => {
    savedDay = day
    savedActivity = activity;
    return day.getActivities();
  })
  .then((activities) => {
    if (activities.length < 3) {
      return savedDay.addActivity(savedActivity);
    }
  })
  .then(() => {
    return Day.findById(savedDay.id);
  })
  .then((day) => {
    res.send(day);
  })
  .catch(next)
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

