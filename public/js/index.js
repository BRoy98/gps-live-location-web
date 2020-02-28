window.lat = 31.251634;
window.lng = 75.705436;
window.lat2 = 31.251634;
window.lng2 = 75.705436;
var map;
var mark;
var mark2;
var flightPath;
var flightPath2;
var locationTrack = [{
    lat: 31.251634,
    lng: 75.705436
}]

var locationTrack2 = [{
        lat2: 31.251625,
        lng2: 75.705420
    }
    //, {
    //     lat: 31.251634,
    //     lng: 75.705436
    // }
];

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
            res = "31.251634|75.705436"
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
                console.log(locationTrack);
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
            locationData = response.data.state.split('|');
            redraw(Number(locationData[0]), Number(locationData[1]));

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
}, 5000);


var initialize = function () {
    map = new google.maps.Map(document.getElementById('map-canvas'), {
        center: {
            lat: lat,
            lng: lng
        },
        zoom: 12
    });

    var markerImage = new google.maps.MarkerImage('/images/placemarker.png',
        new google.maps.Size(60, 60),
        new google.maps.Point(0, 0),
        new google.maps.Point(30, 30));

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
        icon: '/images/placemarker.png',
        map: map
    });

    flightPath = new google.maps.Polyline({
        path: locationTrack,
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        map: map
    });
    flightPath2 = new google.maps.Polyline({
        path: locationTrack,
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        map: map
    });

    getLocation();
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
    flightPath.setPath(locationTrack);
    flightPath2.setPath(locationTrack);
}

window.initialize = initialize;