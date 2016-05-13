var Sequelize = require('sequelize');
var db = require('./_db');
var Place = require('./Place')

var Activity = db.define('activity', {
  name: Sequelize.STRING,
  age_range: Sequelize.STRING
}, {
  defaultScope: {
    include: [Place]
  },
  classMethods: {
  	findById: function(id) {
  		return this.findOne({
  			where: {
  				id: id
  			}
  		})
  	}
  }
});

module.exports = Activity
