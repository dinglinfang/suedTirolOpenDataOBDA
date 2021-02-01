

function execSparqlQuery(endpoint, sparql, successCallback, param){

    $.ajax({
        url: endpoint, //e.g., "http://localhost:8080/rdf4j-server/repositories/weibo",
        data: {
            "query": sparql,
            "Accept": 'application/sparql-results+json'
        },
        method: "POST",
        success: function (queryResults) { successCallback(queryResults, param) }
    });

}