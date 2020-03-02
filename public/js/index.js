window.lat = 31.251127;
window.lng = 75.705351;
window.lat2 = 31.251127;
window.lng2 = 75.705351;
var map;
var mark;
var mark2;
var flightPath;
var flightPath2;
var locationTrack = [{
    lat: 31.251127,
    lng: 75.705351
}];
var locationTrack2 = [{
    lat: 31.251127,
    lng: 75.705351
}];

function getLocation() {
    axios({
            method: 'post',
            url: 'https://api.iotsardar.com/v1/user/get/text',
            data: {
                "api_key": "1f178a1a3bc6ac3a97994e00cd775672",
                "widget_id": "aa80dfd932a54256"
            },
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(function (response) {
            console.log(response);
            locationData = response.data.state;
            locationData = locationData.split('|');
            console.log(Number(locationData[0]), Number(locationData[1]));
            if (locationTrack[locationTrack.length - 1].lat != Number(locationData[0]) ||
                locationTrack[locationTrack.length - 1].lng != Number(locationData[1])) {

                redraw(Number(locationData[0]), Number(locationData[1]));

                locationTrack.push({
                    lat: Number(locationData[0]),
                    lng: Number(locationData[1])
                });

                console.log(1, locationTrack);
            }

            // var curPath = flightPath.getPath();
            // curPath.push(new google.maps.LatLng(Number(locationData[0]), Number(locationData[1])));
            flightPath.setPath(locationTrack);

            // console.log(1, curPath);

            setTimeout(function () {
                getLocation();
            }, 5000);
        })
        .catch(function (response) {
            console.log(response);
        });
    return null;
};

function getLocation2() {
    axios({
            method: 'post',
            url: 'https://api.iotsardar.com/v1/user/get/text',
            data: {
                "api_key": "1f178a1a3bc6ac3a97994e00cd775672",
                "widget_id": "b6c45ce2b24caf7f"
            },
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(function (response) {
            console.log(response);
            locationData = response.data.state;
            locationData = locationData.split('|');
            console.log(Number(locationData[0]), Number(locationData[1]));
            if (locationTrack2[locationTrack2.length - 1].lat != Number(locationData[0]) ||
                locationTrack2[locationTrack2.length - 1].lng != Number(locationData[1])) {
                redraw2(Number(locationData[0]), Number(locationData[1]));

                locationTrack2.push({
                    lat: Number(locationData[0]),
                    lng: Number(locationData[1])
                });
                console.log(2, locationTrack2);
            }

            // var curPath = flightPath2.getPath();
            // curPath.push(new google.maps.LatLng(Number(locationData[0]), Number(locationData[1])));
            flightPath2.setPath(locationTrack2);

            // console.log(2, locationTrack2);

            setTimeout(function () {
                getLocation2();
            }, 5000);
        })
        .catch(function (response) {
            console.log(response);
        });
    return null;
};

// setInterval(function () {
getLocation();
getLocation2();
// }, 5000);


var initialize = function () {
    map = new google.maps.Map(document.getElementById('map-canvas'), {
        center: {
            lat: lat,
            lng: lng
        },
        zoom: 12
    });

    var markerImage = new google.maps.MarkerImage('/images/scooter.png',
        new google.maps.Size(64, 64),
        new google.maps.Point(0, 0),
        new google.maps.Point(32, 32));

    var bikeImage = new google.maps.MarkerImage('/images/motorbike.png',
        new google.maps.Size(64, 64),
        new google.maps.Point(0, 0),
        new google.maps.Point(32, 32));


    mark = new google.maps.Marker({
        position: {
            lat: lat,
            lng: lng
        },
        icon: bikeImage,
        map: map
    });

    mark2 = new google.maps.Marker({
        position: {
            lat: lat2,
            lng: lng2
        },
        icon: markerImage,
        map: map
    });

    flightPath = new google.maps.Polyline({
        path: locationTrack,
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 5,
        map: map
    });

    flightPath2 = new google.maps.Polyline({
        path: locationTrack2,
        geodesic: true,
        strokeColor: '#039be5',
        strokeOpacity: 0.8,
        strokeWeight: 5,
        map: map
    });
};

function redraw(lat, lng) {
    if ($("#id-name--1").is(":checked"))
        map.setCenter({
            lat: lat,
            lng: lng,
            alt: 0
        });
    mark.setPosition({
        lat: lat,
        lng: lng,
        alt: 0
    });
}

function redraw2(lat, lng) {
    mark2.setPosition({
        lat: lat,
        lng: lng,
        alt: 0
    });
}

window.initialize = initialize;