//
var createTextStyle = function (feature, resolution) {
    return new ol.style.Text({
        text: feature.get("label"),
        maxreso: 1000
    });
};

function polygonStyleFunction(feature, resolution) {
    return new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: 'rgba(240,240,240)', //'blue', //
            width: 1
        }),
        fill: new ol.style.Fill({
            color: 'rgba(204,204,204, 0.4)',//'rgba(0, 0, 255, 0.1)'
        }),
        text: createTextStyle(feature)
    })
}

const radiusWidth = 5;
const pointStyle = {
    'circleRed': (feature, resolution) => new ol.style.Style({
        image: new ol.style.Circle({
            radius: radiusWidth,
            stroke: new ol.style.Stroke({
                color: 'white',
                width: 1
            }),
            fill: new ol.style.Fill({
                color: 'red'
            }),
        }),
        text: new ol.style.Text({
            //text: feature.get("label"),
            fill: new ol.style.Fill({color: '#aa3300'}),
            stroke: new ol.style.Stroke({color: '#ffffff', width: 3}),
            offsetY: 10,
            text: resolution < 64 ? feature.get("label") : '',
        })
    }),
    'circleOrange': new ol.style.Style({
        image: new ol.style.Circle({
            radius: radiusWidth,
            stroke: new ol.style.Stroke({
                color: 'rgba(255, 255, 255, 0.6)', //'white'
                width: 1
            }),
            fill: new ol.style.Fill({
                color: 'rgba(255, 69, 0, 0.6)', //'organge'
            })
        })
    }),
    'circleGreen': new ol.style.Style({
        image: new ol.style.Circle({
            radius: radiusWidth,
            stroke: new ol.style.Stroke({
                color: 'rgba(255, 255, 255, 0.6)', //'white'
                width: 1
            }),
            fill: new ol.style.Fill({
                color: 'rgba(0, 128, 0, 0.6)', //'green'
            })
        })
    }),
    'circlePurple': new ol.style.Style({
        image: new ol.style.Circle({
            radius: radiusWidth,
            stroke: new ol.style.Stroke({
                color: 'rgba(255, 255, 255, 0.6)', //'white'
                width: 1
            }),
            fill: new ol.style.Fill({
                color: 'rgba(128, 0, 128, 0.6)', //'purple'
            })
        })
    })
};

const polygonStyle = {
    'POI_polygon': new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: 'rgba(255, 255, 255, 0.6)', //'white'
            width: 1
        }),
        fill: new ol.style.Fill({
            color: 'rgba(255, 69, 0, 0.6)', //'organge'
        })
    }),
    'grid': new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "#969696",
            width: 1
        })
    })
};

function gridStyleFunction(value) {
    return new ol.style.Style({
        fill: new ol.style.Fill({
            color: value
        })
    })
}

const lineStyle = new ol.style.Style({
    stroke: new ol.style.Stroke({
        width: 3,
        color: 'blue'
    }),

});

const municipalityLayer = new ol.layer.Vector({
    name: "municipality",
    title: 'Municipality',
    type: 'overlay',
    visible: true,
    //style: polygonStyle
    style: polygonStyleFunction
});

const addressLayer = new ol.layer.Vector({
    name: "address",
    title: 'Address',
    type: 'overlay',
    visible: true,
    style: pointStyle.circleRed
});

const streetLayer = new ol.layer.Vector({
    name: "street",
    title: 'Street',
    type: 'overlay',
    visible: true,
    style: lineStyle
});

const educationLayer = new ol.layer.Vector({
    name: "education",
    title: 'Education',
    type: 'overlay',
    visible: true,
    style: pointStyle.circleGreen
});

const pharmacyLayer = new ol.layer.Vector({
    name: "pharmacy",
    title: 'Pharmacy',
    type: 'overlay',
    visible: true,
    style: pointStyle.circlePurple
});

const healthcareLayer = new ol.layer.Vector({
    name: "healthcare",
    title: 'Healthcare',
    type: 'overlay',
    visible: true,
    style: pointStyle.circlePurple
});
const fillingstationLayer = new ol.layer.Vector({
    name: "fillingstation",
    title: 'Fillingstation',
    type: 'overlay',
    visible: true,
    style: pointStyle.circlePurple
});
const polygonPOILayer = new ol.layer.Vector({
    name: "polygonPOI",
    title: 'POI_polygon',
    type: 'overlay',
    visible: true,
    style: polygonStyle.POI_polygon
});


//meteological and traffic measurements
const weatherstationLayer = new ol.layer.Vector({
    name: "weatherstation",
    title: 'WeatherStation',
    type: 'overlay',
    visible: true,
    style: pointStyle.circlePurple
});
const trafficstationLayer = new ol.layer.Vector({
    name: "trafficstation",
    title: 'TrafficStation',
    type: 'overlay',
    visible: true,
    style: pointStyle.circlePurple
});


const precipitationLayer = new ol.layer.Vector({
    name: "precipitation",
    title: 'Precipitation',
    type: 'overlay',
    visible: true,
    style: polygonStyle.grid
});