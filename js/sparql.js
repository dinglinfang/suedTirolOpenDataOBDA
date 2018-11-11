class SPARQLClient {
    constructor(endpoint) {
        this.endpoint = endpoint;
    }

    execute(sparql) {
        const requestBody = "query=" + encodeURIComponent(sparql) +
            "&Accept=" + encodeURIComponent('application/sparql-results+json');

        return fetch(this.endpoint, {
            method: 'POST',
            mode: 'cors',
            headers: new Headers({
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }),
            body: requestBody,
        }).then(response => response.json());
    }
}

