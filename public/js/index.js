window.lat = 31.251634;
window.lng = 75.705436;
var map;
var mark;
var flightPath;
var locationTrack = [{
        lat: 31.251634,
        lng: 75.705436
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
                "widget_id": "b09bdf3f4b6acf4a"
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

    flightPath = new google.maps.Polyline({
        path: locationTrack,
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
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
    flightPath.setPath(locationTrack);
}

window.initialize = initialize;