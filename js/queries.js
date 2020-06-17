const qPrefix = "PREFIX : <http://ex.org/suedtirol#>\n" +
    "PREFIX dc: <http://purl.org/dc/elements/1.1/>\n" +
    "PREFIX sf: <http://www.opengis.net/ont/sf#>\n" +
    "PREFIX owl: <http://www.w3.org/2002/07/owl#>\n" +
    "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\n" +
    "PREFIX xml: <http://www.w3.org/XML/1998/namespace>\n" +
    "PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>\n" +
    "PREFIX foaf: <http://xmlns.com/foaf/0.1/>\n" +
    "PREFIX obda: <https://w3id.org/obda/vocabulary#>\n" +
    "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\n" +
    "PREFIX skos: <http://www.w3.org/2004/02/skos/core#>\n" +
    "PREFIX sosa: <http://www.w3.org/ns/sosa/>\n" +
    "PREFIX vann: <http://purl.org/vocab/vann/>\n" +
    "PREFIX terms: <http://purl.org/dc/terms/>\n" +
    "PREFIX schema: <http://schema.org/>\n" +
    "PREFIX geosparql: <http://www.opengis.net/ont/geosparql#>";


const qMunicipalityLabeled = `${qPrefix}
    SELECT ?wkt ?label_it
WHERE {
  ?municipality a :Municipality ;
    rdfs:label ?label_it ;
    :hasGeometryInWKT ?wkt.
  FILTER (LANG(?label_it) = 'it')
}`;

const qAddressRegisteredInMunicipalityTemplate = `${qPrefix}SELECT ?wkt 
#?frazione ?municipality #
WHERE {
 ?address a :Address ; geosparql:defaultGeometry ?geom ; :belongsToMunicipality ?municipality . 
?geom a sf:Point ;  geosparql:asWKT ?wkt .  
?municipality rdfs:label '%s'@it .
}`;

const qAddressLocatedInMunicipalityTemplate = `${qPrefix}SELECT ?wkt
WHERE {
?address a :Address ; geosparql:defaultGeometry ?geom .  
?geom a sf:Point ;  geosparql:asWKT ?wkt .  
?municipality a :Municipality ; rdfs:label '%s'@it .
?address geosparql:sfWithin ?municipality .
}`;

const qAddressDisjointMunicipalityTemplate = `${qPrefix}SELECT ?addressName ?wkt
WHERE {
?address a :Address ; geosparql:defaultGeometry ?geom ; rdfs:label ?addressName ;
  :belongsToMunicipality ?municipality.  
?geom a sf:Point ;  geosparql:asWKT ?wkt .  
?municipality a :Municipality ; rdfs:label '%s'@it .
?address geosparql:sfDisjoint ?municipality .
FILTER (lang(?addressName) = 'it')
}`;

const qWeatherStation = `${qPrefix}SELECT ?wkt
WHERE{
?weatherStation a :WeatherStation.
?weatherStation geosparql:defaultGeometry ?geom.
?geom geosparql:asWKT ?wkt.
}`;

const qTrafficStation = `${qPrefix}SELECT ?id ?name_it ?name_de ?street_segID ?street_it ?street_de ?wkt 
WHERE{
?ts a :TrafficStation; :hasID ?id; rdfs:label ?name_it, ?name_de; 
 :hasStreetSegmentID ?street_segID; :hasStreetName ?street_it, ?street_de; 
geosparql:defaultGeometry ?geom.
?geom geosparql:asWKT ?wkt.
FILTER( lang(?name_it) = 'it')
FILTER( lang(?name_de) = 'de')
FILTER( lang(?street_it) = 'it')
FILTER( lang(?street_de) = 'de')
}`;

const qGrids = `${qPrefix}SELECT ?wkt
WHERE{
?grid a :Grid; :hasID ?gridID; :hasXmin ?xmin; :hasYmin ?ymin; geosparql:defaultGeometry ?geom.
?geom geosparql:asWKT ?wkt.
}`;

const qGridsPrecipitationTemplate = `${qPrefix}SELECT DISTINCT ?precipResult ?wkt 
WHERE{
?grid_precipitation a sosa:Observation; sosa:hasSimpleResult ?precipResult; 
sosa:resultTime ?time; sosa:madeBySensor ?sensor.
?sensor sosa:observes :gridPrecipitation.
?grid sosa:hosts ?sensor.
?grid geosparql:defaultGeometry ?geom.
?geom geosparql:asWKT ?wkt.
Filter(?time = "%sT00:00:00Z"^^xsd:dateTime)
}`;

const qGridsPrecipitationMonth = `${qPrefix}SELECT DISTINCT ?precipResult ?wkt 
WHERE{
?grid_precipitation a sosa:Observation; sosa:hasSimpleResult ?precipResult; 
sosa:resultTime ?time; sosa:madeBySensor ?sensor.
?sensor sosa:observes :gridPrecipitation.
?grid sosa:hosts ?sensor.
?grid geosparql:defaultGeometry ?geom.
?geom geosparql:asWKT ?wkt.
Filter(?date > "2017-06-30T00:00:00"^^xsd:dateTime)
}`;

const qPrecipVolumeSpeedDateTemplate =
    `${qPrefix}SELECT DISTINCT ?date ?vValue ?sValue ?pValue 
WHERE{
?ts a :TrafficStation; :hasID '%s'; :locatesInGrid ?grid; sosa:hosts ?speed_sensor, ?volume_sensor. 
?volume_sensor a :TrafficVolumeSensor ; sosa:madeObservation ?volume . 
?volume  sosa:hasSimpleResult ?vValue; sosa:resultTime ?date.

?speed_sensor a :TrafficSpeedSensor ; sosa:madeObservation ?speed . 
?speed  sosa:hasSimpleResult ?sValue; sosa:resultTime ?date.

?grid sosa:hosts ?interpolator.
?interpolator sosa:madeObservation ?precip.
?precip sosa:observedProperty :gridPrecipitation ; 
sosa:hasSimpleResult ?pValue; sosa:resultTime ?date.
Filter(?date > "2017-06-30T00:00:00"^^xsd:dateTime)
}
ORDER BY ?date`;
