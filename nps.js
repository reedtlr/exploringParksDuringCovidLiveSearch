// Set Variables

var distance;
var searchResults = [];


function calculateDistance(lat1, lng1, lat2, lng2) {
    var lat1Rad = lat1/57.29577951;
    var lng1Rad = lng1/57.29577951;

    var lat2Rad = lat2/57.29577951;
    var lng2Rad = lng2/57.29577951;

    var distance = 3963 * Math.acos((Math.sin(lat1Rad) * Math.sin(lat2Rad)) + Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.cos(lng2Rad - lng1Rad));

    distance = distance.toFixed(2);
    
    return distance;
    
}

function sort(a, b) {
    var distancea = parseFloat(a.distance);
    var distanceb = parseFloat(b.distance);

    var sort = 0;
    if (distancea > distanceb) {
        sort = 1;
    } else if (distancea < distanceb) {
        sort = -1;
    }

    return sort;
}

function npsResults(queryURL) {
    $.ajax({
        url: queryURL,
        method: "GET"
    })

        .then(function run(results) {
            // console.log("URL", queryURL);
            console.log("Dropdown selection results", results);

            for (var i = 0; i < results.data.length; i++){
                var lat1 = parseFloat(results.data[i].latitude);
                var lng1 = parseFloat(results.data[i].longitude);
    
                var lat2 = parseFloat(mapCenter.lat);
                var lng2 = parseFloat(mapCenter.lng);
    
                distance = calculateDistance(lat1, lng1, lat2, lng2);

                searchResults[i] = {
                    name: results.data[i].fullName,
                    latLng: results.data[i].latLong,
                    lat: parseFloat(results.data[i].latitude),
                    lng: parseFloat(results.data[i].longitude),
                    distance: distance
                }
            }

            searchResults = searchResults.sort(sort);

            for (let i = 0; i < searchResults.length; i++) {
                var newMarkerObject = {};
                if (searchResults[i].lat !== ''){
                    newMarkerObject.lat = searchResults[i].lat;
                }
                if (searchResults[i].lng !== ''){
                    newMarkerObject.lng = searchResults[i].lng;
                }
                    
                markers.push(newMarkerObject); 

            }

            console.log('markers', markers);
            addMarkers(markers);

            console.log('sorted searchResults:', searchResults);


            
        });
}