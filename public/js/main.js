$(function () {

    var map = initializeMap();
    var $addItemButton = $('#options-panel').find('button');

    var $listGroups = {
        hotel: $('#hotel-list').children('ul'),
        restaurant: $('#restaurant-list').children('ul'),
        activity: $('#activity-list').children('ul')
    };

    // var collections = {
    //     hotel: hotels,
    //     restaurant: restaurants,
    //     activity: activities
    // };

    var $itinerary = $('#itinerary');

    var $addDayButton = $('#day-add');
    var $dayTitle = $('#day-title').children('span');
    var $removeDayButton = $('#day-title').children('button');
    var $dayButtonList = $('.day-buttons');

    var currentDay;
    var currentDayNum = 1;

    /*
    --------------------------
    END VARIABLE DECLARATIONS
    --------------------------
     */

    $addItemButton.on('click', function () {

        var $this = $(this);
        var $select = $this.siblings('select');
        var sectionName = $select.attr('data-type');
        var $list = $listGroups[sectionName];
        if (sectionName === 'restaurant')
            sectionName = 'restaurants'
        if (sectionName === 'activity')
            sectionName = 'activities'
        var itemId = parseInt($select.val(), 10);
        // var collection = collections[sectionName];
        // var item = findInCollection(collection, itemId);

        // var marker = drawMarker(map, sectionName, item.place.location);

        getDays()
        .then((days) => {
            // addAttraction(currentDay, sectionName);
            return addAttraction(days[0], sectionName, itemId);
        })
        .then((day) => {
            return getAttraction(sectionName, itemId)
            // console.log(day)
        })
        .then((item) => {
            $list.append(create$item(item));
        })
        .fail(console.error)
        // days[currentDayNum - 1].push({
        //     item: item,
        //     marker: marker,
        //     type: sectionName
        // });

        // INCOMPLETE
        // days (object) with key as days.id
        //     attractions (object) with key as attractions.name
        //         marker

        // mapFit();

    });

    function addAttraction(currentDay, attraction, itemId) {
        return $.post('/api/days/' + currentDay.id + '/' + attraction, {itemId: itemId}, function (day) {
          return day
        })
        .fail(console.error.bind(console))
    }

    function getAttraction(attraction, itemId) {
        if (attraction === 'hotel')
            attraction = 'hotels'
        return $.get('/api/' + attraction + '/' + itemId, function (attraction) {
          return attraction
        })
        .fail(console.error.bind(console))
    }

    $itinerary.on('click', 'button.remove', function () {

        var $this = $(this);
        var $item = $this.parent();
        var itemName = $item.children('span').text();
        var day = days[currentDayNum - 1];
        var indexOfItemOnDay = findIndexOnDay(day, itemName);
        var itemOnDay = day.splice(indexOfItemOnDay, 1)[0];

        itemOnDay.marker.setMap(null);
        $item.remove();

        mapFit();

    });

    $addDayButton.on('click', function () {
        addDay()
        .then((newDay) => {
            var newDayNum = newDay.number;
            var $newDayButton = createDayButton(newDayNum);
            $addDayButton.before($newDayButton);
            // switchDay(newDayNum);
        })
    });

    $dayButtonList.on('click', '.day-btn', function () {
        var dayNumberFromButton = parseInt($(this).text(), 10);
        switchDay(dayNumberFromButton);
    });

    $removeDayButton.on('click', function () {

        wipeDay();
        days.splice(currentDayNum - 1, 1);

        if (days.length === 0) {
            days.push([]);
        }

        reRenderDayButtons();
        switchDay(1);

    });

    // fillInOptions(hotels, $('#hotel-choices'));
    // fillInOptions(restaurants, $('#restaurant-choices'));
    // fillInOptions(activities, $('#activity-choices'));

    
    createDayButtons()

    /*
    --------------------------
    END NORMAL LOGIC
    --------------------------
     */

    // Create element functions ----

    function create$item(item) {

        var $div = $('<div />');
        var $span = $('<span />').text(item.name);
        var $removeButton = $('<button class="btn btn-xs btn-danger remove btn-circle">x</button>');

        $div.append($span).append($removeButton);

        return $div;

    }

    function createDayButtons () {
      getDays()
      .then((days) => {
          days.forEach((day) => {
            var $newDayButton = createDayButton(day.number)
            $addDayButton.before($newDayButton)
          })
      })
      // switchDay(1)
    }

    function createDayButton(number) {
        return $('<button class="btn btn-circle day-btn">' + number + '</button>');
    }

    // End create element functions ----

    // function fillInOptions(collection, $selectElement) {
    //     collection.forEach(function (item) {
    //         $selectElement.append('<option value="' + item.id + '">' + item.name + '</option>');
    //     });
    // }

    function switchDay(dayNum) {
        wipeDay();
        currentDayNum = dayNum;
        renderDay();
        $dayTitle.text('Day ' + dayNum);
        // mapFit();
    }

    function renderDay() {

        var currentDay = days[currentDayNum - 1];

        $dayButtonList
            .children('button')
            .eq(currentDayNum - 1)
            .addClass('current-day');

        currentDay.forEach(function (attraction) {
            var $listToAddTo = $listGroups[attraction.type];
            $listToAddTo.append(create$item(attraction.item));
            attraction.marker.setMap(map);
        });

    }

    function wipeDay() {

        $dayButtonList.children('button').removeClass('current-day');

        Object.keys($listGroups).forEach(function (key) {
           $listGroups[key].empty();
        });

        if (days[currentDayNum - 1]) {
            for (var key in days[currentDayNum - 1]) {
                days[currentDayNum - 1][key].marker.setMap(null);
            };
        }

    }

    function reRenderDayButtons() {

        var numberOfDays = days.length;

        $dayButtonList.children('button').not($addDayButton).remove();

        for (var i = 0; i < numberOfDays; i++) {
            $addDayButton.before(createDayButton(i + 1));
        }

    }

    function mapFit() {

        var currentDay = days[currentDayNum - 1];
        var bounds = new google.maps.LatLngBounds();

        currentDay.forEach(function (attraction) {
            bounds.extend(attraction.marker.position);
        });

        map.fitBounds(bounds);

    }

    // Utility functions ------

    function findInCollection(collection, id) {
        return collection.filter(function (item) {
            return item.id === id;
        })[0];
    }

    function findIndexOnDay(day, itemName) {
        for (var i = 0; i < day.length; i++) {
            if (day[i].item.name === itemName) {
                return i;
            }
        }
        return -1;
    }

    // End utility functions ----

    // AJAX call functions -----

    function getDays () {
      return $.get('/api/days', function (days) {
        return days
      })
      .fail(console.error.bind(console))
    }

    function addDay () {
      return $.post('/api/days', function (newDay) {
        return newDay
      })
      .fail(console.error.bind(console))
    }

    // End AJAX call functions ------

});
