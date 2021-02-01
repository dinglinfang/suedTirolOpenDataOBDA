# A show case of OBDA using Südtirol Open Data 

This project uses OBDA and Visual Analytics techniques to integrate and visualize open data in South Tyrol, in particular weather and traffic sensor measurements. It provides a visual interface for querying and visualizing the geospatial data.


## How to run the project

### Clone the project.

```shell
$ git clone https://github.com/dinglinfang/suedTirolOpenDataOBDA.git
```

### Docker (recommended)

With docker-compose, we can start the whole demo with one command:

```shell
$ docker-compose up
```

### Manual Setup 

We can also setup each component separately: 

#### Setup database

  Assume that you have already installed PostgreSQL and the PostGIS extension.

  Import the test data in the [db/sql](db/sql) directory into a PostgreSQL database.

```
$ cd db/sql
$ unzip suedtirol.sql.gz
$ psql -U <username> 
# CREATE DATABASE suedtirol;
# \c sueditorl
# CREATE EXTENSION postgis;
# \i suedtirol.sql
```

#### Configure the connection

  Modify the connection information in [ontop/vkg/suedtirol.properties](ontop/vkg/suedtirol.properties) if necessary.

#### Install Ontop Endpoint

  Deploy the Ontop SPARQL endpoint using the files in the [obda](obda) directory. 
  

1. Download and unzip the Ontop CLI bundle [ontop-cli-4.0.3.zip](https://sourceforge.net/projects/ontop4obda/files/ontop-4.0.3/)

2. Copy the jdbc driver of PostgreSQL [ontop/jdbc/postgresql-42.2.14.jre7.jar](ontop/jdbc/postgresql-42.2.14.jre7.jar) `lib` directory of tomcat.

3. Start the Ontop endpoint

```
$  ~/opt/ontop-cli-4.0.3/ontop endpoint --cors-allowed-origins='*' -t suedtirol.owl -p suedtirol.properties -m suedtirol.obda  
```

#### Start the web server for our app

* You can use any server, for instance, using python
```
$ python3 -m http.server
```
* Then go to your browser, and open the link:
http://localhost:8000/index.html


## Links:

- Südtirol Open data portal: https://civis.bz.it/de/index.html
- Ontop: https://ontop-vkg.org

## Contact

- Linfang Ding: linfang.ding@unibz.it
- Guohui Xiao: guohui.xiao@unibz.it
