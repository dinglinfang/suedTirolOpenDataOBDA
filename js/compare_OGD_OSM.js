function compareODandOSM_SPARQL(POItype) {
    const qODdata = qPrefix + "SELECT DISTINCT ?wkt ?street_de ?street_it ?houseNumber WHERE\n" +
        "{ \n" +
        "?poi a :" + POItype + " ; :provenance \"OD\"; :hasAddress ?address. \n" +
        "?address geo:asWKT ?wkt; :hasStreetName ?street_de, ?street_it; :hasHouseNumber ?houseNumber. \n" +
        "FILTER (LANG(?street_de) = 'de')\n" +
        "FILTER (LANG(?street_it) = 'it')\n" +
        "}";
    const qOSMdata = qPrefix + "SELECT ?wkt ?street ?houseNumber WHERE\n" +
        "{\n" +
        "?poi a :" + POItype + " ; :provenance \"OSM\"; geo:asWKT ?wkt .\n" +
        "OPTIONAL {?poi :hasStreetName ?street; :hasHouseNumber ?houseNumber.}\n" +
        "}";

    compareODandOSM(qODdata, qOSMdata, POItype);
}

function compareODandOSM(qODdata, qOSMdata, POIname) {

    //drawSparqlGraph(qODdata, document.getElementById('graphSector'));

    const promise_OD = sparqlClient.execute(qODdata);
    const promise_OSM = sparqlClient.execute(qOSMdata);

    Promise.all([promise_OD, promise_OSM]).then(
        results => {
            //console.log(results);
            const results_OD = results[0];
            const results_OSM = results[1];

            let addressCount = 0;
            let geomCount = 0;

            for (const e_OD of results_OD.results.bindings) {

                let wkt_OD = e_OD.wkt.value,
                    street_de_OD = e_OD.street_de.value,
                    street_it_OD = e_OD.street_it.value,
                    houseNumber_OD = e_OD.houseNumber.value;
                let wkt_format = new ol.format.WKT();
                let feature_OD = wkt_format.readFeatureFromText(wkt_OD);

                for (const e_OSM of results_OSM.results.bindings) {

                    if (e_OSM.street != null && e_OSM.houseNumber != null) {
                        let street_OSM = e_OSM.street.value.toUpperCase();
                        let houseNumber_OSM = e_OSM.houseNumber.value;

                        //compare using address
                        if (houseNumber_OD === houseNumber_OSM) {
                            if (street_de_OD === street_OSM || street_it_OD === street_OSM ||
                                (street_it_OD + " - " + street_de_OD) === street_OSM ||
                                (street_de_OD + " - " + street_it_OD) === street_OSM) {
                                addressCount++;
                            }
                        }
                    }

                    let wkt_OSM = e_OSM.wkt.value;
                    let feature_OSM = wkt_format.readFeatureFromText(wkt_OSM);
                    let feature_OD_coords = feature_OD.getGeometry().getCoordinates();
                    let feature_OSM_Geom = feature_OSM.getGeometry();
                    //compare using geometry
                    if (feature_OSM.getGeometry().getType() == 'Point') {
                        const distance = ol.coordinate.distance(feature_OD_coords,
                            feature_OSM_Geom.getCoordinates());
                        if (distance < 50) {
                            geomCount++;
                        }
                    } else {
                        if (feature_OSM_Geom.intersectsCoordinate(feature_OD_coords)) {
                            geomCount++;
                        }
                    }
                }
            }

            console.log(POIname + " - Address matching : " + addressCount);
            console.log(POIname + " - Geometry matching : " + geomCount);
        }
    )
}
