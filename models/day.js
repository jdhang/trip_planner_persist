var Sequelize = require('sequelize');
var db = require('./_db');
var Place = require('./place')
var Hotel = require('./hotel')
var Restaurant = require('./restaurant')
var Activity = require('./activity')

var Day = db.define('day', {
  number: {
    type: Sequelize.INTEGER
  }
}, {
  defaultScope: {
    include: [Hotel, Restaurant, Activity]
  },
  classMethods: {
  	findById: function(id) {
  		return this.findOne({
  			where: {
  				id: id
  			}
  		})
  	}
  },
  hooks: {
  	// day is not actually being updated, just the join table
  	// handle errors in our routers
  	// beforeUpdate: function(day, options) {
  	// 	if (day.restaurants.length > 3)
  	// 		throw new ValidationError("# of Restaurants cannot exceed 3")
  	// }
  }
})

module.exports = Day
