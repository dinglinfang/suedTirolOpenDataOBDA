# A show case of OBDA using Südtirol Open Data 


This project uses OBDA and Visual Analytics techniques to integrate and visualize open data in South Tyrol, in particular weather and traffic sensor measurements. It provides a visual interface for querying and visualizing the geospatial data.


## How to run the project

### Clone the project.

```
$ git clone https://github.com/dinglinfang/suedTirolOpenDataOBDA.git
```

### Setup database

  Assume that you have already installed PostgreSQL and the PostGIS extension.

  Import the test data in the [data](data) directory into a PostgreSQL database.

```
$ cd data
$ unzip suedtirol.sql.zip
$ psql -U <username> 
# CREATE DATABASE suedtirol;
# \c sueditorl
# CREATE EXTENSION postgis;
# \i suedtirol.sql
```

### Configure the connection

  Modify the connection information in [obda/suedtirol.properties](obda/suedtirol.properties) if necessary.

### Install Ontop/Tomcat

  Deploy the a Ontop SPARQL endpoint using the files in the [obda](obda) directory. 
  

1. Download and unzip the Ontop CLI bundle [ontop-cli-4.0.0-beta-1.zip](https://sourceforge.net/projects/ontop4obda/files/ontop-4.0.0-beta-1/)

2. Copy the jdbc driver of PostgreSQL (https://jdbc.postgresql.org/download.html) to the `lib` directory of tomcat

3. Start the Ontop Endpoint

```
$  ~/opt/ontop-cli-4.0.0-beta-1/ontop endpoint --cors-allowed-origins=* -t suedtirol.owl -p suedtirol.properties -m suedtirol.obda  
```



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
