window.lat = 31.251634;
window.lng = 75.705436;
var map;
var mark;

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
            locationData = res.split('|');
            console.log(locationData);
            console.log(Number(locationData[0]), Number(locationData[1]));
            redraw(Number(locationData[0]), Number(locationData[1]));
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
    mark = new google.maps.Marker({
        position: {
            lat: lat,
            lng: lng
        },
        icon: '/images/placemarker.png',
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

window.initialize = initialize;