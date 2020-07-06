function trafficStationInterpolation() {

    const wktFormatter = new ol.format.WKT();
    const model = "exponential";
    const sigma2 = 0, alpha = 100;

    const qTrafficStation = qPrefix + "SELECT ?tsID ?wkt \n" +
        "WHERE{\n" +
        "?ts a :TrafficStation; :hasID ?tsID; geosparql:defaultGeometry ?geom.\n" +
        "?geom geosparql:asWKT ?wkt.\n" +
        "}";

    sparqlClient.execute(qTrafficStation)
        .then(resp => {
            let tsID = [], ts_lon = [], ts_lat = [];
            resp.results.bindings.map(function (d) {
                tsID.push(d['tsID'].value);

                const wkt = d['wkt'].value;
                const geom = wktFormatter.readFeatureFromText(wkt).getGeometry();
                ts_lon.push(geom.getCoordinates()[0]);
                ts_lat.push(geom.getCoordinates()[1]);
            });
            return {tsID, ts_lon, ts_lat}
        })
        .then(
            st_params => {
                const tsID = st_params.tsID;
                const ts_lon = st_params.ts_lon;
                const ts_lat = st_params.ts_lat;

                let promises = [];

                for (let i = 0; i < 31; i++) {
                    const date = new Date("2017-01-01").addDays(i).toISOString();

                    //query the precipitation observation data and generate a kriging model.
                    const qWeatherObservation = qPrefix + "SELECT ?precipResult ?wkt ?precipTime\n" +
                        "WHERE{\n" +
                        "?precip a sosa:Observation ; sosa:observedProperty :precipitation ; sosa:isObservedBy ?weatherSensor.\n" +
                        "?precip sosa:hasSimpleResult ?precipResult; sosa:resultTime ?precipTime.\n" +
                        "Filter(?precipTime = \"" + date + "\"^^xsd:dateTime)\n" +
                        "?weatherSensor a :PrecipitationSensor; sosa:isHostedBy ?weatherStation.\n" +
                        "?weatherStation a :WeatherStation.\n" +
                        "?weatherStation geosparql:defaultGeometry ?geom.\n" +
                        "?geom geosparql:asWKT ?wkt.\n" +
                        "}";

                    var p1 = sparqlClient.execute(qWeatherObservation)
                        .then(resp => {
                            let precip = [], lon = [], lat = [];
                            resp.results.bindings
                                .map(function (d) {
                                    precip.push(d['precipResult'].value);
                                    const wkt = d['wkt'].value;
                                    const geom = wktFormatter.readFeatureFromText(wkt).getGeometry();
                                    lon.push(geom.getCoordinates()[0]);
                                    lat.push(geom.getCoordinates()[1]);
                                });
                            return {precip: precip, lon: lon, lat: lat};
                        })
                        .then(params => {
                            const fitModel = kriging.train(params.precip, params.lon, params.lat, model, sigma2, alpha);
                            return fitModel;
                        })
                        .then(fitModel => {
                            var csvContent = "";
                            for (let j = 0; j < tsID.length; j++) {
                                const ts_weather_value = kriging.predict(ts_lon[j], ts_lat[j], fitModel);
                                csvContent = csvContent + tsID[j] + "," + date.substr(0, 10) + "," + ts_weather_value + "\n";
                            }
                            return csvContent;
                        });
                    promises.push(p1);
                }
                return Promise.all(promises)
            })
        .then(
            csvContents => {
                //csvContent_title = "traffic_station_id,date,precipitation_value\n";
                const csvContent = csvContents.join("");
                var link = window.document.createElement("a");
                link.setAttribute("href", "data:text/csv;charset=utf-8,%EF%BB%BF" + encodeURI(csvContent));
                link.setAttribute("download", "inter_precip_data.csv");
                link.click();
            }
        );
}

function gridInterpolation() {
    const wktFormatter = new ol.format.WKT();
    const model = "exponential";
    const sigma2 = 0, alpha = 100;

    const qGrids = qPrefix + "SELECT ?gridID ?wkt ?xmin ?ymin \n" +
        "WHERE{\n" +
        "?grid a :GridCell; :hasID ?gridID; :hasXmin ?xmin; :hasYmin ?ymin; " +
        "geosparql:defaultGeometry ?geom.\n" +
        "?geom geosparql:asWKT ?wkt.\n" +
        "}";

    sparqlClient.execute(qGrids)
        .then(resp => {
            let gridID = [], xmin = [], ymin = [];
            resp.results.bindings.map(function (d) {
                gridID.push(d['gridID'].value);
                xmin.push(d['xmin'].value);
                ymin.push(d['ymin'].value);
            });
            return {gridID, xmin, ymin}
        })
        .then(
            st_params => {
                const gridID = st_params.gridID;
                const xmin = st_params.xmin;
                const ymin = st_params.ymin;

                let promises = [];

                for (let i = 0; i < 5; i++) {
                    const date = new Date("2017-01-01").addDays(i).toISOString();

                    //query the precipitation observation data and generate a kriging model.
                    const qWeatherObservation = qPrefix + "SELECT DISTINCT ?sensor  ?precipTime ?precipResult ?wkt \n" +
                        "WHERE{\n" +
                        "?precip a sosa:Observation ; sosa:observedProperty :precipitation;\n" +
                        "  sosa:hasSimpleResult ?precipResult; sosa:resultTime ?precipTime.\n" +
                        "\n" +
                        "?sensor a :PrecipitationSensor; sosa:madeObservation ?precip.\n" +
                        "\n" +
                        "?station sosa:hosts ?sensor; geosparql:defaultGeometry ?geom.\n" +
                        "?geom geosparql:asWKT ?wkt.\n" +
                        "Filter(?precipTime = \"" + date + "\"^^xsd:dateTime)\n" +
                        "}";

                    var p1 = sparqlClient.execute(qWeatherObservation)
                        .then(resp => {
                            let precip = [], lon = [], lat = [];
                            resp.results.bindings
                                .map(function (d) {
                                    precip.push(d['precipResult'].value);
                                    const wkt = d['wkt'].value;
                                    const geom = wktFormatter.readFeatureFromText(wkt).getGeometry();
                                    lon.push(geom.getCoordinates()[0]);
                                    lat.push(geom.getCoordinates()[1]);
                                });
                            return {precip: precip, lon: lon, lat: lat};
                        })
                        .then(params => {
                            const fitModel = kriging.train(params.precip, params.lon, params.lat, model, sigma2, alpha);
                            return fitModel;
                        })
                        .then(fitModel => {
                            var csvContent = "";
                            for (let j = 0; j < gridID.length; j++) {
                                const ts_weather_value = kriging.predict(xmin[j], ymin[j], fitModel);
                                csvContent = csvContent + gridID[j] + "," + date.substr(0, 10) + "," + ts_weather_value + "\n";
                            }
                            return csvContent;
                        });
                    promises.push(p1);
                }
                return Promise.all(promises)
            })
        .then(
            csvContents => {
                const csvContent_title = "id,date,precipitation\n";
                const csvContent = csvContent_title + csvContents.join("");
                var link = window.document.createElement("a");
                link.setAttribute("href", "data:text/csv;charset=utf-8,%EF%BB%BF" + encodeURI(csvContent));
                link.setAttribute("download", "grid_precip_data.csv");
                link.click();
            }
        );
}
