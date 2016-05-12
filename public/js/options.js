$(function () {
    // AJAX Requests -------

    function getAttractionAndFillInOptions (attraction, $selectElement) {
      $.get('/api/' + attraction, function (attractionData) {
        fillInOptions(attractionData, $selectElement)
      })
      .fail(function (err) {
        console.error(err)
      })
    }

    // End AJAX Requests ---------

    getAttractionAndFillInOptions('hotels', $('#hotel-choices'))
    getAttractionAndFillInOptions('restaurants', $('#restaurant-choices'))
    getAttractionAndFillInOptions('activities', $('#activity-choices'))

    // Utility Functions ----------

    function fillInOptions(collection, $selectElement) {
      collection.forEach(function (item) {
          $selectElement.append('<option value="' + item.id + '">' + item.name + '</option>');
      });
    }

})
