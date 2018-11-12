# A show case of OBDA using Südtirol Open Data 


This project uses OBDA and Visual Analytics techniques to integrate and visualize open data in South Tyrol, in particular weather and traffic sensor measurements. It provides a visual interface for querying and visualizing the geospatial data.


## How to run the project

### Clone the project.

```
$ git clone https://github.com/dinglinfang/suedTirolOpenDataOBDA.git
```

### Setup database

  Import the test data in the [data](data) directory into a PostgreSQL database.

```
$ cd data
$ unzip suedtirol.sql.zip
$ psql -U <username> -d <myDataBase> -a -f suedtirol.sql
```

### Configure the connection

  Modify the connection information in [obda/suedtirol.properties](obda/suedtirol.properties)

### Install Ontop/Tomcat

  Deploy the a Ontop SPARQL endpoint using the files in the [obda](obda) directory. 
  
1. Download and unzip the Tomcat bundle [ontop-tomcat-bundle.zip](https://sourceforge.net/projects/ontop4obda/files/ontop-3.0.0-beta-2/)
2. Enable CORS of the rdf4j-server configureation. There are two place  to be modified in the file `$TOMCAT_HOME/webapps/rdf4j-server/WEB-INF/web.xml`. These places are with the following xml comments:
```xml
  <!-- Uncomment this and the associated filter-mapping to enable cross-origin requests. -->
  <!-- Uncomment this and the associated filter definition to enable cross-origin requests. -->
```    
3. Copy the jdbc driver of PostgreSQL (https://jdbc.postgresql.org/download.html) to the `lib` directory of tomcat  
4. Start tomcat from the *bin folder* using the commands: 
	* On Mac/Linux: using the terminal run `sh catalina.sh run`.
	* On Windows: click on the executable `startup.bat`.
5. Connect to RDF4J Workbench at http://localhost:8080/rdf4j-workbench/ .
6. You will be automatically redirected to the repositories view .

## Setting up a Ontop Virtual RDF Repository using the RDF4J Workbench

1. Click on *New repository*
  * Select *Ontop Virtual RDF Store* from the list.
  * Give an ID to your new repository (ex: `suedtirol`).
  * Give optionally also a descriptive title.
  * Click on *Next*.

2. On the next page:
  * Type in the path of the ontology, mapping, and properties files in the [obda](obda) directory.
  * For example,  the ontology path looks like `C:/Users/Me/path/to/obda/suedtirol.owl`) on windows or `/Users/Me/path/to/obda/suedtirol.owl`) on Mac.
  * Keep the default options.
  * Click on *Create*.

### Start the web server for our app

* You can use any server, for instance, using python
```
$ python3 -m http.server
```
* Then go to your browser, and open the link:
http://localhost:8000/index.html


## Links:

- Südtirol Open data portal: https://civis.bz.it/de/index.html
- Ontop: http://ontop.inf.unibz.it

## Contact

- Linfang Ding: linfang.ding@unibz.it
