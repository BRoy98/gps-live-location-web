window.lat = 31.251634;
window.lng = 75.705436;
window.lat2 = 31.258291;
window.lng2 = 75.709402;
var map;
var mark;
var mark2;
var flightPath;
var flightPath2;
var locationTrack = [{
    lat: 31.251634,
    lng: 75.705436
}, {
    lat: 31.247600,
    lng: 75.697349
}, {
    lat: 31.251503,
    lng: 75.705816
}]

var locationTrack2 = [{
    lat: 31.251625,
    lng: 75.705420
}, {
    lat: 31.251542,
    lng: 75.705632
}, {
    lat: 31.258291,
    lng: 75.709402
}];

function getLocation() {
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
            if (locationTrack[locationTrack.length - 1].lat != Number(locationData[0]) ||
                locationTrack[locationTrack.length - 1].lng != Number(locationData[1])) {
                locationTrack.push({
                    lat: Number(locationData[0]),
                    lng: Number(locationData[1])
                })
                redraw(Number(locationData[0]), Number(locationData[1]));
                console.log('locationTrack', locationTrack);
            }
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
                "widget_id": "aa80dfd932a54256"
            },
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(function (response) {
            locationData = response.data.state;
            locationData = locationData.split('|');
            console.log(Number(locationData[0]), Number(locationData[1]));

            if (locationTrack2[locationTrack2.length - 1].lat != Number(locationData[0]) ||
                locationTrack2[locationTrack2.length - 1].lng != Number(locationData[1])) {
                locationTrack2.push({
                    lat: Number(locationData[0]),
                    lng: Number(locationData[1])
                })
                redraw(Number(locationData[0]), Number(locationData[1]));
                console.log('locationTrack2', locationTrack2);
            }

            setTimeout(function () {
                getLocation2(location);
            }, 5000);
        })
        .catch(function (response) {
            console.log(response);
        });
    return null;
};

setInterval(function () {
    getLocation();
    getLocation2();
}, 5000);


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
        icon: markerImage,
        map: map
    });
    mark2 = new google.maps.Marker({
        position: {
            lat: lat2,
            lng: lng2
        },
        icon: bikeImage,
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

function redraw(alat, alng) {
    if ($("#id-name--1").is(":checked"))
        map.setCenter({
            lat: alat,
            lng: alng,
            alt: 0
        });
    mark.setPosition({
        lat: alat,
        lng: alng,
        alt: 0
    });
    flightPath.setPath(locationTrack);
}

function redraw2(mlat, mlng) {
    if ($("#id-name--1").is(":checked"))
        map.setCenter({
            lat: mlat,
            lng: mlng,
            alt: 0
        });
    mark2.setPosition({
        lat: mlat,
        lng: mlng,
        alt: 0
    });
    flightPath2.setPath(locationTrack2);
}

window.initialize = initialize;