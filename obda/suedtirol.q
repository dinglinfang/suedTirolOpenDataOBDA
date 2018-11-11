[QueryItem="q2"]
PREFIX geosparql: <http://www.opengis.net/ont/geosparql#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX : <http://www.semanticweb.org/ding/ontologies/2017/10/untitled-ontology-2#>

SELECT ?address ?street_label ?district_label ?houseNum ?postcode
WHERE {
?address geosparql:sfWithin ?district .
?address :hasStreet ?street . 
?address :hasHouseNumber ?houseNum .
?address :hasPostcode ?postcode .
?street rdfs:label ?street_label .
?district rdfs:label ?district_label .
FILTER (lang(?street_label) = 'it')
FILTER (lang(?district_label) = 'it')
}
LIMIT 100

[QueryItem="q3"]
PREFIX geosparql: <http://www.opengis.net/ont/geosparql#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX : <http://www.semanticweb.org/ding/ontologies/2017/10/untitled-ontology-2#>

SELECT ?address ?street_label ?houseNum ?postcode 
WHERE {
?address :hasStreet ?street .
?address :hasHouseNumber ?houseNum .
?address :hasPostcode ?postcode .
?street rdfs:label ?street_label .
FILTER (lang(?street_label) = 'it')
}
LIMIT 100

[QueryItem="q4"]
PREFIX geosparql: <http://www.opengis.net/ont/geosparql#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX : <http://www.semanticweb.org/ding/ontologies/2017/10/untitled-ontology-2#>

SELECT ?wkt
WHERE {
?district a :District ; :hasGeometryInWKT ?wkt.
}

[QueryItem="q5"]
PREFIX geosparql: <http://www.opengis.net/ont/geosparql#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX : <http://www.semanticweb.org/ding/ontologies/2017/10/untitled-ontology-2#>

SELECT ?wkt 
WHERE {
?address a :Address ; :hasGeometryInWKT ?wkt.

}
LIMIT 100

[QueryItem="qStreet"]
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX : <http://www.semanticweb.org/ding/ontologies/2017/10/untitled-ontology-2#>
PREFIX geosparql: <http://www.opengis.net/ont/geosparql#>

SELECT * WHERE {
?street a :Street ; rdfs:label ?l; :hasGeometryInWKT ?wkt.
}
LIMIT 100

[QueryItem="qAddressInMunicipality"]
PREFIX geosparql: <http://www.opengis.net/ont/geosparql#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX : <http://www.semanticweb.org/ding/ontologies/2017/10/untitled-ontology-2#>

SELECT * 
WHERE {
?address a :Address .
?municipality a :Municipality .
?address geosparql:sfWithin ?municipality .
?municipality rdfs:label ?municipality_label .
}
LIMIT 100

[QueryItem="qStreetAddressInMunicipality"]
PREFIX geosparql: <http://www.opengis.net/ont/geosparql#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX : <http://www.semanticweb.org/ding/ontologies/2017/10/untitled-ontology-2#>

SELECT * 
WHERE {
?address a :Address .
?municipality a :Municipality .
?address geosparql:sfWithin ?municipality .
?address :hasStreet ?street .
?street :hasGeometryInWKT ?wkt.
}
LIMIT 100

[QueryItem="qSpecificStreet"]
PREFIX geosparql: <http://www.opengis.net/ont/geosparql#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX : <http://www.semanticweb.org/ding/ontologies/2017/10/untitled-ontology-2#>

SELECT ?municipalityName ?streetName  #?wkt 
WHERE {
?street a :Street ; 
 rdfs:label ?streetName ;
 :hasGeometryInWKT ?wkt ; :belongsToMunicipality ?munichpality ; :belongsToFrazione ?frazione .
?municipality :hasIStatCode 21008 .
?municipality rdfs:label ?municipalityName .
?frazione :hasFrazioneCode 3 .
FILTER (LANG(?streetName) = 'it')
FILTER (LANG(?municipalityName) = 'it')
}
LIMIT 100

[QueryItem="qAddressOnStreet"]
PREFIX geosparql: <http://www.opengis.net/ont/geosparql#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX : <http://www.semanticweb.org/ding/ontologies/2017/10/untitled-ontology-2#>

#SELECT * 
#WHERE {
#?address a :Address ; :hasGeometryInWKT ?addressWKT ; :hasStreet ?street ; :hasStreetName "HEIDE"@it .
#?street a :Street ; :hasGeometryInWKT ?streetWKT .
#}
#LIMIT 100

SELECT  *
WHERE {
?street a :Street ; rdfs:label "HEIDE"@it ; :hasGeometryInWKT ?streetWKT .
}
LIMIT 100

[QueryItem="qAddressOnHeide"]
PREFIX geosparql: <http://www.opengis.net/ont/geosparql#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX : <http://www.semanticweb.org/ding/ontologies/2017/10/untitled-ontology-2#>

SELECT ?wkt 
WHERE {
?address a :Address ; :hasStreetName "HEIDE"@it ; :hasGeometryInWKT ?wkt.
}

[QueryItem="qAddressBolzano"]
PREFIX geosparql: <http://www.opengis.net/ont/geosparql#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX : <http://www.semanticweb.org/ding/ontologies/2017/10/untitled-ontology-2#>

SELECT ?wkt 
#?streetName
#?frazione ?municipality #
WHERE {
 ?address a :Address ; :hasGeometryInWKT ?wkt ; 
	:hasHouseNumber '4'; 
	:belongsToMunicipality ?municipality ; 
	:belongsToFrazione ?frazione ;
	:hasStreet ?street .
#?frazione :hasFrazioneCode 1 .
?municipality :hasIStatCode 21008 .
?street rdfs:label ?streetName
}

[QueryItem="qPharmacy"]
PREFIX geosparql: <http://www.opengis.net/ont/geosparql#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX : <http://www.semanticweb.org/ding/ontologies/2017/10/untitled-ontology-2#>

SELECT *
WHERE{
?pharmacy a :Pharmacy ; rdfs:label ?pharmacyName ;
  :hasAddress ?address ; :belongsToMunicipality ?municipality.
?address :hasGeometryInWKT ?wkt .
?municipality rdfs:label "Bolzano"@it .
}

[QueryItem="qAddressGeomNotIn"]
PREFIX geosparql: <http://www.opengis.net/ont/geosparql#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX : <http://www.semanticweb.org/ding/ontologies/2017/10/untitled-ontology-2#>

SELECT ?addressName ?wkt
WHERE {
?address a :Address ; :hasGeometryInWKT ?wkt ; rdfs:label ?addressName ;
  :belongsToMunicipality ?municipality.  
?municipality a :Municipality ; rdfs:label 'Bolzano'@it .
?address geosparql:sfDisjoint ?municipality .
FILTER (lang(?addressName) = 'it')
}

[QueryItem="qOrgnizationAddress"]
PREFIX : <http://www.semanticweb.org/ding/ontologies/2017/10/untitled-ontology-2#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX geosparql: <http://www.opengis.net/ont/geosparql#>

SELECT *
WHERE 
{
 ?oganization a :DirezioneDidattica .
#; :hasAddress ?address . ?address :hasGeometryInWKT ?wkt. 
}

[QueryItem="qStreetWithPharmacyAndEducation"]
PREFIX : <http://www.semanticweb.org/ding/ontologies/2017/10/untitled-ontology-2#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX geosparql: <http://www.opengis.net/ont/geosparql#>

SELECT ?wkt
WHERE 
{
?oganization a :EducationInstitution ; :hasAddress ?organizationAddress . #?address :hasGeometryInWKT ?wkt. 
?pharmacy a :Pharmacy ; :hasAddress ?pharmacyAddress . #?address :hasGeometryInWKT ?wkt. 
?organizationAddress :hasStreet ?street.
?pharmacyAddress :hasStreet ?street.
?street :hasGeometryInWKT ?wkt. 
}

[QueryItem="educationInstitution"]
PREFIX : <http://www.semanticweb.org/ding/ontologies/2017/10/untitled-ontology-2#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX geosparql: <http://www.opengis.net/ont/geosparql#>

SELECT ?wkt
WHERE 
{
 ?oganization a :EducationInstitution ; :hasAddress ?address . ?address :hasGeometryInWKT ?wkt. 
}

[QueryItem="pharmacy"]
PREFIX : <http://www.semanticweb.org/ding/ontologies/2017/10/untitled-ontology-2#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX geosparql: <http://www.opengis.net/ont/geosparql#>

SELECT * WHERE
{ 
{?pharmacy a :Pharmacy ; :hasAddress ?pharmacyAddress. 
?pharmacyAddress :hasGeometryInWKT ?wkt; :has. }
UNION 
{?pharmacy a :Pharmacy ; :hasGeometryInWKT ?wkt.}
}

[QueryItem="pharmacyAddressOD"]
PREFIX : <http://www.semanticweb.org/ding/ontologies/2017/10/untitled-ontology-2#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX geosparql: <http://www.opengis.net/ont/geosparql#>

SELECT DISTINCT ?wkt ?street_de ?street_it ?houseNumber WHERE
{ 
?pharmacy a :Pharmacy ; :provenance "OD"; :hasAddress ?pharmacyAddress. 
?pharmacyAddress :hasGeometryInWKT ?wkt; :hasStreetName ?street_de, ?street_it; :hasHouseNumber ?houseNumber. 
FILTER (LANG(?street_de) = 'de')
FILTER (LANG(?street_it) = 'it')
}

[QueryItem="pharmacyAddressOSM"]
PREFIX : <http://www.semanticweb.org/ding/ontologies/2017/10/untitled-ontology-2#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX geosparql: <http://www.opengis.net/ont/geosparql#>

SELECT ?wkt ?street ?houseNumber WHERE
{
?pharmacy a :Pharmacy ; :provenance "OSM" ;  :hasGeometryInWKT ?wkt .
OPTIONAL {?pharmacy  :hasStreetName ?street; :hasHouseNumber ?houseNumber.}
}

[QueryItem="School_OD"]
PREFIX : <http://www.semanticweb.org/ding/ontologies/2017/10/untitled-ontology-2#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX geosparql: <http://www.opengis.net/ont/geosparql#>

SELECT DISTINCT ?wkt ?street_de ?street_it ?houseNumber WHERE
{ 
?school a :School ; :provenance "OD" ; :hasAddress ?schooolAddress. 
?schooolAddress :hasGeometryInWKT ?wkt; :hasStreetName ?street_de, ?street_it; :hasHouseNumber ?houseNumber. 
FILTER (LANG(?street_de) = 'de')
FILTER (LANG(?street_it) = 'it')
}

[QueryItem="School_OSM"]
PREFIX : <http://www.semanticweb.org/ding/ontologies/2017/10/untitled-ontology-2#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX geosparql: <http://www.opengis.net/ont/geosparql#>

SELECT ?wkt ?street ?houseNumber WHERE
{
?school a :School ; :provenance "OSM" ;  :hasGeometryInWKT ?wkt .
#?school  :hasStreetName ?street; :hasHouseNumber ?houseNumber.
OPTIONAL {?school  :hasStreetName ?street; :hasHouseNumber ?houseNumber.}
}

[QueryItem="Healthcare_OD"]
PREFIX : <http://www.semanticweb.org/ding/ontologies/2017/10/untitled-ontology-2#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX geosparql: <http://www.opengis.net/ont/geosparql#>

SELECT DISTINCT ?wkt ?street_de ?street_it ?houseNumber WHERE
{ 
?healthcare a :Healthcare ; :provenance "OD"; :hasAddress ?address. 
?address :hasGeometryInWKT ?wkt; :hasStreetName ?street_de, ?street_it; :hasHouseNumber ?houseNumber. 
FILTER (LANG(?street_de) = 'de')
FILTER (LANG(?street_it) = 'it')
}

[QueryItem="Healthcare_OSM"]
PREFIX : <http://www.semanticweb.org/ding/ontologies/2017/10/untitled-ontology-2#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX geosparql: <http://www.opengis.net/ont/geosparql#>

SELECT ?wkt ?street ?houseNumber WHERE
{
?healthcare a :Healthcare ;  :provenance "OSM" ;  :hasGeometryInWKT ?wkt .
OPTIONAL {?healthcare  :hasStreetName ?street; :hasHouseNumber ?houseNumber.}
}

[QueryItem="Fillingstations_OD"]
PREFIX : <http://www.semanticweb.org/ding/ontologies/2017/10/untitled-ontology-2#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX geosparql: <http://www.opengis.net/ont/geosparql#>

SELECT DISTINCT ?wkt ?street_de ?street_it ?houseNumber WHERE
{ 
?fillingstation a :FillingStation ; :provenance "OD"; :hasGeometryInWKT ?wkt; :hasStreetName ?street_de, ?street_it; :hasHouseNumber ?houseNumber. 
FILTER (LANG(?street_de) = 'de')
FILTER (LANG(?street_it) = 'it')
}

[QueryItem="Fillingstations_OSM"]
PREFIX : <http://www.semanticweb.org/ding/ontologies/2017/10/untitled-ontology-2#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX geosparql: <http://www.opengis.net/ont/geosparql#>

SELECT ?wkt ?street ?houseNumber WHERE
{
?fillingstation a :FillingStation ; :provenance "OSM" ;  :hasGeometryInWKT ?wkt .
#?fillingstation  :hasStreetName ?street; :hasHouseNumber ?houseNumber.
OPTIONAL {?fillingstation  :hasStreetName ?street; :hasHouseNumber ?houseNumber.}
}

[QueryItem="Healthcare_OD_geom"]
PREFIX : <http://www.semanticweb.org/ding/ontologies/2017/10/untitled-ontology-2#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX geosparql: <http://www.opengis.net/ont/geosparql#>

SELECT DISTINCT ?wkt WHERE
{ 
?healthcare a :Healthcare ; :provenance "OD";  :hasGeometryInWKT ?wkt .
}

[QueryItem="qAddressOutBolzano"]
PREFIX : <http://www.semanticweb.org/ding/ontologies/2017/10/untitled-ontology-2#>
PREFIX sf: <http://www.opengis.net/ont/sf#>
PREFIX owl: <http://www.w3.org/2002/07/owl#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX xml: <http://www.w3.org/XML/1998/namespace>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX obda: <https://w3id.org/obda/vocabulary#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
PREFIX terms: <http://purl.org/dc/terms/>
PREFIX geosparql: <http://www.opengis.net/ont/geosparql#>


SELECT  ?wkt ?addressName
WHERE {
?address a :Address ; 
  #:hasGeometryInWKT ?wkt ; 
  rdfs:label ?addressName ;
  geosparql:defaultGeometry ?geom ;
  :belongsToMunicipality ?municipality.  
?geom a sf:Point ;  geosparql:asWKT ?wkt .
?municipality a :Municipality ; rdfs:label 'Bolzano'@it .
?address geosparql:sfDisjoint ?municipality .
FILTER (lang(?addressName) = 'it')
}

[QueryGroup="meteo"] @collection [[
[QueryItem="qPrecipitation"]
PREFIX : <http://www.semanticweb.org/ding/ontologies/2017/10/untitled-ontology-2#>
PREFIX dc: <http://purl.org/dc/elements/1.1/>
PREFIX sf: <http://www.opengis.net/ont/sf#>
PREFIX owl: <http://www.w3.org/2002/07/owl#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX xml: <http://www.w3.org/XML/1998/namespace>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>
PREFIX obda: <https://w3id.org/obda/vocabulary#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
PREFIX sosa: <http://www.w3.org/ns/sosa/>
PREFIX vann: <http://purl.org/vocab/vann/>
PREFIX terms: <http://purl.org/dc/terms/>
PREFIX schema: <http://schema.org/>
PREFIX geosparql: <http://www.opengis.net/ont/geosparql#>

SELECT DISTINCT ?sensor  ?precipTime ?precipResult #?wkt 
WHERE{
?precip a sosa:Observation ; sosa:observedProperty :precipitation;
  sosa:hasSimpleResult ?precipResult; sosa:resultTime ?precipTime.
?sensor sosa:observes :precipitation.
?station sosa:hosts ?sensor; geosparql:defaultGeometry ?geom.
?geom geosparql:asWKT ?wkt.
Filter(?precipTime = "2017-07-13T00:00:00"^^xsd:dateTime)
}

[QueryItem="qTrafficStation"]
PREFIX : <http://www.semanticweb.org/ding/ontologies/2017/10/untitled-ontology-2#>
PREFIX dc: <http://purl.org/dc/elements/1.1/>
PREFIX sf: <http://www.opengis.net/ont/sf#>
PREFIX owl: <http://www.w3.org/2002/07/owl#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX xml: <http://www.w3.org/XML/1998/namespace>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>
PREFIX obda: <https://w3id.org/obda/vocabulary#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
PREFIX sosa: <http://www.w3.org/ns/sosa/>
PREFIX vann: <http://purl.org/vocab/vann/>
PREFIX terms: <http://purl.org/dc/terms/>
PREFIX schema: <http://schema.org/>
PREFIX geosparql: <http://www.opengis.net/ont/geosparql#>

SELECT ?id ?wkt 
WHERE{
?ts a :TrafficStation; :hasID ?id; geosparql:defaultGeometry ?geom.
?geom geosparql:asWKT ?wkt.
}

[QueryItem="qPrecipitationSensor"]
PREFIX : <http://www.semanticweb.org/ding/ontologies/2017/10/untitled-ontology-2#>
PREFIX dc: <http://purl.org/dc/elements/1.1/>
PREFIX sf: <http://www.opengis.net/ont/sf#>
PREFIX owl: <http://www.w3.org/2002/07/owl#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX xml: <http://www.w3.org/XML/1998/namespace>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>
PREFIX obda: <https://w3id.org/obda/vocabulary#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
PREFIX sosa: <http://www.w3.org/ns/sosa/>
PREFIX vann: <http://purl.org/vocab/vann/>
PREFIX terms: <http://purl.org/dc/terms/>
PREFIX schema: <http://schema.org/>
PREFIX geosparql: <http://www.opengis.net/ont/geosparql#>

SELECT *
WHERE{
?sensor a :PrecipitationSensor; sosa:isHostedBy ?station.
}

[QueryItem="qTrafficMeasures"]
PREFIX : <http://www.semanticweb.org/ding/ontologies/2017/10/untitled-ontology-2#>
PREFIX dc: <http://purl.org/dc/elements/1.1/>
PREFIX sf: <http://www.opengis.net/ont/sf#>
PREFIX owl: <http://www.w3.org/2002/07/owl#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX xml: <http://www.w3.org/XML/1998/namespace>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>
PREFIX obda: <https://w3id.org/obda/vocabulary#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
PREFIX sosa: <http://www.w3.org/ns/sosa/>
PREFIX vann: <http://purl.org/vocab/vann/>
PREFIX terms: <http://purl.org/dc/terms/>
PREFIX schema: <http://schema.org/>
PREFIX geosparql: <http://www.opengis.net/ont/geosparql#>


SELECT * WHERE{
 ?observation a sosa:Observation ; sosa:observedProperty :dailyTrafficVolume .
?observation sosa:hasSimpleResult ?result; sosa:resultTime ?time.
#Filter(?time = "2017-01-13")
Filter(?time = "2017-01-01T00:00:00Z"^^xsd:dateTime)
#Filter(?time < "2017-01-02")
}

[QueryItem="qPrecipTrafficSpeed"]
PREFIX : <http://www.semanticweb.org/ding/ontologies/2017/10/untitled-ontology-2#>
PREFIX dc: <http://purl.org/dc/elements/1.1/>
PREFIX sf: <http://www.opengis.net/ont/sf#>
PREFIX owl: <http://www.w3.org/2002/07/owl#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX xml: <http://www.w3.org/XML/1998/namespace>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>
PREFIX obda: <https://w3id.org/obda/vocabulary#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
PREFIX sosa: <http://www.w3.org/ns/sosa/>
PREFIX vann: <http://purl.org/vocab/vann/>
PREFIX terms: <http://purl.org/dc/terms/>
PREFIX schema: <http://schema.org/>
PREFIX geosparql: <http://www.opengis.net/ont/geosparql#>

SELECT ?precipResult ?minTempResult ?speedResult ?precipTime 
WHERE{
?precip a sosa:Observation ; sosa:observedProperty :precipitation ; sosa:isObservedBy ?weatherSensor.
?precip sosa:hasSimpleResult ?precipResult; sosa:resultTime ?precipTime.

?minTemp a sosa:Observation ; sosa:observedProperty :minTemperature .
?minTemp sosa:hasSimpleResult ?minTempResult; sosa:resultTime ?minTempTime.

?speed a sosa:Observation ; sosa:observedProperty :dailyTrafficSpeed ; sosa:isObservedBy ?trafficSensor.
?speed sosa:hasSimpleResult ?speedResult; sosa:resultTime ?speedTime.

?weatherSensor sosa:isHostedBy ?weatherStation.
?trafficSensor sosa:isHostedBy ?trafficStation.

?weatherStation geosparql:defaultGeometry ?geom.
?geom geosparql:asWKT ?wkt.

Filter(?precipResult >1)
Filter(?minTempResult < -5)
Filter(?precipTime >= "2017-01-01T00:00:00")
Filter(?precipTime <= "2017-01-02T00:00:00")
Filter(?speedTime = ?precipTime)
}

[QueryItem="qWeatherStation"]
PREFIX : <http://www.semanticweb.org/ding/ontologies/2017/10/untitled-ontology-2#>
PREFIX dc: <http://purl.org/dc/elements/1.1/>
PREFIX sf: <http://www.opengis.net/ont/sf#>
PREFIX owl: <http://www.w3.org/2002/07/owl#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX xml: <http://www.w3.org/XML/1998/namespace>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>
PREFIX obda: <https://w3id.org/obda/vocabulary#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
PREFIX sosa: <http://www.w3.org/ns/sosa/>
PREFIX vann: <http://purl.org/vocab/vann/>
PREFIX terms: <http://purl.org/dc/terms/>
PREFIX schema: <http://schema.org/>
PREFIX geosparql: <http://www.opengis.net/ont/geosparql#>


SELECT ?wkt
WHERE{
?weatherStation a :WeatherStation.
?weatherStation geosparql:defaultGeometry ?geom.
?geom geosparql:asWKT ?wkt.

}

[QueryItem="qWithinDistance"]
PREFIX : <http://www.semanticweb.org/ding/ontologies/2017/10/untitled-ontology-2#>
PREFIX dc: <http://purl.org/dc/elements/1.1/>
PREFIX sf: <http://www.opengis.net/ont/sf#>
PREFIX owl: <http://www.w3.org/2002/07/owl#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX xml: <http://www.w3.org/XML/1998/namespace>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>
PREFIX obda: <https://w3id.org/obda/vocabulary#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
PREFIX sosa: <http://www.w3.org/ns/sosa/>
PREFIX vann: <http://purl.org/vocab/vann/>
PREFIX terms: <http://purl.org/dc/terms/>
PREFIX schema: <http://schema.org/>
PREFIX geosparql: <http://www.opengis.net/ont/geosparql#>
PREFIX geof: <http://www.opengis.net/def/geosparql/function/> 


SELECT ?tsGeom  WHERE {
?trafficStation a :TrafficStation; :hasStreetSegmentID 20; geosparql:defaultGeometry ?tsGeom.
#{
#SELECT ?q ?dist WHERE {
#?weatherStation a :WeatherStation; geosparql:defaultGeometry ?wsGeom.
#BIND(geof:distance(?tsGeom, ?wsGeom) AS ?dist)
#} 
#ORDER BY ?dist
#LIMIT 5
#}
}

[QueryItem="qGrid"]
PREFIX : <http://www.semanticweb.org/ding/ontologies/2017/10/untitled-ontology-2#>
PREFIX dc: <http://purl.org/dc/elements/1.1/>
PREFIX sf: <http://www.opengis.net/ont/sf#>
PREFIX owl: <http://www.w3.org/2002/07/owl#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX xml: <http://www.w3.org/XML/1998/namespace>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>
PREFIX obda: <https://w3id.org/obda/vocabulary#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
PREFIX sosa: <http://www.w3.org/ns/sosa/>
PREFIX vann: <http://purl.org/vocab/vann/>
PREFIX terms: <http://purl.org/dc/terms/>
PREFIX schema: <http://schema.org/>
PREFIX geosparql: <http://www.opengis.net/ont/geosparql#>

SELECT ?wkt
WHERE{
?grid a :Grid; :hasID ?gridID; :hasXmin ?xmin; :hasYmin ?ymin; geosparql:defaultGeometry ?geom.
?geom geosparql:asWKT ?wkt.
}

[QueryItem="qGridObservation"]
PREFIX : <http://www.semanticweb.org/ding/ontologies/2017/10/untitled-ontology-2#>
PREFIX dc: <http://purl.org/dc/elements/1.1/>
PREFIX sf: <http://www.opengis.net/ont/sf#>
PREFIX owl: <http://www.w3.org/2002/07/owl#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX xml: <http://www.w3.org/XML/1998/namespace>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>
PREFIX obda: <https://w3id.org/obda/vocabulary#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
PREFIX sosa: <http://www.w3.org/ns/sosa/>
PREFIX vann: <http://purl.org/vocab/vann/>
PREFIX terms: <http://purl.org/dc/terms/>
PREFIX schema: <http://schema.org/>
PREFIX geosparql: <http://www.opengis.net/ont/geosparql#>


SELECT  ?sensor
#?precipResult) ?wkt ?time 
WHERE{
?grid_precipitation a sosa:Observation; sosa:hasSimpleResult ?precipResult; 
sosa:resultTime ?time; sosa:madeBySensor ?sensor.
Filter(?time = "2017-01-04T00:00:00Z"^^xsd:dateTime)
?sensor sosa:observes :gridPrecipitation.
#?grid sosa:hosts ?sensor.
#?grid geosparql:defaultGeometry ?geom.
#?geom geosparql:asWKT ?wkt.
}

[QueryItem="qTrafficStationInGrid"]
PREFIX : <http://www.semanticweb.org/ding/ontologies/2017/10/untitled-ontology-2#>
PREFIX dc: <http://purl.org/dc/elements/1.1/>
PREFIX sf: <http://www.opengis.net/ont/sf#>
PREFIX owl: <http://www.w3.org/2002/07/owl#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX xml: <http://www.w3.org/XML/1998/namespace>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>
PREFIX obda: <https://w3id.org/obda/vocabulary#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
PREFIX sosa: <http://www.w3.org/ns/sosa/>
PREFIX vann: <http://purl.org/vocab/vann/>
PREFIX terms: <http://purl.org/dc/terms/>
PREFIX schema: <http://schema.org/>
PREFIX geosparql: <http://www.opengis.net/ont/geosparql#>

SELECT ?ts 
#?vValue 
?sValue ?grid # ?pValue 
#?pTime 
?time 
WHERE{
?ts a :TrafficStation; :locatesInGrid ?grid;  sosa:hosts ?speed_sensor . #?volume_sensor. #, ?speed_sensor . 

#?volume_sensor a :TrafficVolumeSensor ; sosa:madeObservation ?volume . 
#?volume  sosa:hasSimpleResult ?vValue; sosa:resultTime ?time.

?speed_sensor a :TrafficSpeedSensor ; sosa:madeObservation ?speed . 
?speed  sosa:hasSimpleResult ?sValue; sosa:resultTime ?time.

#?grid geosparql:defaultGeometry ?geom.
#?geom geosparql:asWKT ?wkt.


#?grid sosa:hosts ?interpolator.
#?interpolator sosa:madeObservation ?observation.
#?observation sosa:observedProperty :gridPrecipitation ; 
#	sosa:hasSimpleResult ?pValue; sosa:resultTime ?time.

Filter(?time = "2017-01-04T00:00:00Z"^^xsd:dateTime)

}

[QueryItem="qATrafficStation"]
PREFIX : <http://www.semanticweb.org/ding/ontologies/2017/10/untitled-ontology-2#>
PREFIX dc: <http://purl.org/dc/elements/1.1/>
PREFIX sf: <http://www.opengis.net/ont/sf#>
PREFIX owl: <http://www.w3.org/2002/07/owl#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX xml: <http://www.w3.org/XML/1998/namespace>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>
PREFIX obda: <https://w3id.org/obda/vocabulary#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
PREFIX sosa: <http://www.w3.org/ns/sosa/>
PREFIX vann: <http://purl.org/vocab/vann/>
PREFIX terms: <http://purl.org/dc/terms/>
PREFIX schema: <http://schema.org/>
PREFIX geosparql: <http://www.opengis.net/ont/geosparql#>



SELECT DISTINCT ?time ?vValue ?sValue ?pValue 
WHERE{
?ts a :TrafficStation; :hasID '23'; :locatesInGrid ?grid; sosa:hosts ?speed_sensor, ?volume_sensor. 

?volume_sensor a :TrafficVolumeSensor ; sosa:madeObservation ?volume . 
?volume  sosa:hasSimpleResult ?vValue; sosa:resultTime ?time.

?speed_sensor a :TrafficSpeedSensor ; sosa:madeObservation ?speed . 
?speed  sosa:hasSimpleResult ?sValue; sosa:resultTime ?time.

?grid sosa:hosts ?interpolator.
?interpolator sosa:madeObservation ?precip.
?precip sosa:observedProperty :gridPrecipitation ; 
	sosa:hasSimpleResult ?pValue; sosa:resultTime ?time.
}
ORDER BY ?time

[QueryItem="test"]
PREFIX : <http://www.semanticweb.org/ding/ontologies/2017/10/untitled-ontology-2#>
PREFIX dc: <http://purl.org/dc/elements/1.1/>
PREFIX sf: <http://www.opengis.net/ont/sf#>
PREFIX owl: <http://www.w3.org/2002/07/owl#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX xml: <http://www.w3.org/XML/1998/namespace>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>
PREFIX obda: <https://w3id.org/obda/vocabulary#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
PREFIX sosa: <http://www.w3.org/ns/sosa/>
PREFIX vann: <http://purl.org/vocab/vann/>
PREFIX terms: <http://purl.org/dc/terms/>
PREFIX schema: <http://schema.org/>
PREFIX geosparql: <http://www.opengis.net/ont/geosparql#>

SELECT ?ts ?volume_sensor ?speed_sensor
WHERE{
?ts a :TrafficStation; :hasID '2'; sosa:hosts ?volume_sensor, ?speed_sensor.
?volume_sensor a :TrafficVolumeSensor.
?speed_sensor a :TrafficSpeedSensor.

}
#Limit 10
]]

[QueryItem="qPrecipVolumeSpeedDateTemplate"]
PREFIX : <http://www.semanticweb.org/ding/ontologies/2017/10/untitled-ontology-2#>
PREFIX dc: <http://purl.org/dc/elements/1.1/>
PREFIX sf: <http://www.opengis.net/ont/sf#>
PREFIX owl: <http://www.w3.org/2002/07/owl#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX xml: <http://www.w3.org/XML/1998/namespace>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>
PREFIX obda: <https://w3id.org/obda/vocabulary#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
PREFIX sosa: <http://www.w3.org/ns/sosa/>
PREFIX vann: <http://purl.org/vocab/vann/>
PREFIX terms: <http://purl.org/dc/terms/>
PREFIX schema: <http://schema.org/>
PREFIX geosparql: <http://www.opengis.net/ont/geosparql#>
PREFIX time: <http://www.w3.org/2006/time#>
PREFIX ssn: <http://www.w3.org/ns/ssn/>

SELECT DISTINCT ?date ?vValue ?sValue ?pValue 
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
ORDER BY ?date
